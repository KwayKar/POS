<template>
  <div
    ref="containerRef"
    class="flex flex-col"
    style="height: 100vh; position: relative; display: flex; flex-direction: column"
  >
    <div class="wrap-category-list p-4 pb-0 shrink-0">
      <CategoryList
        :categories="uniqueCategories"
        :selected="selectedCategory"
        @select-category="filterItems"
      />
    </div>

    <div
      ref="scrollEl"
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
            <h2 class="item-title">{{ item.title }}</h2>
            <p class="text-m">{{ item.price }}</p>
          </div>
        </div>
      </div>
    </div>

    <transition name="pop-up">
      <div v-if="orderMessage?.success !== null"
        :class="['message-label', orderMessage.success ? 'success' : 'error']">
        {{ orderMessage.label }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import CategoryList from "./CategoryList.vue";
import { useOrder } from "~/stores/order/useOrder";

const orderStore = useOrder();
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
  disableNavbar: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["select-item", "scrollBottom"]);
const panelHeight = ref(0);
const selectedCategory = ref("all");
const containerWidth = ref(0);
const containerRef = ref(null);
const scrollEl = ref(null);

const orderMessage = computed(() => orderStore.message || { success: null, label: '' });
watch(
  () => orderStore.message,
  (newVal) => {
    if (!newVal || !newVal.label) return;
    if (scrollTimeout) clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      orderStore.resetMessage();
    }, 3000);
  },
  { deep: true }
);

let resizeObserver;

function updatePanelHeight() {
  panelHeight.value = window.innerHeight - (props.disableNavbar ? 0 : 130);
}

const gridClass = computed(() => {
  const width = containerWidth.value;
  if (width < 640) return "grid grid-cols-2";
  if (width < 950) return "grid grid-cols-3";
  if (width < 1300) return "grid grid-cols-4";
  return "grid grid-cols-4";
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
  window.addEventListener("resize", updatePanelHeight);

  if (scrollEl.value) {
    scrollEl.value.addEventListener("scroll", handleScroll, { passive: true });
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWidth);
  if (resizeObserver && containerRef.value) {
    resizeObserver.unobserve(containerRef.value);
  }
});

let scrollTimeout = null;
const handleScroll = () => {
  if (scrollTimeout) clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(() => {
     const el = scrollEl.value;
    if (!el) return;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
      emit("scrollBottom");
    }
  }, 200);
};

onUnmounted(() => {
  if (scrollEl.value) {
    scrollEl.value.removeEventListener("scroll", handleScroll);
  }
});

const uniqueCategories = computed(() => {
  const categorySet = new Set(props.categories.map((item) => item));
  return [{ id: "all", name: "All" }, ...categorySet];
});

const filteredItems = computed(() => {
  return selectedCategory.value && selectedCategory.value !== "all"
    ? props.items.filter((item) => item.categoryId === selectedCategory.value)
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


.message-label {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

  background: #f2f2ff;
  border: 1px solid #478aff;
  border-radius: 8px;
  padding: 8px 26px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #5c67ac;
}

.message-label.success {
  background: var(--transparent-green-1);
  border: 1px solid var(--green-1);
  color: var(--white-1);
}

.message-label.error {
  background: #f47777b0;
  border: 1px solid var(--red-1);;
  color: var(--white-1);
}

/* pop-up animation */
.pop-up-enter-from {
  transform: translate(-50%, 50%);
  opacity: 0;
}
.pop-up-enter-to {
  transform: translate(-50%, 0);
  opacity: 1;
}
.pop-up-enter-active {
  transition: all 0.4s ease-out;
}

.pop-up-leave-from {
  transform: translate(-50%, 0);
  opacity: 1;
}
.pop-up-leave-to {
  transform: translate(-50%, 50%);
  opacity: 0;
}
.pop-up-leave-active {
  transition: all 0.4s ease-in;
}
</style>
