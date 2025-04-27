<template>
  <div
    ref="containerRef"
    class="min-h-screen flex flex-col"
    style="min-height: 100vh; display: flex; flex-direction: column"
  >
    <div class="wrap-category-list p-4 pb-0 shrink-0">
      <CategoryList
        :categories="uniqueCategories"
        @select-category="filterItems"
      />
    </div>

    <div
      class="wrap-items wrap-product-items"
      :style="{ overflowY: 'auto', height: panelHeight + 'px' }"
    >
      <div class="product-items" :class="gridClass">
        <div
          v-for="item in filteredItems"
          :key="item.id"
          @click="selectItem(item, 'edit')"
          class="product-item"
        >
          <div class="relative aspect-w-1 aspect-h-1">
            <img
              :src="item.images[0]"
              :alt="item.title"
              class="product-image object-cover w-full h-full"
              width="500"
              height="500"
            />
          </div>
          <div class="p-4">
            <h2 class="item-title text-xl">{{ item.title }}</h2>
            <p class="text-m">{{ item.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import CategoryList from "./CategoryList.vue";

const props = defineProps({
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
});

const emit = defineEmits(["select-item"]);
const panelHeight = ref(0);
const selectedCategory = ref("All");
const containerWidth = ref(0);
const containerRef = ref(null);
let resizeObserver;

function updatePanelHeight() {
  panelHeight.value = window.innerHeight - 135;
}

const gridClass = computed(() => {
  const width = containerWidth.value;
  if (width < 640) return 'grid grid-cols-2';
  if (width < 950) return 'grid grid-cols-3';
  if (width < 1300) return 'grid grid-cols-4';
  return 'grid grid-cols-4';
});

const updateWidth = () => {
  if (containerRef.value) {
    containerWidth.value = containerRef.value.offsetWidth;
  }
};

onMounted(() => {
  updatePanelHeight();
  updateWidth(); 

  if (containerRef.value) {
    resizeObserver = new ResizeObserver(([entry]) => {
      containerWidth.value = entry.contentRect.width;
    });
    resizeObserver.observe(containerRef.value);
  }

  document.body.style.overflow = "hidden";
  window.addEventListener("resize", updateWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWidth);
  if (resizeObserver && containerRef.value) {
    resizeObserver.unobserve(containerRef.value);
  }
});

const uniqueCategories = computed(() => {
  const categorySet = new Set(props.categories.map((item) => item));
  return [{ id: "all", name: "All" }, ...categorySet];
});

const filteredItems = computed(() => {
  return selectedCategory.value && selectedCategory.value !== "All"
    ? props.items.filter((item) => item.category === selectedCategory.value)
    : props.items;
});

function filterItems(category) {
  selectedCategory.value = category.id;
}

function selectItem(item, type) {
  emit("select-item", item, type);
}
</script>

<style scoped>
.wrap-category-list {
  box-sizing: border-box;
}

.wrap-items {
  padding: 0 20px;
  box-sizing: border-box;
}

.wrap-product-items {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.product-items {
  gap: 20px;
  flex: 1;
  margin-bottom: 200px;
}

.wrap-product-items::-webkit-scrollbar {
  display: none;
}

.wrap-product-items {
  overflow: -moz-scrollbars-none;
  scrollbar-width: none;
}

.product-item {
  border: 1px solid var(--gray-2);
  border-radius: 0.5rem;
  background: var(--white-1);
  box-shadow: 4px 4px 1px #bdbdbd6b;
  cursor: pointer;
  overflow: hidden;
}

.product-image {
  background: #e9e9e9;
}

.item-title {
  font-weight: 600;
  color: var(--forest-green);
}
</style>
