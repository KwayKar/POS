<template>
  <button @click="toggleCart">🛒 Open Cart</button>
  <CartDrawer
    :isOpen="cartOpen"
    :cartItems="cartItems"
    @close="cartOpen = false"
  />
</template>

<script setup>
import { ref } from "vue";
import CartDrawer from "../cart/CartDrawer.vue";

const cartOpen = ref(false);
const cartItems = ref([
  { id: 1, title: "Pizza", price: 12 },
  { id: 2, title: "Burger", price: 8 },
]);

function toggleCart() {
  cartOpen.value = !cartOpen.value;
}
</script>
