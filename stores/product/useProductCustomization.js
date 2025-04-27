import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useProductCustomization = defineStore('productCustomization', () => {
  const categories = ref([
    { id: 1, name: "removal" },
    { id: 2, name: "addon" },
    { id: 3, name: "choices" }
  ]);
  const customizations = ref([
    { id: 1, label: "No Cheese", type: "removal", image: "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good,dpr_2,c_scale,w_90/v1703102673/gravy/production/Gravy::Ingredient/S423_OLO_SpicyCashew_800x800_qksety" },
    { id: 2, label: "Extra Bacon", type: "addon", maxLimit: 3, startAt: 0, image: "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good,dpr_2,c_scale,w_90/v1703102673/gravy/production/Gravy::Ingredient/S423_OLO_SpicyCashew_800x800_qksety" },
    {
      id: 3,
      label: "Ketchup",
      type: "choices",
      image: "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good,dpr_2,c_scale,w_90/v1703101907/gravy/production/Gravy::Ingredient/S423_OLO_Cilantro_800x800_cn99ss"
    },
    { id: 4, label: "No Pickles", type: "removal", image: "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good,dpr_2,c_scale,w_90/v1703100133/gravy/production/Gravy::Ingredient/S423_OLO_Salmon_800x800_ik7dyb" },
    { id: 5, label: "Add Avocado", type: "addon", maxLimit: 3, startAt: 1, image: "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good,dpr_2,c_scale,w_90/v1703101907/gravy/production/Gravy::Ingredient/S423_OLO_Cilantro_800x800_cn99ss" },
  ]);

  const getCustomizations = computed(() => customizations.value);
  const getCustomizationCategories = computed(() => categories.value);

  const getCustomizationsByType = (type) => {
    return computed(() => customizations.value.filter(customization => customization.type === type));
  };

  const updateCustomization = (id, updatedCustomization) => {
    const index = customizations.value.findIndex((customization) => customization.id === id);
    if (index !== -1) {
      customizations.value[index] = updatedCustomization;
    }
  };

  const addCustomization = (customization) => {
    customizations.value.push(customization);
  };

  const deleteCustomization = (id) => {
    customizations.value = customizations.value.filter((customization) => customization.id !== id);
  };

  const clearCustomizations = () => {
    customizations.value = [];
  };

  return {
    customizations,
    getCustomizations,
    getCustomizationCategories,
    getCustomizationsByType,
    addCustomization,
    updateCustomization,
    deleteCustomization,
    clearCustomizations,
  };
});
