<template>
  <DashboardLayout>
    <NavPanel
      class="fixed top-0 left-0 lg:left-[100px] w-full lg:w-[calc(100%-100px)] h-16 bg-white shadow"
    />
    <div class="w-full px-4 py-8">
      <div class="flex justify-between items-center mb-4">
        <div class="flex-grow"></div>
        <button
          @click="openModal('create', null)"
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
              <th class="px-6 py-3 text-gray-600 font-medium">Expiry Date</th>
              <th
                class="px-6 py-3 text-gray-600 font-medium"
                style="text-align: right"
              ></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="discount in discounts"
              :key="discount.id"
              class="border-t hover:bg-gray-50"
            >
              <td class="px-6 py-3">{{ discount.title }}</td>
              <td class="px-6 py-3">{{ discount.amount }}{{ discount?.type === 'percentage' ? '%' : undefined}}</td>
              <td class="px-6 py-3">{{ discount.expiry }}</td>
              <td class="px-6 py-3" style="text-align: right">
                <button
                  @click="openModal('edit', discount)"
                  class="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  @click="openModal('delete', discount)"
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

    <Modal
      v-if="isModalOpen && (modalType === 'edit' || modalType === 'create')"
      width="560px"
      @close="closeModal"
    >
      <EditDiscount
        :mode="modalType === 'edit'"
        :discount="selectedDiscount"
        @save-discount="updateDiscount"
        @close="closeModal"
      />
    </Modal>

    <Modal
      v-if="isModalOpen && modalType === 'delete'"
      width="420px"
      height="170px"
      @close="closeModal"
    >
      <RemoveDiscount
        :discount="selectedDiscount"
        @remove-discount="removeDiscount"
        @close="closeModal"
      />
    </Modal>
  </DashboardLayout>
</template>

<script>
import EditDiscount from "~/components/dashboard/discounts/EditDiscount.vue";
import RemoveDiscount from "~/components/dashboard/discounts/RemoveDiscount.vue";
import NavPanel from "~/components/dashboard/panels/NavPanel.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import DashboardLayout from "~/layouts/DashboardLayout.vue";

export default {
  components: {
    DashboardLayout,
    NavPanel,
    Modal,
    EditDiscount,
    RemoveDiscount,
  },
  data() {
    return {
      selectedDiscount: null,
      discounts: [
        { id: 1, title: "Summer Sale", amount: 20, expiry: "2025-06-30" },
        { id: 2, title: "Black Friday", amount: 50, expiry: "2025-06-30" },
        { id: 3, title: "Cyber Monday", amount: 30, expiry: "2025-06-30" },
      ],
      isModalOpen: false,
      modalType: "",
    };
  },
  methods: {
    createDiscount() {
      this.closeModal();
    },
    updateDiscount(item) {
      if (this.modalType === "create") {
        console.log(item);
        this.discounts = [...this.discounts, item];
      } else {
        const index = this.discounts.findIndex(
          (discount) => discount.id === item.id
        );
        if (index !== -1) {
          this.discounts[index] = { ...item };
        }
      }
      this.closeModal();
    },
    removeDiscount(id) {
      this.discounts = this.discounts.filter((d) => d.id !== id);
      this.closeModal();
    },
    openModal(type, item) {
      this.isModalOpen = true;
      this.modalType = type;
      this.selectedDiscount = { ...item };
    },
    closeModal() {
      this.isModalOpen = false;
      this.modalType = "";
      this.selectedDiscount = null;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
