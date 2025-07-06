import { defineStore } from "pinia";

export const usePosStore = defineStore("pos", {
  state: () => ({
    cart: [],
    holdCart: [],   // Temporarily held orders
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
      return state.cart.reduce((sum, item) => {
        return sum + (item.unitPrice || 0) * (item.quantity || 1)
      }, 0)
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
        (sum, cartItem) => sum + cartItem.total,
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
      const index = this.cart.findIndex(
        (item) => item.item.id === product.item.id
      );

      if (index !== -1) {
        const updatedItem = {
          ...this.cart[index],
          ...product,
          quantity: product.quantity,
          unitPrice: product.unitPrice, 
          total: product.unitPrice * product.quantity, 
        };
        this.cart.splice(index, 1, updatedItem);
      } else {
        this.cart.push({ ...product });
      }
    },

    removeCartItem(id) {
      this.cart = this.cart.filter((item) => item.item.id !== id);
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

    holdCurrentCart() {
      if (this.cart.length > 0) {
        this.holdCart.push({
          id: Date.now(),
          items: [...this.cart],
        });
        this.cart = [];
      }
    },

    // Restore held cart by ID
    restoreHeldCart(id) {
      const index = this.holdCart.findIndex((c) => c.id === id);
      if (index !== -1) {
        this.cart = [...this.holdCart[index].items];
        this.holdCart.splice(index, 1); 
      }
    },

    // Clear hold cart manually
    clearHoldCart() {
      this.holdCart = [];
    },
  },
});
