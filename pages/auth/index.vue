<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">
        {{ isSignUp ? 'Sign Up' : 'Login' }}
      </h2>
      
      <form @submit.prevent="handleSubmit">
        <!-- Name Field (Only for Sign-Up) -->
        <div v-if="isSignUp" class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-600 mb-2">Name</label>
          <Input
            type="text"
            id="name"
            v-model="form.name"
            placeholder="Enter your name"
            :class="{'border-red-500': errors.name, 'border-gray-300': !errors.name}"
          />
          <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
        </div>

        <!-- Email Field -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-600 mb-2">Email</label>
          <Input
            type="email"
            id="email"
            v-model="form.email"
            placeholder="Enter your email"
            :class="{'border-red-500': errors.email, 'border-gray-300': !errors.name}"
          />
          <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
        </div>

        <!-- Password Field -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-600 mb-2">Password</label>
          <Input
            type="password"
            id="password"
            v-model="form.password"
            placeholder="Enter your password"
            :class="{'border-red-500': errors.password, 'border-gray-300': !errors.name}"
          />
          <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
        </div>

        <Button type="submit" class="w-full mt-4 mb-2" :class="{'opacity-70': loading}">
          <span v-if="loading" class="spinner">Processing</span>
          <span v-else>{{ isSignUp ? 'Sign Up' : 'Login' }}</span>
        </Button>
      </form>

      <!-- Toggle between Login and Sign-Up -->
      <p class="mt-4 text-sm text-gray-600 text-center">
        {{ isSignUp ? 'Already have an account?' : "Don't have an account?" }}
        <button
          class="text-blue-500 hover:underline font-medium"
          @click="isSignUp = !isSignUp"
        >
          {{ isSignUp ? 'Login here' : 'Sign up here' }}
        </button>
      </p>
    </div>
  </div>
</template>


<script>
import Input from '~/components/reuse/ui/Input.vue';
import Button from '~/components/reuse/ui/Button.vue';
import { login, signUp } from '~/services/authService';

export default {
  components: {
    Input,
    Button,
  },
  data() {
    return {
      isSignUp: false,
      form: {
        name: '',
        email: '',
        password: '',
      },
      errors: {
        name: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      // Name validation
      if (this.isSignUp && !this.form.name) {
        this.errors.name = 'Name is required.';
      }

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.form.email) {
        this.errors.email = 'Email is required.';
      } else if (!emailPattern.test(this.form.email)) {
        this.errors.email = 'Please enter a valid email.';
      }

      // Password validation
      if (!this.form.password) {
        this.errors.password = 'Password is required.';
      } else if (this.form.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters long.';
      }

      return Object.keys(this.errors).length === 0;
    },
    async handleSubmit() {
      if (!this.validateForm()) {
        return;
      }

      this.loading = true;
      try {
        if (this.isSignUp) {
          const response = await signUp(this.form);
          console.log('Sign-up successful:', response.data);
        } else {
          const response = await login(this.form);
          console.log('Login successful:', response.data);
        }
      } catch (error) {
        console.error('Error during authentication:', error.response?.data || error.message);
        // Update `errors` based on the API response
        if (error.response?.data?.errors) {
          this.errors = error.response.data.errors;
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
  
</style>
