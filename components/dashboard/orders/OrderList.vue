<template>
  <div class="w-full px-4 py-8">
    <div class="flex items-center mb-4">
      <Button
        @click="$emit('filter-order', '')"
        class="rounded mr-3"
      >
        All
      </Button>
      <Button
        @click="$emit('filter-order', 'new')"
        class="rounded mr-3"
      >
        New
      </Button>
      <Button
        @click="$emit('filter-order', 'processing')"
        class="rounded mr-3"
      >
        Processing
      </Button>
      <Button
        @click="$emit('filter-order', 'ready')"
        class="rounded mr-3"
      >
        Ready
      </Button>
      <Button
        @click="$emit('filter-order', 'completed')"
        class="rounded mr-3"
      >
        Completed
      </Button>
      <Button
        @click="$emit('filter-order', 'cancelled')"
        class="rounded"
      >
        Cancelled
      </Button>
    </div>

    <div class="bg-white shadow rounded-md overflow-hidden w-full">
      <table class="table-auto w-full text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-3 text-gray-600 font-medium">ID</th>
            <th class="px-6 py-3 text-gray-600 font-medium">Type</th>
            <th class="px-6 py-3 text-gray-600 font-medium">Qty</th>
            <th class="px-6 py-3 text-gray-600 font-medium">Ordered At</th>
            <th class="px-6 py-3 text-gray-600 font-medium">Status</th>
            <th
              class="px-6 py-3 text-gray-600 font-medium"
              style="text-align: right"
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in orders"
            :key="order.id"
            class="border-t hover:bg-gray-50"
            @click="$emit('select-order', order)"
          >
            <td class="px-6 py-3">{{ order.id }}</td>
            <td class="px-6 py-3">{{ order.orderType }}</td>
            <td class="px-6 py-3">{{ order.dishes.length }}</td>
            <td class="px-6 py-3">{{ order.time }}</td>
            <td class="px-6 py-3">{{ order.orderStatus }}</td>
            <td class="px-6 py-3" style="text-align: right">
              <button
                @click.stop="$emit('edit-order', 'edit', order)"
                class="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                @click.stop="$emit('edit-order', 'delete', order)"
                class="ml-4 text-red-500 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="orders.length === 0">
            <td colspan="3" class="px-6 py-3 text-center text-gray-500">
              No order available
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Button from '~/components/reuse/ui/Button.vue';

export default {
  components: {
    Button
  },
  props: {
    orders: {
      type: Object,
      required: true,
    },
  },
  methods: {
    selectOrder() {

    }
  }
};
</script>
