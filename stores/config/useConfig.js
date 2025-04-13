import { defineStore } from "pinia";

export const useConfig = defineStore("config", {
  state: () => ({
    locations: [
      {
        id: "bkk-central",
        address: "123 Central Rd, Manchester",
        country: "UK",
        vatRate: 7,
        currency: "GBP",
        businessType: "restaurant",
      },
      {
        id: "sg-orchard",
        address: "456 Orchard Rd, Singapore",
        country: "Singapore",
        vatRate: 8,
        currency: "SGD",
        businessType: "clothing",
      },
    ],
    selectedLocationId: "",
  }),

  getters: {
    selectedLocation(state) {
      return state.locations.find((l) => l.id === state.selectedLocationId);
    },
    currentVAT(state) {
      return state.selectedLocation?.vatRate || 0;
    },
    businessType(state) {
      return state.selectedLocation?.businessType || "";
    },
  },

  actions: {
    setLocation(id) {
      this.selectedLocationId = id;
    },
    updateVAT(id, newVAT) {
      const loc = this.locations.find((l) => l.id === id);
      if (loc) loc.vatRate = newVAT;
    },
  },
});
