<template>
    <div class="p-4">
      <!-- Input and Create Button -->
      <div class="flex items-center gap-4 mb-4">
        <input
          v-model="newCategory"
          type="text"
          placeholder="Add a new category"
          class="flex-1 p-2 border rounded"
        />
        <button
          @click="addCategory"
          class="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Create
        </button>
      </div>
  
      <!-- Category List -->
      <div class="category-list">
        <div
          v-for="(category, index) in categories"
          :key="category.id"
          class="flex items-center justify-between p-2 border-b"
          @mouseenter="isHovered = index"
          @mouseleave="isHovered = null"
        >
          <!-- Category Name -->
          <span class="flex-1">{{ category.name }}</span>
       
          <!-- Always visible on larger screens -->
          <div class="flex gap-2">
            <button
              @click="openEditModal(index)"
              class="px-2 py-1 bg-yellow-400 text-white rounded"
            >
              Edit
            </button>
            <button
              @click="openRemoveModal(index)"
              class="px-2 py-1 bg-red-600 text-white rounded"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
  
      <!-- Edit Modal -->
      <div v-if="isEditModalVisible" class="modal-overlay">
        <div class="modal-content">
          <h2>Edit Category</h2>
          <input
            v-model="editedCategoryName"
            type="text"
            class="p-2 border rounded mb-4"
          />
          <div class="modal-actions">
            <button @click="updateCategory" class="px-4 py-2 bg-blue-600 text-white rounded">
              Save
            </button>
            <button @click="closeEditModal" class="px-4 py-2 bg-gray-400 text-white rounded">
              Cancel
            </button>
          </div>
        </div>
      </div>
  
      <!-- Confirmation Modal -->
      <div v-if="isRemoveModalVisible" class="modal-overlay">
        <div class="modal-content">
          <h2>Are you sure you want to remove this category?</h2>
          <div class="modal-actions">
            <button @click="removeCategory" class="px-4 py-2 bg-red-600 text-white rounded">
              Yes, Remove
            </button>
            <button @click="closeRemoveModal" class="px-4 py-2 bg-gray-400 text-white rounded">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      categories: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        newCategory: "",
        isHovered: null,
        editedCategoryName: "",
        categoryToRemove: null,
        isEditModalVisible: false,
        isRemoveModalVisible: false,
        categoryIndexToEdit: null,
      };
    },
    methods: {
      addCategory() {
        if (this.newCategory.trim() === "") {
          alert("Category name cannot be empty!");
          return;
        }
        const newCategory = { id: Date.now(), name: this.newCategory };
        this.$emit("update-categories", [...this.categories, newCategory]);
        this.newCategory = "";
      },
      openEditModal(index) {
        this.categoryIndexToEdit = index;
        this.editedCategoryName = this.categories[index].name;
        this.isEditModalVisible = true;
      },
      closeEditModal() {
        this.isEditModalVisible = false;
        this.categoryIndexToEdit = null;
        this.editedCategoryName = "";
      },
      updateCategory() {
        if (this.editedCategoryName.trim() !== "") {
          const updatedCategories = [...this.categories];
          updatedCategories[this.categoryIndexToEdit].name = this.editedCategoryName;
          this.$emit("update-categories", updatedCategories);
          this.closeEditModal();
        }
      },
      openRemoveModal(index) {
        this.categoryToRemove = index;
        this.isRemoveModalVisible = true;
      },
      closeRemoveModal() {
        this.isRemoveModalVisible = false;
        this.categoryToRemove = null;
      },
      removeCategory() {
        const updatedCategories = this.categories.filter(
          (_, index) => index !== this.categoryToRemove
        );
        this.$emit("update-categories", updatedCategories);
        this.closeRemoveModal();
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    text-align: center;
  }
  
  .modal-actions {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  
  .category-list > div {
    transition: background-color 0.2s ease;
  }
  
  .category-list > div:hover {
    background-color: #f0f0f0;
  }
  
  .action-buttons {
    display: none;
  }
  </style>
  