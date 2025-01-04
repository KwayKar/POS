<template>
  <div class="flex flex-col">
    <div class="flex-1 overflow-y-auto">
      <h2 class="text-lg font-bold mb-4">Order Details</h2>
      <div v-if="order">
        <p class="mb-2">
          <span class="font-semibold">Order ID:</span> {{ order.id }}
        </p>
        <p class="mb-2">
          <span class="font-semibold">Phone:</span> {{ order.phone }}
        </p>
        <p class="mb-2">
          <span class="font-semibold">Email:</span> {{ order.email }}
        </p>
        <p class="mb-2">
          <span class="font-semibold">Address:</span> {{ order.address }}
        </p>
        <p class="mb-2">
          <span class="font-semibold">Order Date:</span> {{ order.date }}
        </p>
        <p class="mb-4">
          <span class="font-semibold">Status:</span> {{ order.orderStatus }}
        </p>

        <p class="mb-2"><span class="font-semibold">Dishes:</span></p>
        <ul class="list-disc list-inside pl-4">
          <li v-for="dish in order.dishes" :key="dish.id" class="mb-2">
            <span class="font-semibold"
              >{{ dish.name }} (x{{ dish.quantity }})</span
            >
            <span v-if="dish.comments" class="text-gray-600"
              >- {{ dish.comments }}</span
            >
          </li>
        </ul>

        <p class="mb-2"><span class="font-semibold">Items:</span></p>
        <ul class="list-disc list-inside pl-4">
          <li v-for="item in order.items" :key="item.id">
            {{ item.name }} - {{ item.quantity }}
          </li>
        </ul>
        <p class="mt-4">
          <span class="font-semibold">Total:</span> ${{ order.total }}
        </p>
      </div>
      <div v-else>
        <p>No order selected.</p>
      </div>
    </div>

    <!-- Button Section -->
    <div
      class="p-4 border-t border-gray-300 fixed bottom-0 right-0 w-full lg:w-[400px]"
    >
      <div class="flex justify-end space-x-4">
        <button
          class="w-1/2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          @click="cancelOrder"
        >
          Cancel
        </button>
        <button
          class="w-1/2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          @click="processOrder"
        >
          Process
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderDetails",
  props: {
    order: {
      type: Object,
      required: false,
    },
  },
  methods: {
    cancelOrder() {
      this.$emit("cancel-order", this.order.id);
    },
    processOrder() {
      this.$emit("process-order", this.order.id);
    },
  },
};
</script>

<style scoped>
.flex-1 {
  margin-bottom: 4rem;
}
</style>
