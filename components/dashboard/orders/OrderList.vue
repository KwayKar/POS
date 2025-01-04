<template>
  <div class="w-full px-4 py-8">
    <div class="flex items-center mb-4">
      <button
        @click="$emit('filter-order', '')"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-3"
      >
        All
      </button>
      <button
        @click="$emit('filter-order', 'new')"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-3"
      >
        New
      </button>
      <button
        @click="$emit('filter-order', 'processing')"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-3"
      >
        Processing
      </button>
      <button
        @click="$emit('filter-order', 'ready')"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-3"
      >
        Ready
      </button>
      <button
        @click="$emit('filter-order', 'completed')"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-3"
      >
        Completed
      </button>
      <button
        @click="$emit('filter-order', 'cancelled')"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Cancelled
      </button>
    </div>

    <div class="bg-white shadow rounded-md overflow-hidden w-full">
      <table class="table-auto w-full text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-3 text-gray-600 font-medium">ID</th>
            <th class="px-6 py-3 text-gray-600 font-medium">Address</th>
            <th class="px-6 py-3 text-gray-600 font-medium">Phone Number</th>
            <th class="px-6 py-3 text-gray-600 font-medium">Ordered Date</th>
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
            <td class="px-6 py-3">{{ order.address }}</td>
            <td class="px-6 py-3">{{ order.phone }}</td>
            <td class="px-6 py-3">{{ order.date }}</td>
            <td class="px-6 py-3" style="text-align: right">
              <button
                @click.stop="$emit('edit-order', 'edit', order)"
                class="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                @click.stop="$emit('select-order', 'delete', order)"
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
export default {
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
