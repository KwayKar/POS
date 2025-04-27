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
            @edit-item="updateItem"
            @remove-item="removeItem"
          />
        </Modal>

        <Modal
          v-if="modal.isOpen && modal.type === 'create'"
          @close="closeModal"
          :width="modalWidth"
          :minHeight="'740px'"
          :isFullScreenMobile="true"
        >
          <CreateProduct
            @create-item="createItem"
            @open-category-modal="openCategoryModal"
          />
        </Modal>

        <Modal
          v-if="modal.isOpen && modal.type === 'category'"
          @close="closeModal"
          :minHeight="'400px'"
        >
          <CreateCategory
            :categories="categories"
            @update-categories="updateCategories"
          />
        </Modal>
      </div>
    </DashboardLayout>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ItemList from "~/components/dashboard/items/ItemList.vue";
import NavPanel from "~/components/dashboard/panels/NavPanel.vue";
import ProductInfo from "~/components/dashboard/products/ProductInfo.vue";
import CreateProduct from "~/components/dashboard/products/CreateProduct.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import DashboardLayout from "~/layouts/DashboardLayout.vue";
import CreateCategory from "~/components/dashboard/products/categories/CreateCategory.vue";
import NavPanelButton from "~/components/dashboard/panels/NavPanelButton.vue";
import { useAdmin } from "~/stores/admin/useAdmin";
import { useCategory } from "~/stores/product/category/useCategory";

const admin = useAdmin();
const categoryStore = useCategory();

const foodItems = ref([
  {
    id: 1,
    title: "Item 1",
    category: "Main",
    price: 30,
    description: "Description goes here",
    images: [
      "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1702672435/gravy/production/Gravy::MasterProduct/Q423_OLO_MisoSalmonGlazedPlate_3600x2400_2_orq1kg",
    ],
  },
  {
    id: 2,
    title: "Item 2",
    category: "Salads",
    price: 20,
    description: "Description goes here",
    images: [
      "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1726538887/gravy/production/Gravy::MasterProduct/SG_OLO_Crispy_Rice_Bowl_3600x2400_lattbf",
    ],
  },
  {
    id: 3,
    title: "Item 3",
    category: "Drinks",
    price: 40,
    description: "Description goes here",
    images: [
      "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1702673576/gravy/production/Gravy::MasterProduct/Q423_OLO_RoastedSweetPotatoesGreenGoddess_3600x2400_l2lxcx",
    ],
  },
  {
    id: 4,
    title: "Item 4",
    category: "Desserts",
    price: 30,
    description: "Description goes here",
    images: [
      "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1702673842/gravy/production/Gravy::MasterProduct/Q423_OLO_CrispyRiceTreat_3600x2400_tqjmag",
    ],
  },
  {
    id: 5,
    title: "Item 1",
    category: "Main",
    price: 30,
    description: "Description goes here",
    images: [
      "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1702672435/gravy/production/Gravy::MasterProduct/Q423_OLO_MisoSalmonGlazedPlate_3600x2400_2_orq1kg",
    ],
  },
  {
    id: 6,
    title: "Item 2",
    category: "Salads",
    price: 20,
    description: "Description goes here",
    images: [
      "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1726538887/gravy/production/Gravy::MasterProduct/SG_OLO_Crispy_Rice_Bowl_3600x2400_lattbf",
    ],
  },
  {
    id: 7,
    title: "Item 3",
    category: "Drinks",
    price: 40,
    description: "Description goes here",
    images: [
      "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1702673576/gravy/production/Gravy::MasterProduct/Q423_OLO_RoastedSweetPotatoesGreenGoddess_3600x2400_l2lxcx",
    ],
  },
  {
    id: 8,
    title: "Item 4",
    category: "Desserts",
    price: 30,
    description: "Description goes here",
    images: [
      "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1702673842/gravy/production/Gravy::MasterProduct/Q423_OLO_CrispyRiceTreat_3600x2400_tqjmag",
    ],
  },
]);

const clothingItems = [
  {
    id: 101,
    title: "T-Shirt",
    category: "Tops",
    price: 25,
    description: "A comfortable t-shirt.",
    size: [
      { label: "S", stock: 10 },
      { label: "M", stock: 8 },
      { label: "L", stock: 4 },
    ],
    color: [
      { id: 1, name: "Black", image: "https://cdn.shopify.com/s/files/1/1367/5201/files/Sport7ShortGSDarkGreyGSBlackA1B3L-GB7X1_dcf3d3eb-fbaf-46f5-9891-df7be2773140_3840x.jpg?v=1722948233", hex: "#000000" },
      { id: 2, name: "White", image: "https://cdn.shopify.com/s/files/1/1367/5201/files/Sport7ShortGSDarkGreyGSBlackA1B3L-GB7X1_dcf3d3eb-fbaf-46f5-9891-df7be2773140_3840x.jpg?v=1722948233", hex: "#FFFFFF" },
    ],
    images: ["https://cdn.shopify.com/s/files/1/1367/5201/files/Sport5ShortGSBlackA1B3M-BB2J1_8654cff7-5636-4919-92fe-78de8b3788a5_3840x.jpg?v=1722948231"],
  },
  {
    id: 102,
    title: "Jeans",
    category: "Bottoms",
    price: 40,
    description: "Stylish denim jeans.",
    size: [
      { label: "S", stock: 10 },
      { label: "M", stock: 8 },
      { label: "L", stock: 4 },
    ],
    color: [
      { id: 1, name: "Black", hex: "#000000" },
      { id: 2, name: "White", hex: "#FFFFFF" },
    ],
    images: ["https://cdn.shopify.com/s/files/1/1367/5201/files/Sport7ShortGSDarkGreyGSBlackA1B3L-GB7X1_dcf3d3eb-fbaf-46f5-9891-df7be2773140_3840x.jpg?v=1722948233"],
  },
  {
    id: 103,
    title: "Jeans",
    category: "Bottoms",
    price: 40,
    description: "Stylish denim jeans.",
    size: [
      { label: "S", stock: 10 },
      { label: "M", stock: 8 },
      { label: "L", stock: 4 },
    ],
    color: [
      { id: 1, name: "Black", hex: "#000000" },
      { id: 2, name: "White", hex: "#FFFFFF" },
    ],
    images: ["https://cdn.shopify.com/s/files/1/1367/5201/files/RunningTShirtGSBlackA7A4M-BB2J11517_5243de4c-4e42-4696-a5c4-198d33f79c03_3840x.jpg?v=1737639294"],
  },
  {
    id: 104,
    title: "Jeans",
    category: "Bottoms",
    price: 40,
    description: "Stylish denim jeans.",
    size: [
      { label: "S", stock: 10 },
      { label: "M", stock: 8 },
      { label: "L", stock: 4 },
    ],
    color: [
      { id: 1, name: "Black", hex: "#000000" },
      { id: 2, name: "White", hex: "#FFFFFF" },
    ],
    images: ["https://cdn.shopify.com/s/files/1/1367/5201/files/RunningTankGSBlackA7A1A-BB2J11382_0c29d1dc-bb52-42e3-8a66-f8151b775d2c_3840x.jpg?v=1737639291"],
  },
  {
    id: 105,
    title: "Jeans",
    category: "Bottoms",
    price: 40,
    description: "Stylish denim jeans.",
    size: [
      { label: "S", stock: 10 },
      { label: "M", stock: 8 },
      { label: "L", stock: 4 },
    ],
    color: [
      { id: 1, name: "Black", hex: "#000000" },
      { id: 2, name: "White", hex: "#FFFFFF" },
    ],
    images: ["https://cdn.shopify.com/s/files/1/1367/5201/files/RunningTankGSBlackA7A1A-BB2J11380_d136759d-5dcb-445d-8634-fa2b0e5f19b0_3840x.jpg?v=1737639290"],
  },
];

const items = ref([]);
const modal = ref({
  type: null,
  isOpen: false,
});
const selectedItem = ref(null);
const windowWidth = ref(0);
const categories = computed(() => categoryStore.getCategoryList);

watch(
  () => admin.businessType,
  (newType) => {
    const typeMap = {
      clothing: clothingItems, 
      food: foodItems,
    };

    items.value = Array.isArray(typeMap[newType]?.value)
      ? typeMap[newType].value
      : typeMap[newType] || [];
  },
  { immediate: true }
);

const openModal = (item, type) => {
  console.log(item, type)
  selectedItem.value = item;
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
};

const updateItem = (updatedItem) => {
  const index = items.value.findIndex((item) => item.id === updatedItem.id);
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
