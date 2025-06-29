import axios from "axios";
import { useRoute, useRuntimeConfig } from "nuxt/app";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useMenu = defineStore("menu", () => {
  const items = ref([]);

  const selectedCategory = ref(null);
  const route = useRoute();
  const menuId = '0ac68852-f978-42c4-94bf-10aa4cba716b'; // route.params.menuId;
  const config = useRuntimeConfig();

  const fetchItems = async () => {
    // loading.value = true;
    // error.value = null;
    try {
      const response = await axios.get(
        `${config.public.apiBaseUrl}/menus/${menuId}`
      );
      items.value = response.data.categories;
    } catch (err) {
      // error.value = "Failed to load products";
    } finally {
      // loading.value = false;
    }
  };

  const onSelectCategory = (categoryId) => {
    const category = items.value.find((c) => c.id === categoryId);
    selectedCategory.value = category;
  };

  const setCategory = (category) => {
    selectedCategory.value = category;
  };

  const setSortedCategories = async (categories) => {
    items.value = categories;
    try {
      const categoryIds = categories.map((cat) => cat.id);
      await $fetch(
        `${config.public.apiBaseUrl}/menus/${menuId}/categories/sort`,
        {
          method: "PATCH",
          body: { categories: categoryIds },
        }
      );

      items.value = [...sortedCategories];
    } catch (error) {
      // console.error("Failed to update category order");
    }
  };

  const addCategoryToMenu = async (newCategory) => {
    const res = await $fetch(
      `${config.public.apiBaseUrl}/menus/${menuId}/categories`,
      { method: "POST", body: newCategory }
    );
    items.value = [...items.value, res];
  };

  const updateCategoryInMenu = async (categoryId, updatedData) => {
    const res = await $fetch(
      `${config.public.apiBaseUrl}/menus/${menuId}/categories/${categoryId}`,
      {
        method: "PATCH",
        body: updatedData,
      }
    );
    items.value = items.value.map((item) =>
      item.id === categoryId ? res : item
    );
  };

  const removeCategoryFromMenu = async (categoryId) => {
    await $fetch(
      `${config.public.apiBaseUrl}/menus/${menuId}/categories/${categoryId}`,
      {
        method: "DELETE",
      }
    );
    items.value = items.value.filter((item) => item.id !== categoryId);
  };

  const addItemsToCategory = async (newItems) => {
    const selectedCategoryId = selectedCategory.value.id;
    const category = items.value.find((c) => c.id === selectedCategoryId);

    if (category) {
      const res = await $fetch(
        `${config.public.apiBaseUrl}/menus/${menuId}/categories/${selectedCategoryId}/items`,
        {
          method: "POST",
          body: {
            productIds: newItems.map((item) => item.productId || item.id),
          },
        }
      );

      const targetCategory = items.value.find(
        (cat) => cat.id === selectedCategoryId
      );

      if (targetCategory) {
        targetCategory.items = [
          ...(targetCategory.items || []),
          ...(res?.newItems || []),
        ];
      } else {
        console.warn("Category not found");
      }
    }
  };

  const removeItemFromCategory = async (categoryId, itemId) => {
    const category = items.value.find((c) => c.id === categoryId);
    if (category) {
      category.items = category.items.filter((item) => item.id !== itemId);

      await $fetch(
        `${config.public.apiBaseUrl}/menus/${menuId}/categories/${categoryId}/items/${itemId}`,
        { method: "DELETE" }
      );
    }
  };

  const sortMenuItems = async (categoryId, newItems) => {
    const category = items.value.find((cat) => cat.id === categoryId);
    if (category) {
      category.items = newItems;

      await $fetch(
        `${config.public.apiBaseUrl}/menus/${menuId}/categories/${categoryId}/items/sort`,
        {
          method: "PATCH",
          body: { items: newItems.map((item) => item.id) },
        }
      );
    }
  };

  const selectedItems = computed(() => {
    const found = items.value.find(
      (entry) => entry.id === selectedCategory.value.id
    );
    return found ? found.items : [];
  });

  const toggleSnoozeItem = async (categoryId, itemId) => {
    const category = items.value.find((c) => c.id === categoryId);
    if (!category) return;

    const item = category.items.find((i) => i.id === itemId);
    if (!item) return;
    item.snoozed = !item.snoozed;

    await axios.patch(
      `${config.public.apiBaseUrl}/menus/${menuId}/items/${item.id}`,
      {
        snoozed: item.snoozed,
        overridePrice: item.overridePrice,
        sortOrder: item.sortOrder,
      }
    );
  };

  const categories = computed(() => {
    return items.value.map((cat) => ({
      id: cat.id,
      name: cat.name,
      sortOrder: cat.sortOrder,
      images: cat.images,
      menuId: cat.menuId,
    }))
  })

  const products = computed(() => {
    return items.value.flatMap((cat) =>
      (cat.items || []).map((item) => ({
        ...item.product,
        productId: item.productId,
        categoryId: item.categoryId,
        overridePrice: item.overridePrice,
        snoozed: item.snoozed,
      }))
    )
  })

  return {
    fetchItems,
    items, // categories + products
    categories, // categories only
    products, // products only
    onSelectCategory,
    selectedCategory,
    setCategory, // active Category
    selectedItems,
    sortMenuItems,
    setSortedCategories,
    addItemsToCategory,
    removeItemFromCategory,
    toggleSnoozeItem,
    addCategoryToMenu,
    updateCategoryInMenu,
    removeCategoryFromMenu,
  };
});
