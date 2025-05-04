<template>
  <div v-if="isOpen" class="cart-overlay" @click.self="close">
    <transition name="slide">
      <div v-if="isOpen" class="cart-drawer">
        <header class="drawer-header">
          <h2>Your Cart</h2>
          <button @click="close">✕</button>
        </header>

        <div class="drawer-content">
          <p v-if="cartItems.length === 0">Your cart is empty</p>
          <ul v-else>
            <li v-for="item in cartItems" :key="item.id">
              {{ item.title }} — {{ item.price }}$
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  cartItems: Array,
});

const emit = defineEmits(["close"]);
function close() {
  emit("close");
}
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: flex-end;
}

.cart-drawer {
  background: white;
  width: 350px;
  max-width: 90%;
  height: 100%;
  padding: 1.5rem;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.cart-drawer {
  width: 320px;
  background: #fff;
  height: 100%;
  padding: 1rem;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
}
</style>
