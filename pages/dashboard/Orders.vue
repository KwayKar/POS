<template>
  <DashboardLayout>
    <NavPanel
      class="fixed top-0 left-0 lg:left-[100px] w-full lg:w-[calc(100%-100px)] h-16 bg-white shadow" style="z-index: 99;"
    />

    <div 
      class="flex-shrink-0 overflow-y-auto"
      :style="{ width: 'calc(100% - 400px)' }"
    >
      <div class="w-full">
        <OrderList
          :orders="filteredOrders"
          @select-order="selectOrder"
          @edit-order="openModal"
          @filter-order="filterByOrderStatus"
        />
      </div>

      <div class="fixed top-16 right-0 w-full lg:w-[400px] h-[calc(100vh-16px)] bg-gray-50 border-l border-gray-300 p-4 overflow-y-auto">
        <OrderDetails :order="selectedOrder" />
      </div>
    </div>

    <Modal
      v-if="modal.isOpen && modal.type === 'edit'"
      @close="closeModal"
      width="460px"
      :minHeight="'400px'"
    >
      <EditOrderInfo
        :order="selectedOrder"
        :mode="modal.type"
        @edit-order="updateOrder"
        @close="closeModal"
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
import EditOrderInfo from "~/components/dashboard/orders/EditOrderInfo.vue";
import OrderList from "~/components/dashboard/orders/OrderList.vue";
import NavPanel from "~/components/dashboard/panels/NavPanel.vue";
import ConfirmDelete from "~/components/reuse/ui/ConfirmDelete.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import DashboardLayout from "~/layouts/DashboardLayout.vue";
import OrderDetails from "~/components/dashboard/orders/OrderDetails.vue";

export default {
  components: {
    DashboardLayout,
    NavPanel,
    Modal,
    OrderList,
    OrderDetails,
    EditOrderInfo,
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
          time: "1:30",
          orderStatus: "new",
          orderType: "Eat In",
          "dishes": [
            {
              "id": 1,
              "name": "Spaghetti Bolognese",
              "quantity": 2,
              "comments": "Extra cheese, no mushrooms",
              "chef": "Chef John",
              "status": "in-progress"
            },
            {
              "id": 2,
              "name": "Caesar Salad",
              "quantity": 1,
              "comments": "Dressing on the side",
              "chef": "Chef Sarah",
              "status": "completed"
            }
          ],
        },
        {
          id: 2,
          phone: "09321312",
          email: "koo@gmail.com",
          address: "Address 1 here",
          date: "8/12/2025",
          time: "12:40",
          orderStatus: "completed",
          orderType: "Take Away",
          "dishes": [
            {
              "id": 1,
              "name": "Spaghetti Bolognese",
              "quantity": 2,
              "comments": "Extra cheese, no mushrooms",
              "chef": "Chef John",
              "status": "in-progress"
            },
          ]
        },
        {
          id: 3,
          phone: "09321312",
          email: "looa@gmail.com",
          address: "Address 2 here",
          date: "7/12/2025",
          time: "11:10",
          orderStatus: "processing",
          orderType: "Delivery",
          "dishes": [
            {
              "id": 1,
              "name": "Spaghetti Bolognese",
              "quantity": 2,
              "comments": "Extra cheese, no mushrooms",
              "chef": "Chef John",
              "status": "in-progress"
            },
          ]
        },
      ],
      modal: {
        type: "",
        isOpen: false,
      },
    };
  },
  methods: {
    selectOrder(item) {
      this.selectedOrder = item;
    },
    updateOrder(item) {
      const index = this.orders.findIndex((order) => order.id === item.id);
      console.log(item)
      if (index !== -1) {
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
      this.selectedOrder = null;
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
  },
};
</script>
