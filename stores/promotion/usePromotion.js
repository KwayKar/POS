import { useRuntimeConfig } from "nuxt/app";
import { defineStore } from "pinia";
import { useAdmin } from "../admin/useAdmin";

export const usePromotion = defineStore("promotion", {
  state: () => ({
    promotions: [
      {
        id: "PROMO001",
        code: "PROMO001",
        type: "coupon", // 'coupon' | 'product'
        subtype: "percentage", // 'percentage' | 'fixed'
        code: "SAVE10",
        value: 10, // 10% off
        description: "Get 10% off your order",
        isActive: true,
        createdAt: "2025-04-12T10:00:00Z",
        expiresAt: "2025-05-12T23:59:59Z",
      },
      {
        id: "PROMO002",
        code: "PROMO002",
        type: "coupon", // 'coupon' | 'product'
        subtype: "percentage", // 'percentage' | 'fixed'
        code: "SAVE10",
        value: 10, // 10% off
        description: "Get 10% off your order",
        isActive: true,
        createdAt: "2025-04-12T10:00:00Z",
        expiresAt: "2025-05-12T23:59:59Z",
      },
      {
        id: "PROMO008",
        code: "PROMO008",
        type: "coupon", // 'coupon' | 'product'
        subtype: "Buy one get one", // 'percentage' | 'fixed'
        code: "SAVE10",
        value: 10, // 10% off
        description: "Get 10% off your order",
        isActive: true,
        createdAt: "2025-04-12T10:00:00Z",
        expiresAt: "2025-05-12T23:59:59Z",
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
        expiresAt: "2025-05-12T23:59:59Z",
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
        expiresAt: "2025-05-12T23:59:59Z",
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
        expiresAt: "2025-05-12T23:59:59Z",
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
    async fetchPromotions() {
      try {
        const config = useRuntimeConfig();
        const admin = useAdmin();

        const res = await $fetch(
          `${config.public.apiBaseUrl}/stores/${admin.storeId}/promotions` // stores/${storeId}/
        );
        this.promotions = res;
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    },

    setSelectedPromotionID(id) {
      this.selectedPromotionID = id;
    },

    getPromotionDetails(id) {
      return this.promotions.find((p) => p.id === id);
    },

    async createPromotion(promotion) {
      try {
        const config = useRuntimeConfig();
        const admin = useAdmin();

        const newPromotion = await $fetch(
          `${config.public.apiBaseUrl}/stores/${admin.storeId}/promotions`,
          {
            method: "POST",
            body: {
              ...promotion,
            },
          }
        );
        this.promotions.push(newPromotion);
      } catch (error) {
        // console.error("Error creating promotion:", error);
      }
    },

    async updatePromotion(id, updates) {
      try {
        const config = useRuntimeConfig();
        const admin = useAdmin();
        const updated = await $fetch(
          `${config.public.apiBaseUrl}/stores/${admin.storeId}/promotions/${id}`,
          {
            method: "PUT",
            body: {
              ...updates,
            },
          }
        );

        const index = this.promotions.findIndex((p) => p.id === id);
        if (index !== -1) {
          this.promotions[index] = updated;
        }
      } catch (error) {
        // console.error("Error updating promotion:", error);
      }
    },

    async deletePromotion(id) {
      try {
        const config = useRuntimeConfig();
        const admin = useAdmin();

        await $fetch(
          `${config.public.apiBaseUrl}/stores/${admin.storeId}/promotions/${id}`,
          {
            method: "DELETE",
          }
        );
        this.promotions = this.promotions.filter((p) => p.id !== id);
      } catch (error) {
        // console.error(error);
      }
    },

    async searchPromotionsApi({ keyword, type, subtype }) {
      const config = useRuntimeConfig();
      const admin = useAdmin();

      try {
        // Build query parameters dynamically
        const params = new URLSearchParams();
        if (keyword) params.append("query", keyword);
        if (type) params.append("type", type);
        if (subtype) params.append("subtype", subtype);

        const url = `${config.public.apiBaseUrl}/stores/${
          admin.storeId
        }/promotions/search?${params.toString()}`;

        const response = await $fetch(url, { method: "GET" });

        // Merge with existing coupons in state
        const existingCoupons = this.promotions.filter(
          (p) => p.type === "coupon"
        );

        const merged = [...existingCoupons];
        for (const promo of response) {
          if (!merged.some((p) => p.id === promo.id)) {
            merged.push(promo);
          }
        }

        this.promotions = merged;
      } catch (error) {
        this.promotions = [];
      }
    },

    async removeEligibleProduct(promotionId, productId) {
      const config = useRuntimeConfig();
      const admin = useAdmin();
      try {
        await $fetch(
          `${config.public.apiBaseUrl}/stores/${admin.storeId}/promotions/${promotionId}/eligible-products/${productId}`,
          {
            method: "DELETE",
          }
        );

        const promotion = this.promotions.find((p) => p.id === promotionId);
        if (promotion && promotion.eligibleGetItems) {
          promotion.eligibleGetItems = promotion.eligibleGetItems.filter(
            (item) => item.id !== productId
          );
        }
      } catch (error) {
        // console.error(error);
      }
    },

    filterPromotions(keyword, storeId) {
      this.searchPromotionsApi(keyword, storeId);
    },

    togglePromotionStatus(id) {
      const promo = this.promotions.find((p) => p.id === id);
      if (promo) {
        promo.isActive = !promo.isActive;
      }
    },
  },
});
