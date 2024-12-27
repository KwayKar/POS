<template>
  <DashboardLayout>
    <NavPanel
      class="fixed top-0 left-0 lg:left-[100px] w-full lg:w-[calc(100%-100px)] h-16 bg-white shadow"
    />
    
    <div class="container mx-auto py-8">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-semibold">Discounts</h1>
        <button
          @click="createDiscount"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Discount
        </button>
      </div>

      <div class="bg-white shadow rounded-md overflow-hidden">
        <table class="table-auto w-full text-left">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-gray-600 font-medium">Title</th>
              <th class="px-6 py-3 text-gray-600 font-medium">Amount</th>
              <th class="px-6 py-3 text-gray-600 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="discount in discounts"
              :key="discount.id"
              class="border-t hover:bg-gray-50"
            >
              <td class="px-6 py-3">{{ discount.title }}</td>
              <td class="px-6 py-3">{{ discount.amount }}%</td>
              <td class="px-6 py-3">
                <button
                  @click="editDiscount(discount.id)"
                  class="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  @click="deleteDiscount(discount.id)"
                  class="ml-4 text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr v-if="discounts.length === 0">
              <td colspan="3" class="px-6 py-3 text-center text-gray-500">
                No discounts available.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </DashboardLayout>
</template>

<script>
import NavPanel from "~/components/dashboard/panels/NavPanel.vue";
import DashboardLayout from "~/layouts/DashboardLayout.vue";

export default {
  components: {
    DashboardLayout,
    NavPanel
  },
  data() {
    return {
      discounts: [
        { id: 1, title: "Summer Sale", amount: 20 },
        { id: 2, title: "Black Friday", amount: 50 },
        { id: 3, title: "Cyber Monday", amount: 30 },
      ],
    };
  },
  methods: {
    createDiscount() {
      // Logic for creating a new discount
      console.log("Create discount clicked");
    },
    editDiscount(id) {
      // Logic for editing a discount
      console.log("Edit discount with ID:", id);
    },
    deleteDiscount(id) {
      // Logic for deleting a discount
      this.discounts = this.discounts.filter((d) => d.id !== id);
      console.log("Deleted discount with ID:", id);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
