<template>
  <component
    :is="CurrentTemplate"
    :categories="menu.items"
    :activeCategory="menu.selectedCategory.id"
    :onSelect="scrollToCategory"
    :onCategoryInView="menu.onSelectCategory"
  />
</template>

<script setup>
import { computed } from "vue";
import { useMenu } from "~/stores/menu/useMenu";
import TemplateA from "~/templates/TemplateA.vue";

const menu = useMenu();
menu.setCategory(menu.items[0]);

const templateMap = {
  A: TemplateA,
  // B: TemplateB,
};

const CurrentTemplate = computed(
  () => templateMap[menu.templateType] || TemplateA
);

function scrollToCategory(id) {
  const el = document.querySelector(`[data-category-id="${id}"]`);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>
