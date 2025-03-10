<template>
  <div class="sidePanel">
    <h3 class="text-white mb-4 sidePanel-title">Create Order</h3>
    <div 
      v-if="localOrder.length" 
      class="space-y-4 order-items" 
      style="overflow-y: auto; height: calc(100% - 120px)"
    >
      <div
        v-for="(order, index) in localOrder"
        :key="index"
        class="p-4 bg-gray-700 text-white order-item shadow-md"
        @click="openEditModal(order.item)"
      >
        <div class="flex flex-col space-y-2">
          <!-- Title -->
          <div class="flex mb-2">
            <h4 class="text-lg font-bold">
              {{ order.item.title }}
            </h4>
            <h4 v-if="order.size" class="text-lg font-bold">
              <span class="mx-2">-</span>{{ order.size }}
            </h4>
          </div>

          <!-- Quantity and Price -->
          <div class="flex justify-between items-center mb-2">
            <div class="flex items-center">
              <p class="text-m">${{ order.item.price }}</p>
              <span
                class="px-2 py-1 ml-4 text-m rounded text-white"
                style="background: var(--primary-btn-color)"
              >
                x {{ order.quantity }}
              </span>
            </div>

            <div>
              <p class="text-m">
                {{ (order.quantity * order.item.price) }}
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

    <div class="submit-order absolute bottom-0 left-0 w-full bg-gray-800 shadow-lg">
      <SubmitOrder :pricingInfo="pricingInfo" />
    </div>
  </div>
</template>

<script>
import "~/components/dashboard/reuse/reuseStyles.css"
import SubmitOrder from "./SubmitOrder.vue";

export default {
  components: {
    SubmitOrder
  },
  props: {
    order: {
      type: Array,
      required: true,
      default: () => [],
    },
    pricingInfo: {
      type: Object,
    }
  },
  computed: {
    localOrder() {
      return [...this.order];
    },
  },  
  methods: {
    openEditModal(item) {
      this.$emit("edit-order", item);
    },
  },
};
</script>

<style scoped>
.sidePanel {
  height: 100%; 
  position: relative;
}

.order-items {
  overflow: scroll;
  scrollbar-width: none; 
  -ms-overflow-style: none;
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

.text-m  {
  font-size: 1rem;
}

.submit-order {
  z-index: 9999; 
}
</style>
