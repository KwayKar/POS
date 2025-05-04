import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { generateId } from '~/utils/generateId';

export const useProductCustomization = defineStore('productCustomization', () => {
  const categories = ref([
    { id: "removal", name: "Removal" },
    { id: "addon", name: "Addon" },
    { id: "choices", name: "Choices" }
  ]);
  const customizations = ref([
    { id: 1, title: "No Cheese", type: "removal", image: "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good,dpr_2,c_scale,w_90/v1703102673/gravy/production/Gravy::Ingredient/S423_OLO_SpicyCashew_800x800_qksety" },
    { id: 2, title: "Extra Bacon", type: "addon", maxLimit: 3, startAt: 0, image: "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good,dpr_2,c_scale,w_90/v1703102673/gravy/production/Gravy::Ingredient/S423_OLO_SpicyCashew_800x800_qksety" },
    {
      id: 3,
      title: "Ketchup",
      type: "choices",
      image: "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good,dpr_2,c_scale,w_90/v1703101907/gravy/production/Gravy::Ingredient/S423_OLO_Cilantro_800x800_cn99ss"
    },
    { id: 4, title: "No Pickles", type: "removal", image: "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good,dpr_2,c_scale,w_90/v1703100133/gravy/production/Gravy::Ingredient/S423_OLO_Salmon_800x800_ik7dyb" },
    { id: 5, title: "Add Avocado", type: "addon", maxLimit: 3, startAt: 1, image: "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good,dpr_2,c_scale,w_90/v1703101907/gravy/production/Gravy::Ingredient/S423_OLO_Cilantro_800x800_cn99ss" },
    {
      id: 6,
      title: "White Rice",
      description: "Description goes here",
      type: "choices",
      image: "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good,dpr_2,c_scale,w_90/v1703101907/gravy/production/Gravy::Ingredient/S423_OLO_Cilantro_800x800_cn99ss"
    },
  ]);
  
  const selectedItem = ref({
    image: "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good,dpr_2,c_scale,w_90/v1703100852/gravy/production/Gravy::Ingredient/S423_OLO_HardBoiledEggs_800x800_lcg8ac",
    title: "A",
    description: "",
    price: 0,
  });

  const getCustomizations = computed(() => customizations.value);
  const getCustomizationCategories = computed(() => categories.value);

  const getCustomizationsByType = (type) => {
    return computed(() => customizations.value.filter(customization => customization.type === type));
  };

  const setSelectedItem = (item) => {
    selectedItem.value = item;
  };

  const updateCustomization = (id, updatedCustomization) => {
    const index = customizations.value.findIndex((customization) => customization.id === id);
    if (index !== -1) {
      customizations.value[index] = updatedCustomization;
    }
  };

  const addCustomization = (customization) => {
    const raw = toRaw(customization);
    customizations.value.push({
      ...raw
    });
  };

  const deleteCustomization = (id) => {
    customizations.value = customizations.value.filter((customization) => customization.id !== id);
  };

  const clearCustomizations = () => {
    customizations.value = [];
  };

  return {
    customizations,
    selectedItem,       
    getCustomizations,
    getCustomizationCategories,
    getCustomizationsByType,
    addCustomization,
    updateCustomization,
    deleteCustomization,
    clearCustomizations,
    setSelectedItem
  };
});
