<template>
  <div class="w-full py-4" style="min-height: 100vh">
    <CategoryList :categories="uniqueCategories" @select-category="filterItems" />

    <div class="gap-4" :class="gridClass">
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
      gridClass: "",
      selectedCategory: "All"
    };
  },
  mounted() {
    this.updateGridClass();
    window.addEventListener("resize", this.updateGridClass);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateGridClass);
  },
  computed: {
    uniqueCategories() {
      return [{id: 'all', name: "All"}, ...new Set(this.categories.map((item) => item))];
    },
    filteredItems() {
      return this.selectedCategory && this.selectedCategory !== "All"
        ? this.items.filter((item) => item.category == this.selectedCategory)
        : this.items;
    },
  },
  methods: {
    filterItems(category) {
      this.selectedCategory = category.name;
    },
    selectItem(item) {
      this.$emit('select-item', item);
    },
    updateGridClass() {
      const width = window.innerWidth;
      if (width < 640) {
        this.gridClass = "grid grid-cols-2";
      } else if (width < 768) {
        this.gridClass = "grid grid-cols-3";
      } else if (width < 1024) {
        this.gridClass = "grid grid-cols-4";
      } else if (width < 1300) {
        this.gridClass = "grid grid-cols-3";
      } else {
        this.gridClass = "grid grid-cols-4";
      }
    },
  },
};
</script>

<style scoped>
</style>
