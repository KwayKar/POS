import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useAdmin } from "@/stores/admin/useAdmin";
import { useRuntimeConfig } from "nuxt/app";
import { apiFetch } from "~/utils/apiFetch";

const foodItems = ref([
  {
    id: 1,
    title: "Item 1",
    category: "4778c120-83c2-4ead-abc4-1c4eabf12a6b",
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
      {
        id: 1,
        name: "Black",
        image:
          "https://cdn.shopify.com/s/files/1/1367/5201/files/Sport7ShortGSDarkGreyGSBlackA1B3L-GB7X1_dcf3d3eb-fbaf-46f5-9891-df7be2773140_3840x.jpg?v=1722948233",
        hex: "#000000",
      },
      {
        id: 2,
        name: "White",
        image:
          "https://cdn.shopify.com/s/files/1/1367/5201/files/Sport7ShortGSDarkGreyGSBlackA1B3L-GB7X1_dcf3d3eb-fbaf-46f5-9891-df7be2773140_3840x.jpg?v=1722948233",
        hex: "#FFFFFF",
      },
    ],
    images: [
      "https://cdn.shopify.com/s/files/1/1367/5201/files/Sport5ShortGSBlackA1B3M-BB2J1_8654cff7-5636-4919-92fe-78de8b3788a5_3840x.jpg?v=1722948231",
    ],
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
    images: [
      "https://cdn.shopify.com/s/files/1/0156/6146/files/Running2in1ShortGSWhiteA6A8F-WB5711478_59192bfd-3fb7-466a-ab88-ecc3a5d408a6_3840x.jpg?v=1737639267",
    ],
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
    images: [
      "https://cdn.shopify.com/s/files/1/1367/5201/files/RunningTShirtGSBlackA7A4M-BB2J11517_5243de4c-4e42-4696-a5c4-198d33f79c03_3840x.jpg?v=1737639294",
    ],
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
    images: [
      "https://cdn.shopify.com/s/files/1/1367/5201/files/RunningTankGSBlackA7A1A-BB2J11382_0c29d1dc-bb52-42e3-8a66-f8151b775d2c_3840x.jpg?v=1737639291",
    ],
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
    images: [
      "https://cdn.shopify.com/s/files/1/1367/5201/files/RunningTankGSBlackA7A1A-BB2J11380_d136759d-5dcb-445d-8634-fa2b0e5f19b0_3840x.jpg?v=1737639290",
    ],
  },
];

export const useProduct = defineStore("product", () => {
  const admin = useAdmin();
  const items = ref([]);
  const selectedOrderID = ref(null);
  const filteredOrders = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const config = useRuntimeConfig();

  const typeMap = {
    restaurant: foodItems,
    clothing: clothingItems,
  };

  const fetchProducts = async ({ page = 1, limit = 25 }) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await apiFetch(
        `${config.public.apiBaseUrl}/stores/${admin.storeId}/products?page=${page}&limit=${limit}`
      );

      items.value = [...items.value, ...data.products]; 
      return data;
    } catch (err) {
      error.value = "Failed to load products";
    } finally {
      loading.value = false;
    }
  };

  const createProduct = async (payload) => {
    try {
      const res = await apiFetch(`${config.public.apiBaseUrl}/products`, {
        method: "POST",
        body: payload,
      });

      if (!res.success) {
        return { success: false, error: "Failed to create product" };
      }

      items.value.unshift(res.data);
      return { success: true, data: res };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || "Failed to create product",
      };
    }
  };

  const updateProduct = async (id, payload) => {
    try {
      const res = await apiFetch(`${config.public.apiBaseUrl}/products/${id}`, {
        method: "PUT",
        body: payload,
      });

      const { success, data } = res;

      if (success) {
        const index = items.value.findIndex((p) => p.id === id);
        if (index !== -1) {
          items.value[index] = data;
        }
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || "Something went wrong",
      };
    }
  };

  // Load items based on admin.businessType
  const initItems = () => {
    const rawItems = typeMap[admin.businessType];

    let resolved = Array.isArray(rawItems?.value) ? rawItems.value : rawItems;
    items.value = Array.isArray(resolved) ? [...resolved] : [];
  };

  return {
    fetchProducts,
    createProduct,
    updateProduct,
    items,
    selectedOrderID,
    filteredOrders,
    initItems,
  };
});
