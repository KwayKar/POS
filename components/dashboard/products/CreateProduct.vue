<template>
  <div
    class="modal-container modal-content w-full flex flex-col h-full bg-[var(--white-1)] p-6 rounded"
  >
    <h3 class="text-lg font-semibold mb-4">Product Information</h3>

    <div>
      <!-- Title -->
      <div class="form-field">
        <label class="label">Title</label>
        <Input
          type="text"
          v-model="selectedItem.title"
          placeholder="Enter Title"
          :class="{
            'border-red-500': errors.title,
            'border-gray-300': !errors.title,
          }"
          class="w-full p-2 border rounded"
        />
      </div>

      <!-- Category -->
      <div class="form-field">
        <label class="label">Category</label>
        <div class="flex gap-2">
          <Select v-model="selectedItem.category" :options="categories" />
          <button @click="openCategoryModal" class="p-2 rounded text-black">
            +
          </button>
        </div>
      </div>

      <!-- Description -->
      <div class="form-field">
        <label class="label">Description</label>
        <Textarea
          v-model="selectedItem.description"
          :rows="3"
          placeholder="Enter Description"
        />
      </div>

      <!-- Quantity -->
      <div class="form-field">
        <label class="label">Quantity</label>
        <n-input-number
          v-model:value="selectedItem.quantity"
          :min="1"
          :max="10"
          placeholder="Edit Quantity"
          class="custom-input-number"
        />
      </div>

      <!-- Price -->
      <div class="form-field">
        <label class="label">Price</label>
        <Input
          type="text"
          v-model="selectedItem.price"
          @input="validatePriceInput"
          placeholder="Enter Price"
          class="w-full p-2 border rounded"
        />
      </div>
    </div>

    <div class="form-field">
      <label class="label">Upload Image</label>
      <div class="flex flex-start">
        <FileUpload v-model="selectedItem.image[0]" />
      </div>
    </div>

    <!-- Bottom Panel / Edit Button -->
    <div class="mt-6 flex justify-end">
      <button
        @click="createItem"
        class="text-white px-4 py-2 rounded"
        style="background-color: var(--primary-btn-color, #4caf50)"
      >
        Edit
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Input from "~/components/reuse/ui/Input.vue";
import Textarea from "~/components/reuse/ui/Textarea.vue";
import { NInputNumber } from "naive-ui";
import Select from "~/components/reuse/ui/Select.vue";
import FileUpload from "~/components/reuse/ui/FileUpload.vue";

// Declare the selectedItem and errors state
const selectedItem = ref({
  title: "Product Name",
  image: [],
  description: "",
  quantity: 1,
  price: null,
});

const categories = ref([
  { label: "Salads", value: "salads" },
  { label: "Drinks", value: "drinks" },
  { label: "Desserts", value: "desserts" },
  { label: "Salad1s", value: "salads" },
  { label: "Drinks2", value: "drinks" },
  { label: "Desserts1", value: "desserts" },
]);
const errors = ref({
  title: false,
  quantity: false,
  price: false,
});

const validatePriceInput = (value) => {
  // Only allow numbers and the decimal point
  const regex = /^[0-9]*\.?[0-9]*$/;
  if (!regex.test(selectedItem.value.price)) {
    selectedItem.value.price = selectedItem.value.price.slice(0, -1);
  }
};

const createItem = () => {
  if (selectedItem.value.title.trim() === "") {
    errors.value.title = true;
    return;
  }
  errors.value.title = false;
  console.log(selectedItem);
  emit("create-item", selectedItem.value);
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  selectedItem.value.image[0] = URL.createObjectURL(file);
};

const openCategoryModal = () => {
  emit("open-category-modal");
};
</script>

<style scoped>
@import "~/assets/css/form.css";
.modal-container {
  display: flex;
  width: 100%;
  top: 0;
  height: 100%;
  animation: moveUp 0.3s ease-out;
}
</style>
