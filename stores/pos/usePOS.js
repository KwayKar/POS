import { defineStore } from "pinia";

export const usePosStore = defineStore("pos", {
  state: () => ({
    cart: [],
    appliedCouponCode: null,
    promotions: {
      discountedProducts: [],
      coupons: {
        SAVE10: {
          subtype: "percentage",
          value: 10,
          description: "Get 10% off your order",
        },
        WELCOME5: {
          subtype: "fixed",
          value: 5,
          description: "Get $5 off your order",
        },
      },
    },
  }),

  getters: {
    cartItems(state) {
      return state.cart;
    },

    subtotal(state) {
      return state.cart.reduce((sum, cartItem) => {
        return sum + cartItem.item.price * cartItem.quantity;
      }, 0);
    },

    appliedCoupon(state) {
      return state.appliedCouponCode
        ? state.promotions.coupons[state.appliedCouponCode]
        : null;
    },

    discountAmount(state) {
      const subtotal = state.cart.reduce(
        (sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
        0
      );
      const coupon = state.promotions.coupons[state.appliedCouponCode];

      if (!coupon) return 0;

      if (coupon.subtype === "percentage") {
        return (subtotal * coupon.value) / 100;
      } else if (coupon.subtype === "fixed") {
        return coupon.value;
      }

      return 0;
    },

    total(state) {
      const subtotal = state.cart.reduce(
        (sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
        0
      );
      const discount = state.promotions.coupons[state.appliedCouponCode]
        ? this.discountAmount
        : 0;
      return Math.max(0, subtotal - discount);
    },

    pricingInfo() {
      return {
        subtotal: this.subtotal,
        total: this.total,
        discount: this.discountAmount,
        coupon: this.appliedCoupon,
      };
    },
  },

  actions: {
    addToCart(product) {
      const existing = this.cart.find(
        (item) => item.item.id === product.item.id
      );
      if (existing) {
        existing.quantity = product.quantity;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },

    removeCartItem(id) {
      this.cart = this.cart.filter(item => item.item.id !== id);
    },

    applyCoupon(code) {
      const coupon = this.promotions.coupons[code];
      if (coupon) {
        this.appliedCouponCode = code;
      } else {
      }
    },

    removeCoupon() {
      this.appliedCouponCode = null;
    },

    clearCart() {
      this.cart = [];
      this.appliedCouponCode = null;
    },
  },
});
