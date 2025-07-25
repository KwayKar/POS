<template>
  <div ref="containerRef" class="min-h-screen product-customizations">
    <div class="p-4 pb-0 shrink-0">
      <CategoryList
        :categories="uniqueCategories"
        @select-category="filterItems"
      />
    </div>

    <div
      class="wrap-items wrap-product-items"
      :style="{ overflowY: 'auto', height: panelHeight + 'px' }"
    >
      <div class="product-options" :class="gridClass">
        <div
          v-for="customization in filteredItems"
          :key="customization.id"
          class="customization-card"
          @click="openEditModal(customization)"
        >
          <img
            :src="customization.image"
            alt="customization image"
            class="customization-image"
          />
          <div class="customization-info">
            <h3>{{ customization.title }}</h3>
            <p>{{ customization.type }}</p>
            <div class="customization-info-details">
              <div v-if="customization.price">
                <span>Price: {{ customization.price }}</span>
              </div>
              <div v-if="customization.maxLimit">
                <span>Max: {{ customization.maxLimit }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal
    v-if="modal.isOpen && modal.type === 'edit'"
    width="820px"
    height="auto"
    :isFullScreenMobile="true"
    @close="closeModal"
  >
    <CustomizationForm :mode="'edit'" @close="closeModal" />
  </Modal>
</template>

<script setup>
import CategoryList from "~/components/dashboard/items/CategoryList.vue";
import SelectProducts from "~/components/dashboard/items/SelectProducts.vue";
import CustomizationForm from "~/components/dashboard/products/customizations/CustomizationForm.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import { useProductCustomization } from "~/stores/product/useProductCustomization";

const store = useProductCustomization();
const containerRef = ref(null);
const panelHeight = ref(0);
const containerWidth = ref(0);
const selectedCategory = ref("All");
const modal = ref({ type: null, isOpen: false });
let resizeObserver;

const customizations = computed(() => store.customizations);
const categories = computed(() => store.categories);

const uniqueCategories = computed(() => {
  const categorySet = new Set(categories.value?.map((item) => item));
  return [{ id: "all", name: "All" }, ...categorySet];
});

const filteredItems = computed(() => {
  if (!customizations.value || customizations.value.length === 0) return [];

  return customizations.value
  // selectedCategory.value && selectedCategory.value !== "all"
  //   ? customizations.value.filter((item) => item.category === selectedCategory.value)
  //   : customizations.value;
});

const filterItems = (category) => {
  selectedCategory.value = category.id;
};

const openEditModal = (item) => {
  modal.value = {
    type: "edit", isOpen: true
  };
  store.setSelectedItem(item)
}

const closeModal = () => {
  modal.value = {
    type: "edit", isOpen: false 
  };
}

const updateWidth = () => {
  if (containerRef.value) {
    containerWidth.value = containerRef.value.offsetWidth;
  }
};

const updatePanelHeight = () => {
  panelHeight.value = window.innerHeight - 135;
};

const gridClass = computed(() => {
  const width = containerWidth.value;
  if (width < 640) return "grid grid-cols-2";
  if (width < 750) return "grid grid-cols-3";
  if (width < 950) return "grid grid-cols-3";
  if (width < 1200) return "grid grid-cols-4";
  return "grid grid-cols-5";
});

onMounted(async() => {
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
</script>

<style scoped>
.product-customizations {
  gap: 16px;
  justify-content: flex-start;
}

.customization-card {
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid var(--gray-2);
  border-radius: 0.5rem;
  transition: transform 0.2s;
  background: var(--white-1);
  box-shadow: 4px 4px 1px #bdbdbd6b;
  overflow: hidden;
  cursor: pointer;
}

.customization-image {
  width: 100%;
  height: auto;
  background: #e9e9e9;
}

.customization-info {
  padding: 12px;
  box-sizing: border-box;
}

.customization-info h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--forest-green);
}

.customization-info p {
  font-size: 14px;
  margin-bottom: 8px;
  text-transform: capitalize;
}

.customization-info span {
  font-size: 0.9rem;
  color: var(--gray-3);
}

.customization-info-details {
  display: flex;
  gap: 20px;
}

.wrap-items {
  width: 100%;
  gap: 12px;
  padding: 0 20px;
  box-sizing: border-box;
}

.wrap-product-items {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.product-options:last-child {
  margin-bottom: 120px;
}

.wrap-product-items::-webkit-scrollbar {
  display: none;
}

.wrap-product-items {
  overflow: -moz-scrollbars-none;
  scrollbar-width: none;
}

.product-options {
  gap: 20px;
  flex: 1;
}
</style>
