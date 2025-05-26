<template>
  <header class="site-header">
    <div class="shop-hours" v-if="!isCheckoutRoute">{{ shopInfo.openingHours }}</div>
    <div class="back-to-menu" @click="goBack" style="font-weight: bold" v-else>
      <ArrowLeft fill="black" /> Back
    </div>

    <!-- <img src="/logo.svg" alt="Logo" class="site-logo" /> -->

    <button @click="toggleCart" class="cart-btn" v-if="!isCheckoutRoute">Your Cart</button>
  </header>
  
  <CartDrawer
    :isOpen="cartOpen"
    @close="cartOpen = false"
  />
</template>

<script setup>
import { ref, computed } from "vue";
import CartDrawer from "../cart/CartDrawer.vue";
import { useRestaurant } from "~/stores/shop/useRestaurant";
import { useRoute } from 'vue-router'
import ArrowLeft from "~/assets/icons/arrowLeft.vue";

const route = useRoute();
const cartOpen = ref(false);
const { shopInfo } = useRestaurant();
const router = useRouter();

const isCheckoutRoute = computed(() => route.path.endsWith('/checkout'));

const goBack = () => {
  const slug = route.params.slug;
  router.push(`/shops/${slug}`);
};

function toggleCart() {
  cartOpen.value = !cartOpen.value;
}
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem;
  height: 72px;
  border-bottom: 1px solid #eee;
  background: var(--white-1);
  z-index: 999;
}

.shop-hours {
  flex: 1;
  font-size: 0.9rem;
  color: #555;
}

.back-to-menu {
  display: flex;
  color: var(--black-3);
  cursor: pointer;
}

.site-logo {
  height: 40px;
  object-fit: contain;
}

.cart-btn {
  flex: 1;
  text-align: right;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #333;
}
</style>
