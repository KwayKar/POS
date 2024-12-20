<template>
  <div class="container mx-auto py-4">
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
  data() {
    return {
      items: [
        { id: 1, title: "Item 1", category: "Salads", image: "https://images.ctfassets.net/eum7w7yri3zr/3Z3fW9JhznhFDphzlHNmRx/d6410c46ffb8fc2c4c19c736a7f8d920/SG_Web_Image_Salad_Guacamole_Greens.png?w=600&fm=avif&q=75" },
        { id: 2, title: "Item 2", category: "Drinks", image: "https://images.ctfassets.net/eum7w7yri3zr/3Z3fW9JhznhFDphzlHNmRx/d6410c46ffb8fc2c4c19c736a7f8d920/SG_Web_Image_Salad_Guacamole_Greens.png?w=600&fm=avif&q=75" },
        { id: 3, title: "Item 3", category: "Salads", image: "https://images.ctfassets.net/eum7w7yri3zr/3Z3fW9JhznhFDphzlHNmRx/d6410c46ffb8fc2c4c19c736a7f8d920/SG_Web_Image_Salad_Guacamole_Greens.png?w=600&fm=avif&q=75" },
        { id: 4, title: "Item 4", category: "Desserts", image: "https://images.ctfassets.net/eum7w7yri3zr/3Z3fW9JhznhFDphzlHNmRx/d6410c46ffb8fc2c4c19c736a7f8d920/SG_Web_Image_Salad_Guacamole_Greens.png?w=600&fm=avif&q=75" }
      ],
      selectedCategory: null,
    };
  },
  computed: {
    uniqueCategories() {
      return [...new Set(this.items.map((item) => item.category))];
    },
    filteredItems() {
      return this.selectedCategory
        ? this.items.filter((item) => item.category === this.selectedCategory)
        : this.items;
    },
  },
  methods: {
    filterItems(category) {
      this.selectedCategory = category;
    },
    selectItem(item) {
      this.$emit('select-item', item);
    },
  },
};
</script>

<style scoped>
</style>
