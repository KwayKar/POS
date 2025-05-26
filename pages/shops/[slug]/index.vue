<template>
  <component
    :is="CurrentTemplate"
    :categories="menu.items"
    :activeCategory="menu.selectedCategory"
    @select="scrollToCategory"
    @categoryInView="menu.setCategory"
  />
</template>

<script setup>
import { computed } from "vue";
import { useRestaurant } from "~/stores/shop/useRestaurant";
import TemplateA from "~/templates/TemplateA.vue";

const menu = useRestaurant();
menu.setCategory(menu.items[0]?.id);

const templateMap = {
  A: TemplateA,
  // B: TemplateB,
};

const CurrentTemplate = computed(
  () => templateMap[menu.templateType] || TemplateA
);

function scrollToCategory(id) {
  const el = document.querySelector(`[data-category-id="${id}"]`);
  if (el) {
    menu.blockObserver();

    const y = el.getBoundingClientRect().top + window.pageYOffset - 145;
    window.scrollTo({ top: y, behavior: 'smooth' });

    setTimeout(() => {
      menu.unblockObserver()
    }, 1000)
  }
}
</script>
