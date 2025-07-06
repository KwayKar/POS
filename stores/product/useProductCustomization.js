import { defineStore } from 'pinia';
import { ref, computed, toRaw } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import { useAdmin } from '../admin/useAdmin';
import { apiFetch } from '~/utils/apiFetch';

export const useProductCustomization = defineStore('productCustomization', () => {

  const admin = useAdmin();
  const categories = ref([
    { id: "removal", name: "Removal" },
    { id: "addon", name: "Addon" },
    { id: "choices", name: "Choices" }
  ]);
  const customizations = ref([]);
  const selectedItem = ref(null);

  const config = useRuntimeConfig();


  const getCustomizationsByType = (type) => {
    return computed(() => customizations.value.filter(c => c.type === type));
  };

  const setSelectedItem = (item) => {
    selectedItem.value = item;
  };

  const updateCustomizationLocal = (id, updatedCustomization) => {
    const index = customizations.value.findIndex(c => c.id === id);
    if (index !== -1) {
      customizations.value[index] = updatedCustomization;
    }
  };

  const addCustomizationLocal = (customization) => {
    const raw = toRaw(customization);
    customizations.value.push(raw);
  };

  const deleteCustomizationLocal = (id) => {
    customizations.value = customizations.value.filter(c => c.id !== id);
  };

  const clearCustomizations = () => {
    customizations.value = [];
  };

  // --- Async actions for API calls ---

  const fetchCustomizations = async () => {
    try {
      const res = await apiFetch(`${config.public.apiBaseUrl}/org/${admin.estId}/customizations`);
      customizations.value = res;
    } catch (error) {
      console.error('Failed to fetch customizations:', error);
    }
  };

  const updateCustomization = async (id, updatedData) => {
    try {
      const res = await apiFetch(`${config.public.apiBaseUrl}/customizations/${id}`, {
        method: 'PUT',
        body: updatedData,
      });
      // update locally after successful update
      updateCustomizationLocal(id, res.data);
    } catch (error) {
      console.error('Failed to update customization:', error);
    }
  };

  const addCustomization = async (newCustomization) => {
    try {
      const res = await apiFetch(`${config.public.apiBaseUrl}/customizations`, {
        method: 'POST',
        body: newCustomization,
      });

      addCustomizationLocal(newCustomization);

      if (!res.success) {
        return { success: false, error: "Failed to create product" };
      }

      // customizations.value.push(newCustomization);
      return { success: true, data: res.data };
    } catch (error) {
      console.error('Failed to add customization:', error);
    }
  };

  const deleteCustomization = async (id) => {
    try {
      await apiFetch(`${config.public.apiBaseUrl}/customizations/${id}`, {
        method: 'DELETE',
      });
      deleteCustomizationLocal(id);
    } catch (error) {
      console.error('Failed to delete customization:', error);
    }
  };

  return {
    categories,
    customizations,
    selectedItem,
    getCustomizationsByType,
    setSelectedItem,
    fetchCustomizations,
    updateCustomization,
    addCustomization,
    deleteCustomization,
    clearCustomizations,
  };
});
