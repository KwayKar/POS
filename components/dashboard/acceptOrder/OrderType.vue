<template>
  <div class="order-type-wrapper">
    <div class="order-type-tabs">
      <div
        class="tab"
        :class="{ active: orderType === 'eat-in' }"
        @click="setType('eat-in')"
      >
        Eat-In
      </div>
      <div
        class="tab"
        :class="{ active: orderType === 'takeaway' }"
        @click="setType('takeaway')"
      >
        Takeaway
      </div>
      <div
        class="tab"
        :class="{ active: orderType === 'delivery' }"
        @click="setType('delivery')"
      >
        Delivery
      </div>

      <div
        class="active-indicator"
        :style="{
          transform: `translateX(${activeIndex * 100}%)`,
        }"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useOrder } from "~/stores/order/useOrder";

const orderStore = useOrder();
const orderType = computed(() => orderStore.orderType);

const setType = (type) => {
  orderStore.setOrderType(type);
};

const activeIndex = computed(() => {
  if (orderType.value === "eat-in") return 0;
  if (orderType.value === "takeaway") return 1;
  if (orderType.value === "delivery") return 2;
  return 0;
});
</script>

<style scoped>
.order-type-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 0 16px;
}

.order-type-tabs {
  padding: 0;
  box-sizing: border-box;
  position: relative;
  display: flex;
  width: 100%;
  background: transparent;
  border: 1px solid var(--gray-1);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.tab {
  flex: 1;
  padding: 12px 0;
  text-align: center;
  cursor: pointer;
  z-index: 1;
  font-size: 1rem;
  font-weight: 600;
  color: var(--pale-gray-1);
  transition: color 0.3s ease;
}

.tab.active { 
  color: var(--black-2);
}

.active-indicator {
  position: absolute;
  inset: 4px 4px;
  width: calc(100% / 3 - 3px);
  background-color: #e0e3e0;
  border-radius: 10px;
  z-index: 0;
  transition: transform 0.3s ease;
}
</style>
