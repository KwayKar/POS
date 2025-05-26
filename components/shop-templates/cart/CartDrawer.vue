<template>
  <transition name="fade">
    <div class="cart-overlay" v-if="isOpen" @click.self="closeDrawer"></div>
  </transition>
  <transition name="slide">
    <div class="drawer" v-if="isOpen">
      <header class="drawer-header">
        <h2>Your Cart</h2>
        <button @click="closeDrawer">✕</button>
      </header>

      <div class="drawer-body">
        <div v-if="cartItems.length === 0" class="empty-cart-msg">
          <p>Your cart is empty</p>
        </div>
        <div
          v-else
          style="width: 100%"
          class="wrap-cart-items"
          ref="cartScroll"
        >
          <CartItem
            v-for="item in cartItems"
            :key="item.id"
            :item="item"
            @select="openModal"
            @remove="handleRemove"
            @edit="handleEdit"
          />
        </div>
      </div>

      <footer class="drawer-footer">
        <button class="checkout-btn">Checkout</button>
      </footer>
    </div>
  </transition>

  <Modal
    v-if="modal.isOpen && modal.type === 'cart-details'"
    :width="modalDimensions.width"
    :height="modalDimensions.height"
    :minHeight="'400px'"
    :animateOnDisplay="true"
    :isFullScreenMobile="true"
    @close="closeModal"
  >
    <ItemDetails />
  </Modal>
</template>

<script setup>
import { ref } from "vue";
import CartItem from "./CartItem.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import ItemDetails from "../item-details/ItemDetails.vue";
import { useRestaurant } from "~/stores/shop/useRestaurant";
import { removeCartItem } from "~/utils/useCart";

const { onSelectItem } = useRestaurant();
const modal = ref({
  isOpen: false,
  type: null,
});

defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);
const windowSize = ref({
  width: 0,
  height: 0,
});
const cartItems = ref([]);

function handleRemove(id) {
  cartItems.value = cartItems.value.filter((item) => item.cartId !== id);
  removeCartItem(id);
}

function handleEdit(item) {
  console.log("Edit item:", item);
}

function openModal(item) {
  onSelectItem(item);

  modal.value.type = "cart-details";
  modal.value.isOpen = true;

  closeDrawer();
}

function closeModal() {
  modal.value.type = "";
  modal.value.isOpen = false;
}

function closeDrawer() {
  emit("close");
}

const modalDimensions = computed(() => {
  let width;
  const w = windowSize.value.width;
  const h = windowSize.value.height;

  if (w > 1250) {
    width = "1200px";
  } else if (w > 1150) {
    width = `${w - 100}px`;
  } else {
    width = `${w - 120}px`;
  }

  const height = w > 900 ? `${h - 150}px` : `${h}px`;

  return { width, height };
});

const updatePanelSize = () => {
  windowSize.value = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

onMounted(() => {
  updatePanelSize();
  window.addEventListener("resize", updatePanelSize);

  const storedCart = getCart();
  if (storedCart) {
    try {
      cartItems.value = storedCart;
    } catch (e) {
      console.error('Invalid cart data in localStorage', e)
    }
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updatePanelSize);
});
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  display: flex;
  justify-content: flex-end;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 30%;
  height: 100vh;
  background: var(--white-1);
  z-index: 1000;
  border-left: 1px solid var(--gray-1);
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--gray-1);
}

.drawer-body {
  padding: 0 1rem 0.5rem;
  display: flex;
  min-height: 80vh;
}

.wrap-cart-items {
  overflow-y: auto;
  height: calc(100vh - 150px);
  padding-bottom: 4rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.empty-cart-msg {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  text-align: center;
  width: 100%;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.drawer-footer {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  background: var(--white-1);
  z-index: 10;
  padding: 1rem 0 0 0;
  text-align: center;
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
