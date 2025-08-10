<template>
  <div class="flex flex-col">
    <div class="wrap-item-list p-4 pb-0 shrink-0">
      <div style="height: 48px">
        <h3 class="header3">{{ title }}</h3>
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
          @click="toggleSelectItem(item)"
          class="product-item"
          :class="{ 'selected-item': isItemSelected(item) }"
        >
          <div class="relative aspect-w-1 aspect-h-1">
            <img
              :src="item?.image"
              :alt="item?.title"
              class="product-image object-cover w-full h-full"
              width="500"
              height="500"
            />
          </div>
          <div class="p-3">
            <h2 class="item-title">{{ item?.title }}</h2>
            <!-- <p class="text-m">{{ item?.price }}</p> -->
          </div>
        </div>
      </div>
    </div>

      <div class="modal-submit-section">
        <div class="modal-submit-section-btn">
          <div class="flex-1">
            <p style="margin-right: 22px">
              {{ selectedItems.length }} Items Selected
            </p>
          </div>

          <SubmitButton
            @click="submitSelected"
            :applyShadow="true"
            style="height: 40px"
            >Add</SubmitButton
          >
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import SubmitButton from "~/components/reuse/ui/SubmitButton.vue";
import { useProductCustomization } from "~/stores/product/useProductCustomization";

const customizationStore = useProductCustomization();

const emit = defineEmits(["add-selected-items", "close"]);

const panelHeight = ref();
const gridClass = ref("grid grid-cols-4");
const selectedItems = ref([]);
const isMobile = ref(false);

const props = defineProps({
  initialSelected: {
    type: Array,
    default: () => [],
  },
  type: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
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
  const width = window.innerWidth;
  if (width < 600) return "grid grid-cols-2";
  if (width < 900) return "grid grid-cols-3";
  if (width < 1300) return "grid grid-cols-4";
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

onMounted(async() => {
  await customizationStore.fetchCustomizations();

  selectedItems.value = [...props.initialSelected];
  updateGridClass();
  updatePanelHeight();
  window.addEventListener("resize", updateGridClass);
  window.addEventListener("resize", updatePanelHeight);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateGridClass);
  window.removeEventListener("resize", updatePanelHeight);
});

const items = computed(() => customizationStore.customizations || []);

const filteredItems = computed(() => {
  return items.value && items.value.filter((item) => item.type === props.type)
});

function toggleSelectItem(item) {
  const index = selectedItems.value.findIndex((i) => i.id === item.id);
  if (index >= 0) {
    selectedItems.value.splice(index, 1);
  } else {
    selectedItems.value.push(item);
  }
}

function isItemSelected(item) {
  return selectedItems.value.some((i) => i.id === item.id);
}

function submitSelected() {
  emit("add-selected-items", selectedItems.value);
  emit("close");
}
</script>

<style scoped>
.selected-item {
  border: 2px solid var(--forest-green);
  background-color: #eafae7;
}

.wrap-item-list {
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
}
.product-item.selected-item {
  border: 1px solid #e4ffe0;
  outline: 1px solid #7ab470;
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
