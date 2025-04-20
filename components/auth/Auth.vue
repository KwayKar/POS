<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">
        {{ isLogin ? "Login" : "Register" }}
      </h2>
      <form @submit.prevent="handleSubmit">
        <div v-if="!isLogin" class="mb-4">
          <label class="block text-sm font-medium mb-1">Name</label>
          <Input
            v-model="name"
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            placeholder="Your Name"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Email</label>
          <Input
            v-model="email"
            type="email"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            placeholder="you@example.com"
          />
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium mb-1">Password</label>
          <Input
            v-model="password"
            type="password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            placeholder="••••••••"
          />
        </div>

        <div class="flex justify-center w-full">
            <SubmitButton @click="handleSubmit" :applyShadow="true" style="height: 52px;">
            {{ isLogin ? "Login" : "Register" }}
            </SubmitButton>
        </div>
      </form>

      <p class="text-center text-sm mt-6">
        {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
        <button
          class="text-blue-600 hover:underline ml-1"
          @click="toggleMode"
        >
          {{ isLogin ? 'Register' : 'Login' }}
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Input from "~/components/reuse/ui/Input.vue";
import SubmitButton from "~/components/reuse/ui/SubmitButton.vue";

const isLogin = ref(true);
const name = ref("");
const email = ref("");
const password = ref("");

const toggleMode = () => {
  isLogin.value = !isLogin.value;
  name.value = "";
  email.value = "";
  password.value = "";
};

const handleSubmit = () => {
  const payload = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  if (isLogin.value) {
    console.log("Login", payload);
  } else {
    console.log("Register", payload);
  }
};
</script>
