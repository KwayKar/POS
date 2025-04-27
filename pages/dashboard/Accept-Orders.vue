<template>
  <DashboardLayout>
    <NavPanel class="navPanel dashboard-top-nav-panel"> </NavPanel>
    <div class="flex flex-col lg:flex-row h-full">
      <div
        :style="{ width: panelWidth.itemPanel + 'px' }"
        class="overflow-y-auto"
      >
        <ItemList
          :items="items"
          :categories="categories"
          @select-item="openModal"
        />
      </div>

      <div
        v-if="panelWidth.itemPanel > 400"
        class="order-panel bg-gray-800 overflow-y-auto"
        :style="{
          width:
            panelWidth.windowPanel > 1024
              ? panelWidth.orderPanel + 'px'
              : '100%',
          position: panelWidth.windowPanel < 1024 ? 'fixed' : undefined,
          bottom: panelWidth.windowPanel < 1024 ? 0 : undefined,
        }"
      >
        <OrderPanel
          v-if="!isMobile"
          :order="order"
          :pricingInfo="pricingInfo"
          @edit-order="openModal"
          @closeDrawer="closeDrawer"
        />

        <SubmitButton v-if="isMobile" class="checkout-btn" @click="openDrawer">
          Checkout
        </SubmitButton>
      </div>

      <Modal
        v-if="modal.isOpen"
        :width="modalWidth"
        @close="closeModal"
        :isFullScreenMobile="true"
      >
        <AddOrderInfo
          :item="selectedItem"
          v-model="orderForm"
          :modalType="modal.type"
          @update-item="handleUpdateOrderItem"
          @delete-item="handleDeleteOrderItem"
        />
      </Modal>

      <div
        v-if="isMobile"
        ref="submitOrderRef"
        class="submit-order fixed bottom-0 left-0 w-full bg-gray-800 shadow-lg transition-transform duration-300 z-40"
        :style="drawerStyle"
      >
        <OrderPanel
          :order="order"
          :pricingInfo="pricingInfo"
          @edit-order="openModal"
          @closeDrawer="closeDrawer"
        />
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from "vue";
import AddOrderInfo from "~/components/dashboard/acceptOrder/AddOrderInfo.vue";
import OrderPanel from "~/components/dashboard/acceptOrder/OrderPanel.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import DashboardLayout from "~/layouts/DashboardLayout.vue";
import NavPanel from "~/components/dashboard/panels/NavPanel.vue";
import ItemList from "~/components/dashboard/items/ItemList.vue";
import { useProduct } from "~/stores/product/useProduct";
import SubmitButton from "~/components/reuse/ui/SubmitButton.vue";
import { usePosStore } from "~/stores/pos/usePOS";

const productStore = useProduct();
const posStore = usePosStore();

const items = computed(() => productStore.getProductList || []);
// // Roles middleware (Nuxt 3 way)
// definePageMeta({
//   middleware: 'auth',
//   roles: ['admin'],
// });

const categories = ref([
  { id: 1, name: "Salads" },
  { id: 2, name: "Drinks" },
  { id: 3, name: "Desserts" },
]);
const selectedItem = ref(null);
const order = ref([]);
const isDrawerOpen = ref(false);
const isMobile = ref(0);
const windowWidth = ref(0);

const modal = reactive({
  isOpen: false,
  type: null,
});

const orderForm = reactive({
  quantity: 1,
  preferences: null,
});

const panelWidth = reactive({
  windowPanel: 0,
  navPanel: 100,
  itemPanel: 0,
  orderPanel: 400,
});

const calculateItemListWidth = () => {
  panelWidth.windowPanel = window.innerWidth;
  panelWidth.itemPanel =
    window.innerWidth > 1024
      ? window.innerWidth - panelWidth.orderPanel - panelWidth.navPanel
      : window.innerWidth;
  isMobile.value = window.innerWidth < 1024 ? true : false;
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  calculateItemListWidth();
  window.addEventListener("resize", calculateItemListWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", calculateItemListWidth);
});

const handleUpdateOrderItem = (updatedOrder) => {
  posStore.addToCart(updatedOrder);
  modal.isOpen = false;
  modal.type = null;
};

const handleDeleteOrderItem = (itemId) => {
  // const index = order.value.findIndex((o) => o.item.id === itemId);
  // if (index !== -1) {
  //   order.value.splice(index, 1);
  // }
  posStore.removeCartItem(itemId);
  modal.isOpen = false;
  modal.type = null;
  selectedItem.value = null;
};

const openModal = (item) => {
  const existingOrder = order.value.find((o) => o.item.id === item.id);
  if (existingOrder) {
    Object.assign(orderForm, existingOrder);
  } else {
    orderForm.quantity = 1;
    orderForm.preferences = null;
  }
  selectedItem.value = item;
  modal.isOpen = true;
  modal.type = existingOrder ? "edit" : "create";
};

const closeModal = () => {
  modal.isOpen = false;
  modal.type = null;
  selectedItem.value = null;
};

const drawerStyle = computed(() => ({
  transform: isDrawerOpen.value ? "translateY(0)" : "translateY(100%)",
  height: "100vh",
  zIndex: 99999,
}));

const openDrawer = () => {
  isDrawerOpen.value = true;
};

const closeDrawer = () => {
  isDrawerOpen.value = false;
};

const pricingInfo = computed(() => {
  const subtotal = order.value.reduce(
    (sum, item) => sum + item.item.price * item.quantity,
    0
  );
  const discount = order.value.reduce(
    (sum, item) => sum + (item.discount || 0),
    0
  );
  const total = subtotal - 0;
  return { total, discount, subtotal };
});

const modalWidth = computed(() => {
  if (windowWidth.value > 1200) {
    return "800px";
  } else if (windowWidth.value > 1100) {
    return `${windowWidth.value - 100}px`;
  } else {
    return `${windowWidth.value - 120}px`;
  }
});
</script>

<style scoped>
.order-panel {
  /* border-top-left-radius: 25px;
  border-top-right-radius: 25px; */
}

.checkout-btn {
  position: fixed;
  bottom: 1.4rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  padding: 0rem 3.5rem;
  font-weight: 600;
  border: none;
}
</style>
