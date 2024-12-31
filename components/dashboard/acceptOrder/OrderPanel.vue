<template>
  <div>
    <h3 class="text-white mb-4">Create Order</h3>
    <div v-if="localOrder.length" class="space-y-4">
      <div
        v-for="(order, index) in localOrder"
        :key="index"
        class="p-4 bg-gray-700 text-white rounded"
        @click="openEditModal(order.item)"
      >
        <h4 class="text-lg font-bold">{{ order.title }}</h4>
        <p class="text-sm">
          <strong>Quantity:</strong> {{ order.quantity }}
        </p>
        <p class="text-xs text-gray-300">
          <strong>Preferences:</strong> {{ order.preferences || 'None' }}
        </p>
      </div>
    </div>
    <p v-else class="text-gray-400">No orders available.</p>
  </div>
</template>

<script>
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
      this.$emit('edit-order', item);
    }
  } 
};
</script>
