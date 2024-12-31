<template>
  <DashboardLayout>
    <NavPanel
      class="fixed top-0 left-0 lg:left-[100px] w-full lg:w-[calc(100%-100px)] h-16 bg-white shadow"
    />


    <OrderList
      :orders="filteredOrders"
      @select-order="openModal"
      @filter-order="filterByOrderStatus"
    />

    <div style="color: var(--primary-btn-color)">
        {{ currentStaff.role }}
    </div>

    <Modal
      v-if="modal.isOpen && modal.type === 'edit'"
      @close="closeModal"
      :minHeight="'400px'"
    >
      <OrderInfo
        :order="selectedOrder"
        @edit-order="updateOrder"
      />
    </Modal>

    <Modal
      v-if="modal.isOpen && modal.type === 'delete'"
      width="420px"
      height="auto"
      @close="closeModal"
    >
      <ConfirmDelete @remove-item="removeOrder" @close="closeModal">
        Are you sure you want to delete {{ selectedOrder.id }}?
      </ConfirmDelete>
    </Modal>
  </DashboardLayout>
</template>

<script>
import OrderInfo from "~/components/dashboard/orders/OrderInfo.vue";
import OrderList from "~/components/dashboard/orders/OrderList.vue";
import NavPanel from "~/components/dashboard/panels/NavPanel.vue";
import ConfirmDelete from "~/components/reuse/ui/ConfirmDelete.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import DashboardLayout from "~/layouts/DashboardLayout.vue";
import { mapState } from 'vuex';
import { mapGetters } from "vuex";

export default {
  components: {
    DashboardLayout,
    NavPanel,
    Modal,
    OrderList,
    OrderInfo,
    ConfirmDelete,
  },
  data() {
    return {
      selectedOrder: null,
      filterStatus: "",
      orders: [
        {
          id: 1,
          phone: "09321312",
          email: "bobo@gmail.com",
          address: "Address goes here",
          date: "6/12/2025",
          orderStatus: "new",
        },
        {
          id: 2,
          phone: "09321312",
          email: "koo@gmail.com",
          address: "Address 1 here",
          date: "8/12/2025",
          orderStatus: "old",
        },
        {
          id: 3,
          phone: "09321312",
          email: "looa@gmail.com",
          address: "Address 2 here",
          date: "7/12/2025",
          orderStatus: "processing",
        },
      ],
      modal: {
        type: "",
        isOpen: false,
      },
    };
  },
  methods: {
    updateOrder(item) {
      const index = this.orders.findIndex((order) => order.id === item.id);
      if (index !== -1) {
        // this.orders[index] = { ...item };
        const updatedOrders = [...this.orders];
        updatedOrders[index] = { ...item };
        this.orders = updatedOrders;
      }
      this.closeModal();
    },
    removeOrder() {
      this.orders = this.orders.filter(
        (user) => user.id !== this.selectedOrder.id
      );
      this.closeModal();
    },
    filterByOrderStatus(status) {
      this.filterStatus = status;
    },
    openModal(type, item) {
      this.modal = {
        type,
        isOpen: true,
      };
      this.selectedOrder = { ...item };
    },
    closeModal() {
      this.modal = {
        type: null,
        isOpen: false,
      };
    },
  },
  computed: {
    filteredOrders() {
      if (this.filterStatus === "") return this.orders;
      return this.orders.filter(
        (order) => order.orderStatus === this.filterStatus
      );
    },
    // ...mapState("company", ["staff"]),
    ...mapGetters("company", ["currentStaff"]),
    // ...mapState({
    //   staff: (state) => "ss", // Custom mapping
    // //   business: 'business.type', // Shorthand for state.business.type
    // }),
  },
};
</script>
