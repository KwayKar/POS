<template>
  <div class="p-4">
    <h2 v-if="mode === 'edit'" class="text-xl font-bold mb-4">Edit Staff</h2>
    <h2 v-if="mode === 'create'" class="text-xl font-bold mb-4">
      Create Staff
    </h2>
    <form @submit.prevent="submitForm">
      <div class="mb-6">
        <label class="block text-sm font-medium mb-1 pb-2">Name</label>
        <input
          v-model="form.name"
          type="text"
          class="border rounded w-full p-2"
          required
        />
      </div>

      <div class="mb-6 pb-4">
        <label class="block text-sm font-medium mb-1 pb-2">Phone</label>
        <input
          v-model="form.phone"
          type="number"
          class="border rounded w-full p-2"
          required
        />
      </div>

      <div class="mb-6 pb-4">
        <label class="block text-sm font-medium mb-1 pb-2">Passcode</label>
        <input
          v-model="form.passcode"
          type="password"
          class="border rounded w-full p-2"
          @input="handlePasscode"
          @blur="validatePasscode"
          placeholder="Numbers Only (4 digits)"
          required
        />
        <p v-if="error.passcode" class="text-red-500 text-sm mt-2">
          {{ error.passcode }}
        </p>
      </div>

      <div class="mb-6">
        <label class="block text-sm font-medium mb-1 pb-2">Email</label>
        <input
          v-model="form.email"
          type="text"
          class="border rounded w-full p-2"
          @blur="checkEmail"
        />
        <p v-if="error.email" class="text-red-500 text-sm mt-2">
          {{ error.email }}
        </p>
      </div>

      <div class="flex justify-end space-x-2">
        <button
          type="button"
          @click="$emit('close')"
          class="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">
          {{ mode === "edit" ? "Update" : "Create" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { validateEmail } from "~/utils/validateEmail";

export default {
  props: {
    staff: {
      type: Object,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      form: { ...this.staff },
      error: {},
    };
  },
  methods: {
    submitForm() {
      if (Object.keys(this.error).length === 0) {
        this.error = {};
        this.$emit("save-staff", { ...this.form });
      }
    },
    checkEmail() {
      const validEmail = validateEmail(this.form.email);
      if (!validEmail) {
        this.$set(this.error, "email", "Please provide a valid email address");
      } else {
        this.$delete(this.error, "email");
      }
    },
    handlePasscode() {
      this.form.passcode = this.form?.passcode?.replace(/\D/g, '');
      if (this.error.passcode) {
        this.$delete(this.error, "passcode");
      }
    },
    validatePasscode() {
      if (!this.form.passcode || this.form.passcode.length < 4) {
        this.$set(this.error, "passcode", "Passcode must be at least 4 digits long");
      } else {
        this.$delete(this.error, "passcode");
      }
    },
    clearError() {
      this.error = {};
    },
  },
};
</script>
