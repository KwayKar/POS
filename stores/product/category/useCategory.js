import { defineStore } from "pinia";
import axios from "axios";
import { useRuntimeConfig } from "nuxt/app";

export const useCategory = defineStore("category", {
  state: () => ({
    categories: [],
    selectedCategoryID: null,
    filteredCategories: [],
  }),

  getters: {
    getCategoryList: (state) => state.categories,
    getSelectedCategory: (state) =>
      state.categories.find((c) => c.id === state.selectedCategoryID),
  },

  actions: {
    async fetchCategories() {
      try {
        const config = useRuntimeConfig();
        const response = await axios.get(`${config.public.apiBaseUrl}/categories`);
        this.categories = response.data; 
      } catch (error) {
        console.error('Failed to fetch categories');
      }
    },

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
