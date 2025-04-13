import { defineStore } from "pinia";

export const useCategory = defineStore("category", {
  state: () => ({
    categories: [
      { id: "CAT001", name: "Burgers", description: "All kinds of burgers", image: "" },
      { id: "CAT002", name: "Drinks", description: "Refreshing beverages", image: "" },
      { id: "CAT003", name: "Pasta", description: "Italian pastas", image: "https://cdn.shopify.com/s/files/1/1367/5201/files/Running2in1ShortGSWhiteA6A8F-WB5711478_b28f5058-72c9-422f-a0c5-ab04b8ca7463_3840x.jpg?v=1737639280" },
    ],
    selectedCategoryID: null,
    filteredCategories: [],
  }),

  getters: {
    getCategoryList: (state) => state.categories,
    getSelectedCategory: (state) =>
      state.categories.find((c) => c.id === state.selectedCategoryID),
  },

  actions: {
    setSelectedCategoryID(id) {
      this.selectedCategoryID = id;
    },

    getCategoryDetails(id) {
      return this.categories.find((c) => c.id === id);
    },

    createCategory(category) {
      this.categories.push(category);
    },

    updateCategory(id, updates) {
      const index = this.categories.findIndex((c) => c.id === id);
      if (index !== -1) {
        this.categories[index] = { ...this.categories[index], ...updates };
      }
    },

    deleteCategory(id) {
      this.categories = this.categories.filter((c) => c.id !== id);
    },

    filterCategories(keyword) {
      this.filteredCategories = this.categories.filter((c) =>
        c.name.toLowerCase().includes(keyword.toLowerCase())
      );
    },
  },
});
