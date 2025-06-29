<template>
  <div v-cloak>
    <DashboardLayout>
      <NavPanel
        class="navPanel fixed top-0 left-0 lg:left-[100px] w-full lg:w-[calc(100%-100px)] h-16"
        style="z-index: 99"
      >
        <NavPanelButton
          @click="openToCreateProduct"
          style="border: 1px solid var(--black-1)"
        > 
          Create Product
        </NavPanelButton>
      </NavPanel>

      <div class="flex flex-col lg:flex-row h-full" :style="{ width: '100%' }">
        <div class="h-full" :style="{ width: '100%' }">
          <ItemList
            :items="items"
            :categories="categories"
            @select-item="openModal"
          />
        </div>

        <Modal
          v-if="modal.isOpen && modal.type === 'edit'"
          @close="closeModal"
          :width="modalWidth"
          :minHeight="'740px'"
          :isFullScreenMobile="true"
        >
          <ProductInfo
            :item="selectedItem"
            :mode="'edit'"
            @edit-item="updateItem"
            @remove-item="removeItem"
            @close-modal="closeModal"
          />
        </Modal>

        <Modal
          v-if="modal.isOpen && modal.type === 'create'"
          @close="closeModal"
          :width="modalWidth"
          :minHeight="'740px'"
          :isFullScreenMobile="true"
        >
          <!-- <CreateProduct
            @create-item="createItem"
            @open-category-modal="openCategoryModal"
          /> -->
          <ProductInfo
            :item="selectedItem"
            :mode="'create'"
            @create-item="createItem"
            @close-modal="closeModal"
          />
        </Modal>

        <Modal
          v-if="modal.isOpen && modal.type === 'category'"
          @close="closeModal"
          :minHeight="'400px'"
        >
          <CategoryForm
            :categories="categories"
            @update-categories="updateCategories"
          />
        </Modal>
      </div>
    </DashboardLayout>
  </div>
</template>

<script setup>
import { ref, toRaw } from "vue";
import ItemList from "~/components/dashboard/items/ItemList.vue";
import NavPanel from "~/components/dashboard/panels/NavPanel.vue";
import ProductInfo from "~/components/dashboard/products/ProductInfo.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import DashboardLayout from "~/layouts/DashboardLayout.vue";
import NavPanelButton from "~/components/dashboard/panels/NavPanelButton.vue";
import { useAdmin } from "~/stores/admin/useAdmin";
import { useCategory } from "~/stores/product/category/useCategory";
import { useProduct } from "~/stores/product/useProduct";
import CategoryForm from "~/components/dashboard/products/categories/CategoryForm.vue";

const admin = useAdmin();
const categoryStore = useCategory();
const productStore = useProduct();

const modal = ref({
  type: null,
  isOpen: false,
});
const selectedItem = ref(null);
const windowWidth = ref(0);

const categories = computed(() => categoryStore.getCategoryList);
const items = computed(() => productStore.items); 

const openModal = (item, type) => {
  selectedItem.value = { ...item };
  modal.value = {
    type,
    isOpen: true,
  };
};

const closeModal = () => {
  modal.value = {
    type: null,
    isOpen: false,
  };
  selectedItem.value = null;
};

const createItem = (item) => {
  items.value.push(item);
  closeModal();
};

const updateItem = (updatedItem) => {
  const index = items.value.findIndex(item => {
    return item.id === updatedItem.id
});
  if (index !== -1) {
    items.value[index] = { ...updatedItem };
  }
  closeModal();
};

const removeItem = (itemToRemove) => {
  items.value = items.value.filter((item) => item.id !== itemToRemove);
  closeModal();
};

const openToCreateProduct = () => {
  modal.value = {
    type: "create",
    isOpen: true,
  };
};

const openCategoryModal = () => {
  modal.value = {
    type: "category",
    isOpen: true,
  };
};

const updateCategories = (newCategories) => {
  categories.value = newCategories;
};

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  productStore.fetchProducts();
  categoryStore.fetchCategories();

  updateWindowWidth();
  window.addEventListener("resize", updateWindowWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth);
});

const modalWidth = computed(() => {
  if (windowWidth.value > 1200) {
    return "1000px";
  } else if (windowWidth.value > 1100) {
    return `${windowWidth.value - 100}px`;
  } else {
    return `${windowWidth.value - 120}px`;
  }
});
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
