<template>
  <div class="flex flex-col">
    <div class="wrap-category-list p-4 pb-0 shrink-0">
      <CategoryList
        v-if="displayCategories"
        :categories="uniqueCategories"
        :selected="selectedCategory"
        @select-category="filterItems"
      />
      <div v-else style="height: 48px">
        <h3 class="header3">Product List</h3>
      </div>
    </div>

    <div
      class="wrap-items wrap-product-items"
      :style="{ overflowY: 'auto', height: panelHeight + 'px' }"
    >
      <div class="product-items" :class="gridClass">
        <div
          v-for="item in filteredItems"
          :key="item.id"
          @click="onSelectItem(item)"
          class="product-item"
        >
          <div class="relative aspect-w-1 aspect-h-1">
            <img
              :src="item?.images[0]"
              :alt="item.title"
              class="product-image object-cover w-full h-full"
              width="500"
              height="500"
            />
          </div>
          <div class="p-3">
            <h2 class="item-title">{{ item.title }}</h2>
            <p class="text-m">{{ item.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal
    v-if="openModal"
    @close="closeModal"
    :width="modalWidth"
    :minHeight="'400px'"
    :isFullScreenMobile="true"
  >
    <AddOrderInfo
      :item="selectedItem"
      v-model="orderForm"
      :modalType="'create'"
      @update-item="handleUpdateOrderItem"
      @delete-item="handleDeleteOrderItem"
    />
  </Modal>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useProduct } from "~/stores/product/useProduct";
import { useCategory } from "~/stores/product/category/useCategory";
import CategoryList from "../../items/CategoryList.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import { useWindowSize } from "~/composables/useWindowSize";
import AddOrderInfo from "../../acceptOrder/AddOrderInfo.vue";
import { useOrder } from "~/stores/order/useOrder";

const categoryStore = useCategory();
const productStore = useProduct();
const orderStore = useOrder();

const emit = defineEmits(["add-selected-item", "close"]);

const panelHeight = ref();
const selectedCategory = ref("all");
const gridClass = ref("grid grid-cols-4");
const selectedItem = ref([]);
const isMobile = ref(false);
const openModal = ref(false);
const { width } = useWindowSize();
const orderForm = reactive({
  quantity: 1,
  preferences: null,
});

const props = defineProps({
  height: {
    type: Number,
    default: 700,
  },
  displayCategories: {
    type: Boolean,
    default: true,
  },
});

function getGridClass() {
  if (width.value < 600) return "grid grid-cols-2";
  if (width.value < 900) return "grid grid-cols-3";
  if (width.value < 1300) return "grid grid-cols-4";
  return "grid grid-cols-5";
}

function updateGridClass() {
  gridClass.value = getGridClass();
}

function updatePanelHeight() {
  const mobileScreen = window.innerWidth <= 900;
  isMobile.value = mobileScreen;
  panelHeight.value = mobileScreen ? window.innerHeight : props.height - 140;
}

onMounted(() => {
  productStore.fetchProducts();

  selectedItem.value = props.selectedItem;
  updateGridClass();
  updatePanelHeight();
  window.addEventListener("resize", updateGridClass);
  window.addEventListener("resize", updatePanelHeight);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateGridClass);
  window.removeEventListener("resize", updatePanelHeight);
});

const categories = computed(() => categoryStore.getCategoryList);
const items = computed(() => productStore.items || []);

const uniqueCategories = computed(() => {
  const rawCategories = categories.value;

  if (!Array.isArray(rawCategories)) return [{ id: "all", name: "All" }];

  const categorySet = new Map();
  rawCategories.forEach((item) => {
    if (item?.id && item?.name) {
      categorySet.set(item.id, item);
    }
  });

  return [{ id: "all", name: "All" }, ...categorySet.values()];
});

const filteredItems = computed(() => {
  console.log(items);
  return items.value;
  //  selectedCategory.value && selectedCategory.value !== "all"
  //   ? items.value.filter((item) => item.category === selectedCategory.value)
  //   : items.value;
});

function filterItems(category) {
  selectedCategory.value = category.id;
}

function onSelectItem(item) {
  selectedItem.value = item;
  openModal.value = true;
}

function closeModal() {
  openModal.value = false;
};

const handleUpdateOrderItem = (item) => {
  orderStore.addNewItemsToOrder(item);
  closeModal();
};

const handleDeleteOrderItem = (itemId) => {

}

const modalWidth = computed(() => {
  if (width.value > 1200) {
    return "850px";
  } else if (width.value > 1100) {
    return `${width.value - 100}px`;
  } else {
    return `${width.value - 120}px`;
  }
});
</script>

<style scoped>
.selected-item {
  border: 2px solid var(--forest-green);
}

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
  gap: 18px;
  flex: 1;
  margin: 2px 0 100px;
}
@media screen and (max-width: 900px) {
  .product-items {
    margin: 2px 0 200px;
  }
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
  /* box-shadow: 4px 4px 1px #bdbdbd6b; */
  cursor: pointer;
  overflow: hidden;
  background: var(--white-1);
}
.product-item.selected-item {
  border: 1px solid #e4ffe0;
  outline: 1px solid #7ab470;
  background-color: #eafae7;
}

.product-image {
  background: var(--very-light-gray);
  border-bottom: 1px solid #e3e3e3;
}

.item-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--forest-green);
  margin-bottom: 0.4rem;
}
</style>
