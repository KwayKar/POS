<template>
  <div class="auth-container">
    <div class="auth-box">
      <h2>
        {{ isSignUp ? "Sign Up" : "Login" }}
      </h2>

      <form class="form" @submit.prevent="handleSubmit">
        <!-- Name Field (Only for Sign-Up) -->
        <div v-if="isSignUp" class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-600 mb-2"
            >Name</label
          >
          <Input
            type="text"
            id="name"
            v-model="form.name"
            placeholder="Enter your name"
            :class="{
              'border-red-500': errors.name,
              'border-gray-300': !errors.name,
            }"
          />
          <p v-if="errors.name" class="text-red-500 text-xs mt-1">
            {{ errors.name }}
          </p>
        </div>

        <!-- Email Field -->
        <div class="mb-4">
          <label
            for="email"
            class="block text-sm font-medium text-gray-600 mb-2"
            >Email</label
          >
          <Input
            type="email"
            id="email"
            v-model="form.email"
            placeholder="Enter your email"
            :class="{
              'border-red-500': errors.email,
              'border-gray-300': !errors.name,
            }"
          />
          <p v-if="errors.email" class="text-red-500 text-xs mt-1">
            {{ errors.email }}
          </p>
        </div>

        <!-- Password Field -->
        <div class="mb-4">
          <label
            for="password"
            class="block text-sm font-medium text-gray-600 mb-2"
            >Password</label
          >
          <Input
            type="password"
            id="password"
            v-model="form.password"
            placeholder="Enter your password"
            :class="{
              'border-red-500': errors.password,
              'border-gray-300': !errors.name,
            }"
          />
          <p v-if="errors.password" class="text-red-500 text-xs mt-1">
            {{ errors.password }}
          </p>
        </div>

        <div class="submit-btn">
          <SubmitButton @click="handleSubmit" :applyShadow="true">
            <span v-if="loading" class="spinner">Processing</span>
            <span v-else>{{ isSignUp ? "Sign Up" : "Login" }}</span>
          </SubmitButton>
        </div>
      </form>

      <!-- Toggle between Login and Sign-Up -->
      <p class="mt-4 text-sm text-gray-600 text-center">
        {{ isSignUp ? "Already have an account?" : "Don't have an account?" }}
        <button
          class="text-blue-500 hover:underline font-medium"
          @click="isSignUp = !isSignUp"
        >
          {{ isSignUp ? "Login here" : "Sign up here" }}
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import Input from "~/components/reuse/ui/Input.vue";
import SubmitButton from "~/components/reuse/ui/SubmitButton.vue";
import { login, signUp } from "~/services/authService";

const isSignUp = ref(false);

const form = reactive({
  name: "",
  email: "",
  password: "",
});

const errors = reactive({
  name: "",
  email: "",
  password: "",
});

const loading = ref(false);

const validateForm = () => {
  errors.name = "";
  errors.email = "";
  errors.password = "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (isSignUp.value && !form.name) {
    errors.name = "Name is required.";
  }

  if (!form.email) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(form.email)) {
    errors.email = "Please enter a valid email.";
  }

  if (!form.password) {
    errors.password = "Password is required.";
  } else if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  return !errors.name && !errors.email && !errors.password;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  loading.value = true;
  try {
    if (isSignUp.value) {
      const response = await signUp(form);
      console.log("Sign-up successful:", response.data);
    } else {
      const response = await login(form);
      console.log("Login successful:", response.data);
    }
  } catch (error) {
    if (error.response?.data?.errors) {
      const apiErrors = error.response.data.errors;
      Object.keys(apiErrors).forEach((key) => {
        if (errors[key] !== undefined) {
          errors[key] = apiErrors[key];
        }
      });
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-bg-color-1);
}

.auth-box {
  max-width: 480px;
  width: 100%;
  background-color: var(--white-1);
  border-radius: 1rem;
  border: 1px solid var(--gray-1);
  padding-bottom: 1.5rem;
}
@media screen and (max-width: 600px) {
  .auth-box {
    max-width: 90%;
  }
}

.auth-box h2 {
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  color: #1f2937;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  border-bottom: 1px solid var(--pale-gray-1);
}

.form {
  padding: 0 1.5rem;
}

.submit-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 25px 0 40px;
}
.submit-btn > button {
  width: 100%;
  height: 40px;
}
</style>
