<template>
  <div class="sidePanel">
    <h3 class="text-white mb-4 sidePanel-title">Create Order</h3>
    <div v-if="localOrder.length" class="space-y-4">
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
                {{ (order.quantity * order.item.price) | currency }}
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
</template>

<script>
import "~/components/dashboard/reuseStyles/reuseStyles.css"

export default {
  props: {
    order: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      localOrder: [...this.order],
    };
  },
  watch: {
    order: {
      immediate: true,
      handler(newOrder) {
        this.localOrder = [...newOrder];
      },
    },
  },
  methods: {
    openEditModal(item) {
      this.$emit("edit-order", item);
    },
  },
  filters: {
    currency(value) {
      return `$${parseFloat(value).toFixed(2)}`;
    },
  },
};
</script>

<style scoped>
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
</style>
