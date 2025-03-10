<template>
  <div class="flex flex-col w-full">
    <div class="flex-1 overflow-y-auto">
      <PanelTitle>Order Details</PanelTitle>
      <div v-if="order">
        <div v-if="order.id" class="mb-2 flex field-item">
          <p class="font-semibold">Order ID:</p>
          <p>{{ order.id }}</p>
        </div>
        
        <div v-if="order.phone" class="mb-2 flex field-item">
          <p class="font-semibold">Phone:</p>
          <p>{{ order.phone }}</p>
        </div>

        <div v-if="order.email" class="mb-2 flex field-item">
          <p class="font-semibold">Email:</p>
          <p>{{ order.email }}</p>
        </div>

        <div v-if="order.address" class="mb-2 flex field-item">
          <p class="font-semibold">Address:</p>
          <p>{{ order.address }}</p>
        </div>

        <div v-if="order.date" class="mb-2 flex field-item">
          <p class="font-semibold">Order Date:</p>
          <p>{{ order.date }}</p>
        </div>

        <div v-if="order.orderStatus" class="mb-4 flex field-item">
          <p class="font-semibold">Status:</p>
          <p>{{ order.orderStatus }}</p>
        </div>

        <p v-if="order.dishes" class="my-2 space-y-2">
          <span class="font-semibold">Dishes:</span>
        </p>
        <ul v-if="order.dishes" class="list-disc list-inside pl-4">
          <li v-for="dish in order.dishes" :key="dish.id" class="mb-4">
            <span class="font-semibold">{{ dish.name }} (x{{ dish.quantity }})</span><br />
            <span v-if="dish.comments" class="text-gray-600">- {{ dish.comments }}</span>
          </li>
        </ul>

        <p v-if="order.items" class="mb-2">
          <span class="font-semibold">Items:</span>
        </p>
        <ul v-if="order.items" class="list-disc list-inside pl-4">
          <li v-for="item in order.items" :key="item.id">
            {{ item.name }} - {{ item.quantity }}
          </li>
        </ul>
        <p v-if="order.total" class="mt-4 space-y-2">
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
        <Button
          class="w-1/2 bg-red-500 text-white py-2 px-4 hover:bg-red-600"
          @click="cancelOrder"
          style="background: var(--red-1)"
        >
          Cancel
        </Button>
        <Button class="w-1/2 py-2 px-4 rounded" @click="processOrder">
          Process
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "~/components/reuse/ui/Button.vue";
import PanelTitle from "../reuse/PanelTitle.vue";

export default {
  name: "OrderDetails",
  components: {
    PanelTitle,
    Button,
  },
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
.field-item > p {
  flex: 1;
}
</style>
