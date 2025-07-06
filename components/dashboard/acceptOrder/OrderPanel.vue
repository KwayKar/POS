<template>
  <div class="sidePanel">
    <div class="flex items-center justify-between">
      <h3
        ref="titleRef"
        class="text-white text-lg font-semibold sidePanel-title"
      >
        Create Order
      </h3>
      <button @click="$emit('closeDrawer')" class="close-btn">&times;</button>
    </div>

    <div
      class="space-y-4 order-items"
      ref="orderItemsRef"
      :style="{ height: orderItemsHeight }"
    >
      <div v-if="localOrder.length">
        <div
          v-for="(order, index) in localOrder"
          :key="index"
          class="bg-gray-700 order-item"
          @click="openEditModal(order.item)"
        >
          <div class="flex flex-col space-y-2">
            <!-- Title -->
            <div class="flex mb-2">
              <h4 class="text-lg font-bold">
                {{ order.item?.title }}
              </h4>
              <h4 v-if="order.size" class="text-lg font-bold">
                <span class="mx-2">-</span>{{ order.size?.label }}
              </h4>
            </div>

            <!-- Quantity and Price -->
            <div class="flex justify-between items-center mb-2">
              <div class="flex items-center">
                <p class="text-m">${{ order.unitPrice }}</p>
                <span
                  class="px-2 py-1 ml-4 text-m rounded text-white"
                  style="background: var(--primary-btn-color)"
                >
                  x {{ order.quantity }}
                </span>
              </div>

              <div>
                <p class="text-m">
                  {{ (order.total) }}
                </p>
              </div>
            </div>

            <!-- Preferences if available -->
            <p v-if="order.preferences" class="text-m my-2 txt-label">
              Preferences: {{ order.preferences }}
            </p>
          </div>
        </div>
      </div>
      <p v-else class="text-m text-gray-400">No orders available.</p>
    </div>

    <div class="submit-order w-full" ref="submitOrderRef" @click="openDrawer">
      <SubmitOrder :pricingInfo="pricingInfo" />
    </div>
  </div>
</template>

<script setup>
import { computed, defineEmits } from "vue";
import SubmitOrder from "./SubmitOrder.vue";
import "~/components/dashboard/reuse/reuseStyles.css";
import { usePosStore } from "~/stores/pos/usePOS";

const titleRef = ref(null);
const orderItemsRef = ref(null);
const submitOrderRef = ref("0");
const orderItemsHeight = ref("0");
const drawerTransform = ref("translateY(100%)");
const pos = usePosStore();

const emit = defineEmits(["edit-order"]);

const pricingInfo = computed(() => pos.pricingInfo);
const localOrder = computed(() => pos.cartItems);

function openEditModal(item) {
  emit("edit-order", item);
}

const openDrawer = () => {
  drawerTransform.value = "translateY(0)";
};

const updateOrderItemsHeight = () => {
  if (!submitOrderRef.value || !titleRef.value) return;

  const windowHeight = window.innerHeight;
  const titleHeight = titleRef.value.offsetHeight;
  const submitOrderHeight = submitOrderRef.value.offsetHeight;
  const remainingHeight = windowHeight - titleHeight - submitOrderHeight;
  orderItemsHeight.value = `${remainingHeight}px`;
};

onMounted(async () => {
  await nextTick();
  updateOrderItemsHeight();
  window.addEventListener("resize", updateOrderItemsHeight);

  onUnmounted(() => {
    window.removeEventListener("resize", updateOrderItemsHeight);
  });
});


</script>

<style scoped>
.sidePanel {
  height: calc(100vh);
  position: relative;
  padding: 18px;
  margin: 0;
  overflow: hidden;
  background: var(--primary-bg-color-3);
}
@media screen and (max-width: 1024px) {
  .sidePanel {
    height: calc(100vh);
  }
}

.order-items {
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.order-item {
  padding: 1rem;
  margin-bottom: 0.75rem;
  color: var(--white-1);
  background-color: #4b5563;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.order-item:last-child {
  margin-bottom: 10rem;
}

.order-items::-webkit-scrollbar {
  display: none;
}

.order-item {
  border-radius: 6px;
}

.txt-label {
  color: var(--pale-gray-1);
}

p {
  line-height: 1.5;
}

h4 {
  font-size: 1.2rem;
}

p strong {
  color: #fff;
}

.text-m {
  font-size: 1rem;
}

.submit-order {
  position: absolute;
  bottom: 0px;
  right: 0;
  z-index: 9999;
  padding: 0 15px;
}
@media only screen and (max-width: 600px) {
  .submit-order {
    bottom: 5px;
  }
}

.close-btn {
  color: var(--white-1);
  font-size: 2.5rem;
  line-height: 1;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
}

.close-btn:hover {
  color: var(--white-1);
}
@media (min-width: 1024px) {
  .close-btn {
    display: none;
  }
}
</style>
