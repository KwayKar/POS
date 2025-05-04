<template>
  <div
    class="category-tabs"
    :style="{ backgroundColor: theme?.background || 'var(--white-1)' }"
  >
    <button
      v-for="cat in categories"
      :key="cat.id"
      @click="$emit('select', cat.id)"
      :class="['tab-button', { active: cat.id === activeCategory }]"
      :style="
        cat.id === activeCategory
          ? {
              backgroundColor: theme?.primary || '#000',
              color: theme?.onPrimary || '#fff',
            }
          : {
              backgroundColor: theme?.tabBg || '#f1f1f1',
              color: theme?.tabText || '#333',
            }
      "
    >
      {{ cat.category }}
    </button>
  </div>
</template>

<script setup>
import { useRestaurant } from "~/stores/shop/useRestaurant";

const {theme} = useRestaurant();

const props = defineProps({
  categories: Array,
  activeCategory: String,
});

defineEmits(["select"]);
</script>

<style scoped>
.category-tabs {
  overflow-x: auto;
  white-space: nowrap;
  padding: 12px 16px;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.tab-button {
  display: inline-block;
  margin-right: 15px;
  padding: 8px 26px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s, color 0.2s;
}
</style>
