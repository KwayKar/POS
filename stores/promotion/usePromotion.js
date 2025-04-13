import { defineStore } from "pinia";

export const usePromotion = defineStore("promotion", {
  state: () => ({
    promotions: [
      {
        id: "PROMO001",
        type: "coupon", // 'coupon' | 'product'
        subtype: "percentage", // 'percentage' | 'fixed'
        code: "SAVE10",
        value: 10, // 10% off
        description: "Get 10% off your order",
        isActive: true,
        createdAt: "2025-04-12T10:00:00Z", 
        expiresAt: "2025-05-12T23:59:59Z"
      },
      {
        id: "PROMO002",
        type: "coupon", // 'coupon' | 'product'
        subtype: "percentage", // 'percentage' | 'fixed'
        code: "SAVE10",
        value: 10, // 10% off
        description: "Get 10% off your order",
        isActive: true,
        createdAt: "2025-04-12T10:00:00Z", 
        expiresAt: "2025-05-12T23:59:59Z"
      },
      {
        id: "PROMO008",
        type: "coupon", // 'coupon' | 'product'
        subtype: "Buy one get one", // 'percentage' | 'fixed'
        code: "SAVE10",
        value: 10, // 10% off
        description: "Get 10% off your order",
        isActive: true,
        createdAt: "2025-04-12T10:00:00Z", 
        expiresAt: "2025-05-12T23:59:59Z"
      },
      {
        id: "PROMO309",
        type: "product",
        subtype: "Buy 3 get 30% off",
        triggerProductID: "PROD001",
        rewardProductID: "PROD002",
        description: "Buy 3 Items, Get 30% off",
        isActive: false,
        createdAt: "2025-04-12T10:00:00Z", 
        expiresAt: "2025-05-12T23:59:59Z"
      },
      {
        id: "PROMO009",
        type: "product",
        subtype: "Buy one get one free",
        triggerProductID: "PROD001",
        rewardProductID: "PROD002",
        description: "Buy 1 Burger, Get 1 Drink Free",
        isActive: true,
        createdAt: "2025-04-12T10:00:00Z", 
        expiresAt: "2025-05-12T23:59:59Z"
      },
      {
        id: "PROMO069",
        type: "product",
        subtype: "Buy one get one free", 
        triggerProductID: "PROD001",
        rewardProductID: "PROD002",
        description: "Buy 1 Burger, Get 1 Drink Free",
        isActive: true,
        createdAt: "2025-04-12T10:00:00Z", 
        expiresAt: "2025-05-12T23:59:59Z"
      },
    ],
    selectedPromotionID: null,
  }),

  getters: {
    getPromotionList: (state) => state.promotions,
    getSelectedPromotion: (state) =>
      state.promotions.find((p) => p.id === state.selectedPromotionID),
    getCouponPromotions: (state) =>
      state.promotions.filter((p) => p.type === "coupon"),
    getProductPromotions: (state) =>
      state.promotions.filter((p) => p.type === "product"),
  },

  actions: {
    setSelectedPromotionID(id) {
      this.selectedPromotionID = id;
    },

    getPromotionDetails(id) {
      return this.promotions.find((p) => p.id === id);
    },

    createPromotion(promotion) {
      this.promotions.push(promotion);
    },

    updatePromotion(id, updates) {
      const index = this.promotions.findIndex((p) => p.id === id);
      if (index !== -1) {
        this.promotions[index] = { ...this.promotions[index], ...updates };
      }
    },

    deletePromotion(id) {
      this.promotions = this.promotions.filter((p) => p.id !== id);
    },

    togglePromotionStatus(id) {
      const promo = this.promotions.find((p) => p.id === id);
      if (promo) {
        promo.isActive = !promo.isActive;
      }
    },

    filterPromotions(keyword) {
      return this.promotions.filter((p) =>
        p.description.toLowerCase().includes(keyword.toLowerCase())
      );
    },
  },
});
