<template>
  <div class="modal-content flex flex-col h-full">
    <div class="flex flex-col p-3 lg:flex-row gap-4 flex-grow">
      <!-- Left Panel for image & title -->
      <div class="flex flex-col w-full lg:w-1/2 flex-grow">
        <div class="relative">
          <img
            v-show="selectedItem?.image"
            :src="selectedItem?.image"
            alt="Item Image"
            class="w-full h-auto rounded"
          />
        </div>
      </div>

      <!-- Right Panel / Item Info -->
      <div
        class="w-full lg:w-1/2 bg-gray-100 overflow-y-auto max-h-[400px] p-4 rounded"
        style="-ms-overflow-style: none; scrollbar-width: none"
      >
        <h4 class="text-md font-semibold mb-2">Item Information</h4>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Title</label>
          <div>
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
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700"
            >Category</label
          >
          <button
            @click="openCategoryModal"
            class="p-2 rounded bg-blue-500 text-white"
            >
            +
            </button>
          <div>
            <select
              v-model="selectedItem.category"
              class="w-full p-2 border rounded"
            >
              <option disabled value="">Select Category</option>
              <option
                v-for="category in categories"
                :key="category"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
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
        @click="createItem"
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
  components: {
    Input,
  },
  data() {
    return {
      selectedItem: {
        title: "Product Name",
        image: "https://via.placeholder.com/300x200.png?text=Upload+Image",
        description: "",
        quantity: 1,
        price: "",
      },
      categories: ["Salads", "Drinks", "Desserts"],
      title: "",
      errors: {
        title: false,
        quantity: false,
        price: false,
      },
    };
  },
  methods: {
    createItem() {
      if (this.selectedItem.title.trim() === "") {
        this.errors.title = true;

        console.log("emit");
        return;
      }
      this.errors.title = false;
      this.$emit("create-item", this.selectedItem);
    },
    openCategoryModal() {
      this.$emit("open-category-modal");
    }
  },
};
</script>
