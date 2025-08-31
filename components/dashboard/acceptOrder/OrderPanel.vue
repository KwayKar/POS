<template>
  <div class="sidePanel">
    <div class="flex items-center justify-between">
      <div ref="titleRef" style="width: 100%">
        <OrderType />
      </div>
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
          class="relative overflow-hidden"
          v-touch:swipe.left="() => handleSwipe(index)"
          v-touch:swipe.right="resetSwipe"
          style="touch-action: pan-y"
        >
          <div
            class="bg-gray-700 order-item cursor-pointer transition-transform duration-300 ease-in-out"
            :style="{
              transform:
                swipedIndex === index ? 'translateX(-70px)' : 'translateX(0)',
            }"
            @click="openEditModal(order)"
          >
            <div
              class="flex flex-col space-y-2 transition-transform duration-300 ease-in-out"
            >
              <!-- Title  @click="openEditModal(order.item)" -->
              <div class="flex mb-2">
                <h4 class="item-title">
                  {{ order.item?.title }}
                </h4>
                <h4 v-if="order.size" class="item-title">
                  <span class="mx-2">-</span>{{ order.size?.label }}
                </h4>
              </div>

              <!-- Quantity and Price -->
              <div class="mb-2">
                <div class="flex justify-between items-center mb-2">
                  <div class="flex items-center">
                    <p class="text-m">{{ order.unitPrice }}</p>
                    <span
                      class="px-2 py-1 ml-4 text-m rounded text-white"
                      style="background: var(--primary-btn-color)"
                    >
                      x {{ order.quantity }}
                    </span>
                  </div>

                  <div>
                    <p class="text-m">
                      {{ order.total }}
                    </p>
                  </div>
                </div>

                <div
                  v-if="
                    order?.addons?.length ||
                    order?.choices?.length ||
                    order?.removals?.length
                  "
                  class="promo-label"
                >
                  {{
                    [
                      ...(order.addons || []).map((a) => a.title),
                      ...(order.choices || []).map((c) => c.title),
                      ...(order.removals || []).map((r) => r.title),
                    ].join(", ")
                  }}
                </div>
              </div>

              <div v-if="order?.promoValue?.label" class="promo-label">
                {{ order.promoValue.label }}
              </div>

              <!-- Preferences if available -->
              <p v-if="order.preferences" class="text-m my-2 txt-label">
                Preferences: {{ order.preferences }}
              </p>
            </div>
          </div>

          <div class="action-buttons">
            <button key="edit" @click.stop="editItem(order)">
              <EditPencil />
            </button>
            <button
              key="delete"
              @click.stop="deleteItem(order)"
              style="background: #ae5151"
            >
              <Icons icon="Trash" />
            </button>
          </div>
        </div>
      </div>
      <p v-else class="no-order-message">No orders available.</p>
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
import Icons from "~/components/reuse/icons/Icons.vue";
import EditPencil from "~/assets/icons/editPencil.vue";
import OrderType from "./OrderType.vue";

const pos = usePosStore();

const titleRef = ref(null);
const orderItemsRef = ref(null);
const submitOrderRef = ref(null);
const orderItemsHeight = ref("0");
const drawerTransform = ref("translateY(100%)");
const swipedIndex = ref(null);
let didSwipe = false;

const emit = defineEmits(["edit-order"]);

const pricingInfo = computed(() => pos.pricingInfo);
const localOrder = computed(() => pos.cartItems);

function openEditModal(item) {
  if (didSwipe) {
    didSwipe = false;
    return;
  }
  emit("edit-order", item);
}

const openDrawer = () => {
  drawerTransform.value = "translateY(0)";
};

const handleSwipe = (index) => {
  didSwipe = true;
  swipedIndex.value = index;
};

const resetSwipe = () => {
  didSwipe = true;
  swipedIndex.value = null;
};

const updateOrderItemsHeight = () => {
  if (!submitOrderRef.value || !titleRef.value) return;

  const windowHeight = window.innerHeight;
  const titleHeight = titleRef.value.offsetHeight || 0;
  const submitOrderHeight = submitOrderRef.value.offsetHeight;
  const remainingHeight = windowHeight - titleHeight - submitOrderHeight;
  orderItemsHeight.value = `${remainingHeight}px`;
};

onMounted(async () => {
  await nextTick();

  updateOrderItemsHeight();
  window.addEventListener("resize", updateOrderItemsHeight);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateOrderItemsHeight);
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
  position: relative;
  padding: 1rem;
  margin-bottom: 0.75rem;
  color: var(--white-1);
  user-select: none;
  background-color: #4b5563;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.item-title {
  font-weight: bold;
  font-size: 1.1rem;
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
  color: var(--white-1);
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

/* Action buttons animation edit, remove */
.action-buttons {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: flex-start;
  height: 100%;
  padding-right: 0.5rem;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 1;
  animation: slideInFromRight 0.4s ease-out forwards;
}

.action-buttons > button {
  background: var(--white-1);
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.slide-up-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.no-order-message {
  font-size: 1rem;
  color: #9ca3af;
  text-align: center;
  margin-top: 30px;
}

.promo-label {
  font-size: 0.9rem;
  margin-top: 12px;
  color: var(--pale-gray-1);
}
</style>
