import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useMenu = defineStore("menu", () => {

  const items = ref([
    {
      category: "Breakfast",
      id: 1,
      items: [
        {
          id: 3,
          title: "Item 3",
          category: "Drinks",
          price: 40,
          description: "Warm, golden potatoes with green goddess drizzle.",
          images: [
            "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1702673576/gravy/production/Gravy::MasterProduct/Q423_OLO_RoastedSweetPotatoesGreenGoddess_3600x2400_l2lxcx",
          ],
          options: [
            { id: 1, label: 'No Cheese', type: 'removal' },
            { id: 2, label: 'Extra Bacon', type: 'addon', maxLimit: 3, startAt: 0 },
            { id: 3, label: 'Choose Sauce', type: 'choices' },
            { id: 4, label: 'No Pickles', type: 'removal' },
            { id: 5, label: 'Add Avocado', type: 'addon', maxLimit: 3, startAt: 1 },
            { id: 6, label: 'White Rice', type: 'choices' },
          ],
          snooze: false,
        },
        {
          id: 2,
          title: "Item 1",
          category: "Drinks",
          price: 40,
          description: "Description goes here",
          images: [
            "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1702674222/gravy/production/Gravy::MasterProduct/Q42023_OLO_MiniMezze_3600x2400_2_kcab4k",
          ],
          snooze: false,
        },
        {
          id: 1,
          title: "Item 1",
          category: "Drinks",
          price: 40,
          description: "Description goes here",
          images: [
            "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1726538633/gravy/production/Gravy::MasterProduct/SG_OLO_Kale_Caesar_Steak_3600x2400_quqea9",
          ],
          snooze: false,
        },
        {
          id: 4,
          title: "Item 3",
          category: "Drinks",
          price: 40,
          description: "Warm, golden potatoes with green goddess drizzle.",
          images: [
            "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1702673576/gravy/production/Gravy::MasterProduct/Q423_OLO_RoastedSweetPotatoesGreenGoddess_3600x2400_l2lxcx",
          ],
          options: [
            { id: 1, label: 'No Cheese', type: 'removal' },
            { id: 2, label: 'Extra Bacon', type: 'addon', maxLimit: 3, startAt: 0 },
            { id: 3, label: 'Choose Sauce', type: 'choices' },
            { id: 4, label: 'No Pickles', type: 'removal' },
            { id: 5, label: 'Add Avocado', type: 'addon', maxLimit: 3, startAt: 1 },
            { id: 6, label: 'White Rice', type: 'choices' },
          ],
          snooze: false,
        },
      ],
    },
    {
      category: "Lunch",
      id: 2,
      items: [
        {
          id: 1,
          title: "Item 3",
          category: "Drinks",
          price: 40,
          description: "A vibrant mix of dips, grains, and fresh veggies.",
          images: [
            "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1702673576/gravy/production/Gravy::MasterProduct/Q423_OLO_RoastedSweetPotatoesGreenGoddess_3600x2400_l2lxcx",
          ],
          snooze: false,
        },
        {
          id: 2,
          title: "Item 1",
          category: "Drinks",
          price: 40,
          description: "Warm, golden potatoes with green goddess drizzle.",
          images: [
            "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1712783467/gravy/production/Gravy::MasterProduct/Q423_OLO_JasmineGreenTea_3600x2400_2_l3yl3q",
          ],
          snooze: false,
        },
        {
          id: 5,
          title: "Item 1",
          category: "Drinks",
          price: 40,
          description: "Grilled steak served over kale with a creamy Caesar.",
          images: [
            "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1712783434/gravy/production/Gravy::MasterProduct/Q423_OLO_Lemonade_3600x2400_zflkku",
          ],
          snooze: false,
        },
      ],
    },
    {
      category: "Dinner",
      id: 3,
      items: [
        {
          id: 1,
          title: "Item 3",
          category: "Drinks",
          price: 40,
          description: "Grilled steak served over kale with a creamy Caesar.",
          images: [
            "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1702673576/gravy/production/Gravy::MasterProduct/Q423_OLO_RoastedSweetPotatoesGreenGoddess_3600x2400_l2lxcx",
          ],
          snooze: false,
        },
      ],
    },
    {
      category: "Test 1",
      id: 4,
      items: [],
    },
    {
      category: "Test 1",
      id: 5,
      items: [],
    },
    {
      category: "Test 1",
      id: 6,
      items: [],
    },
    {
      category: "Test 1",
      id: 7,
      items: [],
    },
    {
      category: "Test 1",
      id: 8,
      items: [],
    },
    {
      category: "Test 1",
      id: 9,
      items: [],
    },
  ]);

  const selectedCategory = ref(null);

  const onSelectCategory = (categoryId) => {
    const category = items.value.find((c) => c.id === categoryId);
    selectedCategory.value = category;
  };

  const setCategory = (category) => {
    selectedCategory.value = category;
  };

  const setSortedCategories = (categories) => {
    items.value = categories;
  };

  const categoryList = computed(
    () => items.value
    // items.value.map((entry) => {
    //   return {
    //     category: entry.category,
    //     id: entry.id,
    //   };
    // })
  );

  const addItemsToCategory = (newItems) => {
    const category = items.value.find(
      (c) => c.id === selectedCategory.value.id
    );
    if (category) {
      category.items = newItems;
    }
  };

  const removeItemFromCategory = (categoryId, itemId) => {
    const category = items.value.find((c) => c.id === categoryId);
    if (category) {
      category.items = category.items.filter((item) => item.id !== itemId);
    }
  };

  const selectedItems = computed(() => {
    const found = items.value.find(
      (entry) => entry.id === selectedCategory.value.id
    );
    return found ? found.items : [];
  });

  const toggleSnoozeItem = (categoryId, itemId) => {
    const category = items.value.find((c) => c.id === categoryId);
    if (category) {
      category.items = category.items.map((item) =>
        item.id === itemId ? { ...item, snooze: !item.snooze } : item
      );
    }
  };

  return {
    items,
    onSelectCategory,
    selectedCategory,
    setCategory,
    selectedItems,
    setSortedCategories,
    addItemsToCategory,
    removeItemFromCategory,
    toggleSnoozeItem,
  };
});
