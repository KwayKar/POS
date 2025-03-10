<template>
  <div class="w-full px-4 py-8">
    <!-- Filter Buttons -->
    <div class="flex items-center mb-4">
      <Button
        @click="$emit('filter-dish', '')"
        class="rounded mr-3"
      >
        All
      </Button>
      <Button
        @click="$emit('filter-dish', 'processing')"
        class="rounded mr-3"
      >
        Processing
      </Button>
      <Button
        @click="$emit('filter-dish', 'ready')"
        class="rounded mr-3"
      >
        Ready
      </Button>
      <Button
        @click="$emit('filter-dish', 'completed')"
        class="rounded mr-3"
      >
        Completed
      </Button>
      <Button
        @click="$emit('filter-dish', 'cancelled')"
        class="rounded"
      >
        Cancelled
      </Button>
    </div>

    <!-- Table for Orders -->
    <div class="bg-white shadow rounded-md overflow-hidden w-full">
      <table class="table-auto w-full text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-3 text-gray-600 font-medium">Dish Name</th>
            <th class="px-6 py-3 text-gray-600 font-medium">Quantity</th>
            <th class="px-6 py-3 text-gray-600 font-medium">Chef</th>
            <th class="px-6 py-3 text-gray-600 font-medium">Order Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="dish in filteredOrders"
            :key="dish.id"
            class="border-t hover:bg-gray-50"
            @click="$emit('select-dish', dish)"
          >
            <td class="px-6 py-3">{{ dish.name }}</td>
            <td class="px-6 py-3">{{ dish.quantity }}</td>
            <td class="px-6 py-3">{{ dish.chef }}</td>
            <td class="px-6 py-3">{{ dish.status }}</td>
          </tr>
          <tr v-if="filteredOrders.length === 0">
            <td colspan="5" class="px-6 py-3 text-center text-gray-500">
              No dishes available
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Button from "~/components/reuse/ui/Button.vue";

export default {
  components: {
    Button,
  },
  props: {
    dishes: {
      type: Array,
      required: true,
    },
  },
  computed: {
    filteredOrders() {
      if (this.filterStatus === "") return this.dishes;
      return this.orders.filter((order) => order.status === this.filterStatus);
    },
  },
  data() {
    return {
      filterStatus: "",
    };
  },
  methods: {
    selectOrder(order) {
      this.$emit("select-dish", order);
    },
    filterOrders(status) {
      this.filterStatus = status;
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
tr:hover {
  background-color: #f9f9f9;
}
</style>
