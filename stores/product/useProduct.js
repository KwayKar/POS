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
    ],
  }),
  getters: {
    getProductList: (state) => state.items,
  },
  actions: {
    // getOrderDetails(id) {
    //   return this.orders.find((o) => o.id === id);
    // },
    // createOrder(order) {
    //   this.orders.push(order);
    // },
    // updateOrder(id, updates) {
    //   const idx = this.orders.findIndex((o) => o.id === id);
    //   if (idx !== -1) this.orders[idx] = { ...this.orders[idx], ...updates };
    // },
    // deleteOrder(id) {
    //   this.orders = this.orders.filter((o) => o.id !== id);
    // },
    // filterOrders(status) {
    //   this.filteredOrders = this.orders.filter(
    //     (order) => order.status === status
    //   );
    // },
  },
});
