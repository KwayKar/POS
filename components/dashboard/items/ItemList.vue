<template>
  <div class="w-full py-4">
    <CategoryList :categories="uniqueCategories" @select-category="filterItems" />

    <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="item in filteredItems"
        :key="item.id"
        @click="selectItem(item)"
        class="border rounded-lg shadow-lg overflow-hidden"
      >
        <div class="relative aspect-w-1 aspect-h-1">
          <img :src="item.image" :alt="item.title" width="500" height="500" />
        </div>
        <div class="p-4">
          <h2 class="text-xl font-semibold text-center">{{ item.title }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryList from '../categories/CategoryList.vue';

export default {
  components: {
    CategoryList,
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
    categories: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      items: this.items,
      categories: this.categories
    };
  },
  computed: {
    uniqueCategories() {
      return [{id: 'all', name: "All"}, ...new Set(this.categories.map((item) => item))];
    },
    filteredItems() {
      console.log(this.selectedCategory)
      return this.selectedCategory && this.selectedCategory != "all"
        ? this.items.filter((item) => item.category.id === this.selectedCategory)
        : this.items;
    },
  },
  methods: {
    filterItems(category) {
      this.selectedCategory = category.id;
    },
    selectItem(item) {
      this.$emit('select-item', 'edit', item);
    },
  },
};
</script>

<style scoped>
</style>
