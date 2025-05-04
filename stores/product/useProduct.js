import { defineStore } from "pinia";

export const useProduct = defineStore("order", {
  state: () => ({
    selectedOrderID: null,
    filteredOrders: [],
    items: [
      {
        id: 1,
        title: "Item 1",
        category: "Main",
        price: 30,
        description: "Description goes here",
        images: [
          "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1702672435/gravy/production/Gravy::MasterProduct/Q423_OLO_MisoSalmonGlazedPlate_3600x2400_2_orq1kg",
        ],
        sizes: [
          { label: "S", value: "ID_001" },
          { label: "M", value: "ID_002" },
          { label: "L", value: "ID_003" }
        ]
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
        sizes: [
          { label: "Small", extraPrice: 1000 },
          { label: "Medium", extraPrice: 2500 },
          { label: "Large", extraPrice: 4500 }
        ],
        options: [
          { id: 1, label: 'No Cheese', type: 'removal' },
          { id: 2, label: 'Extra Bacon', type: 'addon', maxLimit: 3, startAt: 0 },
          { id: 3, label: 'Choose Sauce', type: 'choices' },
          { id: 4, label: 'No Pickles', type: 'removal' },
          { id: 5, label: 'Add Avocado', type: 'addon', maxLimit: 3, startAt: 1 },
          { id: 6, label: 'White Rice', type: 'choices' },
        ]
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
    ],
  }),
  getters: {
    getProductList: (state) => state.items,
  },
  actions: {

  },
});
