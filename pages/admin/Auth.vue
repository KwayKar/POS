

<template>
  <div class="auth-container">
    <div class="auth-box">
    <h2 class="header">Login</h2>
    <form @submit.prevent="handleSubmit">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" placeholder="Enter your email" />

      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" placeholder="Enter your password" />

      <p v-if="error" class="error">{{ error }}</p>

      <button type="submit">Login</button>
    </form>
  </div>
</div>
</template>

<script setup>
import { ref } from "vue";

const name = ref("");
const email = ref("");
const password = ref("");
const error = ref("");

const emit = defineEmits(["submit-login", "submit-register"]);

const handleSubmit = () => {
  error.value = "";

  if (!email.value || !password.value) {
    error.value = "All fields are required";
    return;
  }

  console.log(email.value, password.value)
};

</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
}

.auth-box {
  width: 450px;
  padding: 20px;
  margin-top: 10%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header {
  color: var(--black-1);
  text-align: center;
  font-size: 2rem !important; 
  font-weight: bold;
  margin: 14px 0 32px;
}

input {
  width: 100%;
  padding: 10px;
  margin: 0 0 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background: #0056b3;
}
.error {
  color: red;
  font-size: 14px;
}
.toggle {
  margin-top: 10px;
  text-align: center;
  color: #007bff;
  cursor: pointer;
}
.toggle:hover {
  text-decoration: underline;
}
</style>
