<template>
  <div class="p-4">
    <h2 v-if="mode === 'edit'" class="text-xl font-bold mb-4">Edit Discount</h2>
    <h2 v-if="mode === 'create'" class="text-xl font-bold mb-4">Create Discount</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-6">
        <label class="block text-sm font-medium mb-1 pb-2">Discount Name</label>
        <input
          v-model="form.title"
          type="text"
          class="border rounded w-full p-2"
          required
        />
      </div>
      <div class="mb-6">
        <label class="block text-sm font-medium pb-2">Discount Type</label>
        <div class="flex gap-4 items-center">
          <label class="flex items-center">
            <input
              type="radio"
              value="percentage"
              v-model="form.type"
              class="mr-2"
            />
            Percentage
          </label>
          <label class="flex items-center">
            <input
              type="radio"
              value="fixed"
              v-model="form.type"
              class="mr-2"
            />
            Fixed Amount
          </label>
        </div>
      </div>
      <div class="mb-6">
        <label class="block text-sm font-medium mb-1 pb-2">Amount</label>
        <input
          v-model="form.amount"
          type="text"
          class="border rounded w-full p-2"
          :placeholder="form.type === 'percentage' ? 'Enter percentage (1-100)' : 'Enter fixed amount'"
          :min="form.type === 'percentage' ? 1 : undefined"
          :max="form.type === 'percentage' ? 100 : undefined"
          @input="validateAmount"
          required
        />
        <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
      </div>
      <div class="mb-6 pb-4">
        <label class="block text-sm font-medium mb-1 pb-2">Expiry</label>
        <input
          v-model="form.expiry"
          type="date"
          class="border rounded w-full p-2"
          :min="currentDate"
          @input="formatDate"
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
    discount: {
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
      form: { ...this.discount },
      errorMessage: "",
      currentDate: new Date().toISOString().split("T")[0],
    };
  },
  methods: {
    validateAmount() {
      const { amount, type } = this.form;

      if (type === "percentage" && (amount < 1 || amount > 100)) {
        this.errorMessage = "Percentage must be between 1 and 100.";
      } else if (amount <= 0) {
        this.errorMessage = "Amount must be greater than 0.";
      } else {
        this.errorMessage = "";
      }
    },
    submitForm() {
      if (!this.errorMessage) {
        this.$emit("save-discount", { ...this.form });
      }
    },
    formatDate() {
      if (this.form.expiry) {
        const [year, month, day] = this.form.expiry.split("-");
        this.formattedExpiry = `${day}-${month}-${year}`;
      }
    },
  },
};
</script>
