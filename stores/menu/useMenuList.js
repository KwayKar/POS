import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRuntimeConfig } from "nuxt/app";
import { apiFetch } from "~/utils/apiFetch";

export const useMenuList = defineStore('menuStore', () => {
  const menus = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const config = useRuntimeConfig();

  const fetchMenus = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await apiFetch(`${config.public.apiBaseUrl}/menus`);
      menus.value = data;
    } catch (err) {
      error.value = "Failed to load products";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    menus,
    isLoading,
    error,
    fetchMenus
  };
});
