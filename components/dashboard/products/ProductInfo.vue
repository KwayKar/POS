<template>
  <div class="modal-content flex flex-col h-full">
    <div class="flex flex-col p-3 lg:flex-row gap-4 flex-grow">
      <!-- Left Panel - Image and Title -->
      
      <div class="flex flex-col w-full lg:w-1/2 flex-grow">
        <div class="relative">
        <img
          v-show="selectedItem?.image"
          :src="selectedItem?.image"
          alt="Item Image"
          class="w-full h-auto rounded"
        />

        <button
          v-if="selectedItem?.image"
          class="absolute bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full opacity-70 hover:opacity-100 transition-opacity"
        >
          Edit
        </button>
        </div>
      </div>

      <!-- Right Panel  Item Info -->
      <div
        class="w-full lg:w-1/2 bg-gray-100 overflow-y-auto max-h-[400px] p-4 rounded"
        style="-ms-overflow-style: none; scrollbar-width: none"
      >
        <h4 class="text-md font-semibold mb-2">Item Information</h4>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Title</label>
          <div>
            <input
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
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700"
            >Description</label
          >
          <div>
            <input
              type="text"
              v-model="selectedItem.description"
              placeholder="Enter Description"
              :class="{
                'border-red-500': errors.description,
                'border-gray-300': !errors.description,
              }"
              class="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700"
            >Quantity</label
          >
          <div>
            <input
              type="number"
              v-model="selectedItem.quantity"
              :min="1"
              :max="10"
              class="w-full p-2 border rounded"
              placeholder="Edit Quantity"
            />
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Price</label>
          <div>
            <input
              type="text"
              v-model="selectedItem.price"
              placeholder="Enter Price"
              :class="{
                'border-red-500': errors.price,
                'border-gray-300': !errors.price,
              }"
              class="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Panel / Edit and Remove Buttons -->
    <div class="mt-4 flex justify-between p-4 bg-gray-200 rounded-b">
      <button
        @click="deleteItem"
        class="text-white bg-red-500 rounded p-2.5 w-[40px] h-[40px]"
      >
        <svg
          viewBox="0 0 24 24"
          class="fill-white"
          tabindex="-1"
          title="DeleteOutline"
        >
          <path
            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM8 9h8v10H8zm7.5-5-1-1h-5l-1 1H5v2h14V4z"
          ></path>
        </svg>
      </button>
      <button
        @click="editItem"
        class="text-white px-4 py-2 rounded"
        style="background-color: var(--primary-btn-color, #4caf50)"
      >
        <i class="fas fa-trash-alt"></i> Edit
      </button>
    </div>
  </div>
</template>

<script>
import Input from "~/components/reuse/ui/Input.vue";

export default {
  comments: {
    Input,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedItem: { ...this.item },
      errors: {},
    };
  },
  methods: {
    editItem() {
      this.$emit("edit-item", {
        ...this.selectedItem,
        title: this.selectedItem.title,
        description: this.selectedItem.description,
        quantity: this.selectedItem.quantity,
        price: this.selectedItem.price,
      });
    },
    deleteItem() {
      this.$emit("remove-item", this.selectedItem.id);
    },
  },
};
</script>

<style scoped>
.fixed {
  position: fixed;
}

.w-full {
  width: 100%;
}

.p-4 {
  padding: 16px;
}

.text-gray-700 {
  color: #4a4a4a;
}

.text-white {
  color: white;
}

.bg-gray-100 {
  background-color: #f7fafc;
}

.bg-gray-800 {
  background-color: #2d3748;
}

.rounded {
  border-radius: 8px;
}

.text-md {
  font-size: 1rem;
}

.text-lg {
  font-size: 1.125rem;
}

.text-sm {
  font-size: 0.875rem;
}

.font-bold {
  font-weight: bold;
}

.font-medium {
  font-weight: 500;
}

.mb-4 {
  margin-bottom: 16px;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
