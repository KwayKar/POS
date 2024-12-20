<template>
  <DashboardLayout>
    <div class="flex flex-col lg:flex-row h-full">
      <div class="p-4 bg-gray-100 h-full overflow-y-auto">
        <ItemList @select-item="openModal" />
      </div>
      <div class="w-[600px] bg-gray-800 p-4 overflow-y-auto">
        <OrderPanel :order="order" />
      </div>
      <Modal v-if="isModalOpen" @close="closeModal" :minHeight="'500px'">
        <AddOrderInfo 
          :item="selectedItem" 
          @update-order="handleOrderUpdate"
        />
      </Modal>
    </div>
  </DashboardLayout>
</template>

<script>
import ItemList from "~/components/dashboard/items/ItemList.vue";
import AddOrderInfo from "~/components/dashboard/orders/AddOrderInfo.vue";
import OrderPanel from "~/components/dashboard/orders/OrderPanel.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import DashboardLayout from "~/layouts/DashboardLayout.vue";

export default {
  components: {
    DashboardLayout,
    ItemList,
    OrderPanel,
    AddOrderInfo,
    Modal
  },
  data() {
    return {
      isModalOpen: false,
      selectedItem: null,
      order: [],
    };
  },
  methods: {
    handleOrderUpdate(updatedOrder) {
      const existingOrderIndex = this.order.findIndex(
        (order) => order.item.id == updatedOrder.item.id 
      );

      if (existingOrderIndex !== -1) {
        const updateItem = { ...this.order[0], quantity: this.order[0].quantity + updatedOrder.quantity };
        this.order.splice(0, 1, updateItem);
      } else {
        this.order.push(updatedOrder);
      }
      
      this.isModalOpen = false;
      this.selectedItem = null;   
    },
    openModal(item) {
      this.selectedItem = item;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedItem = null;
    },
  },
};
</script>
