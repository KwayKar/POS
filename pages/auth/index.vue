<template>
  <div class="auth-container">
    <div class="auth-box">
      <h2>
        {{ isSignUp ? "Sign Up" : "Login" }}
      </h2>

      <form class="form" @submit.prevent="handleSubmit">
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
            }"
          />
          <p v-if="errors.password" class="text-red-500 text-xs mt-1">
            {{ errors.password }}
          </p>
        </div>

        <p v-if="errors.submit" class="text-red-500 text-s mt-1">
          {{ errors.submit }} 
        </p>

        <div class="submit-btn">
          <SubmitButton @click="handleSubmit" :applyShadow="true">
            <span v-if="loading" class="spinner">Processing</span>
            <span v-else>{{ "Login" }}</span>
          </SubmitButton>
        </div>
      </form>

      <!-- Toggle between Login and Sign-Up -->
      <p class="mt-4 text-sm text-gray-600 text-center">
        {{ isSignUp ? "Already have an account?" : "Don't have an account?" }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import Input from "~/components/reuse/ui/Input.vue";
import SubmitButton from "~/components/reuse/ui/SubmitButton.vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAdmin } from "../../stores/admin/useAdmin";
import { useRouter } from 'vue-router';
const { $firebaseAuth } = useNuxtApp();

const isSignUp = ref(false);

const form = reactive({
  email: "",
  password: "",
});

const errors = reactive({
  email: "",
  password: "",
  submit: ""
});

const loading = ref(false);
const config = useRuntimeConfig();
const adminStore = useAdmin();
const router = useRouter();

const validateForm = () => {
  errors.email = "";
  errors.password = "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  return !errors.email && !errors.password;
};

const handleSubmit = async () => {

  if (!validateForm()) return;

  loading.value = true;
  const { email, password } = form;

  errors.email = "";
  errors.password = "";
  errors.submit = "";

  try {
    const userCredential = await signInWithEmailAndPassword($firebaseAuth, email, password);
    const user = userCredential.user;
    const firebaseUid = user.uid;
    const idToken = await user.getIdToken();

    const res = await apiFetch(`${config.public.apiBaseUrl}/auth/staff/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: { firebaseUid },
    });

    if (res.success) {
      adminStore.setStaffData(res.staff);
      localStorage.setItem('staff', JSON.stringify(res.staff));
      router.push("/dashboard/orders");
    } else {
      errors.submit = "Something went wrong. Please contact support if the error persist."
    }
  } catch (error) {
    // console.error("Login error:", error.message);
    errors.submit = "Something went wrong. Please contact support if the error persist."
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
