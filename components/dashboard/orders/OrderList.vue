<template>
  <div class="w-full px-4 py-8">
    <div class="flex items-center mb-4">
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
        @click="$emit('filter-order', 'old')"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Old
      </button>
    </div>

    <div class="bg-white shadow rounded-md overflow-hidden">
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
          >
            <td class="px-6 py-3">{{ order.id }}</td>
            <td class="px-6 py-3">{{ order.address }}</td>
            <td class="px-6 py-3">{{ order.phone }}</td>
            <td class="px-6 py-3">{{ order.date }}</td>
            <td class="px-6 py-3" style="text-align: right">
              <button
                @click="$emit('select-order', 'edit', order)"
                class="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                @click="$emit('select-order', 'delete', order)"
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
};
</script>
