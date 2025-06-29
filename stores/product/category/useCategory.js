import { defineStore } from "pinia";
import axios from "axios";
import { useRoute, useRuntimeConfig } from "nuxt/app";
import { useAdmin } from "~/stores/admin/useAdmin";
import { useMenu } from "~/stores/menu/useMenu";

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
        const response = await axios.get(
          `${config.public.apiBaseUrl}/categories`
        );
        this.categories = response.data;
      } catch (error) {
        // console.error("Failed to fetch categories");
      }
    },

    setSelectedCategoryID(id) {
      this.selectedCategoryID = id;
    },

    getCategoryDetails(id) {
      return this.categories.find((c) => c.id === id);
    },

    async createCategory(category) {
      const admin = useAdmin();
      const menuStore = useMenu();

      if (admin.businessType === "restaurant") {
        const body = {
          name: category?.name,
          images: category.image[0],
        };
        menuStore.addCategoryToMenu(body);
      } else {
        this.categories = [...this.categories, res];
      }
    },

    updateCategory(id, updates) {
      const admin = useAdmin();
      const menuStore = useMenu();

      if (admin.businessType === "restaurant") {
        const body = {
          name: updates?.name,
          images: updates?.image?.[0],
        };
        menuStore.updateCategoryInMenu(updates?.id, body);
      }

      const index = this.categories.findIndex((c) => c.id === id);
      this.categories[index] = { ...this.categories[index], ...updates };

      if (index !== -1 && admin.businessType !== "restaurant") {
        this.categories = [...this.categories, res];
      }
    },

    deleteCategory(id) {
      const admin = useAdmin();
      const menuStore = useMenu();

      if (admin.businessType === "restaurant") {
        menuStore.removeCategoryFromMenu(id);
      } else {
        this.categories = this.categories.filter((c) => c.id !== id);
      }
    },

    filterCategories(keyword) {
      this.filteredCategories = this.categories.filter((c) =>
        c.name.toLowerCase().includes(keyword.toLowerCase())
      );
    },
  },
});
