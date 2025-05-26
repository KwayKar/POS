<template>
  <div class="shop-template-a">
    <ShopNavPanel />
    <CategoriesA
      :categories="categories"
      :activeCategory="activeCategory"
      @select="onSelect"
    />
    <ItemList :categories="categories" @categoryInView="$emit('categoryInView', $event)" />
  </div>
</template>

<script setup>
import CategoriesA from '~/components/shop-templates/categories/CategoriesA.vue';
import ItemList from '~/components/shop-templates/items/list/ItemList.vue';
import ShopNavPanel from '~/components/shop-templates/shopNavbar/ShopNavPanel.vue';

defineProps({
  categories: Array,
  activeCategory: [String, Number],
  onSelect: Function,
  onCategoryInView: Function,
});
defineEmits(['categoryInView']);

</script>
