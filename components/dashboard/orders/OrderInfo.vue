<template>
    <div class="p-4">
      <h2 v-if="mode === 'edit'" class="text-xl font-bold mb-4">Edit Order</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-6">
          <label class="block text-sm font-medium mb-1 pb-2">Order ID</label>
          <input
            v-model="form.id"
            type="text"
            class="border rounded w-full p-2"
          />
        </div>
        
        <div class="mb-6">
          <label class="block text-sm font-medium mb-1 pb-2">Address</label>
          <input
            v-model="form.address"
            type="text"
            class="border rounded w-full p-2"
            :placeholder="form.type === 'percentage' ? 'Enter percentage (1-100)' : 'Enter fixed amount'"
          />
          <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
        </div>
        
        <div class="mb-6 pb-4">
          <label class="block text-sm font-medium mb-1 pb-2">Expiry</label>
          <input
            v-model="form.orderStatus"
            type="text"
            class="border rounded w-full p-2"
          />
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
  export default {
    props: {
      order: {
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
        form: { ...this.order },
        errorMessage: "",
      };
    },
    methods: {
      submitForm() {
        if (!this.errorMessage) {
          this.$emit("edit-order", { ...this.form });
        }
      },
    },
  };
  </script>
  