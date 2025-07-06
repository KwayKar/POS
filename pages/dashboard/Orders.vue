<template>
  <DashboardLayout>
    <NavPanel
      class="navPanel fixed top-0 left-0 lg:left-[100px] w-full lg:w-[calc(100%-100px)] h-16"
      style="z-index: 99"
    >
      <component :is="currentNavComponent" />
      <NavPanelButton
        style="height: 42px; border: 1px solid var(--black-2)"
        :applyShadow="true"
        >Accept Order</NavPanelButton
      >
    </NavPanel>

    <div class="flex-shrink-0 overflow-y-auto" :style="{ width: 'calc(100%)' }">
      <div class="w-full">
        <OrderList
          @select-order="selectOrder"
          @edit-order="openModal"
          @filter-order="filterByOrderStatus"
        />
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

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import EditOrderInfo from "~/components/dashboard/orders/EditOrderInfo.vue";
import OrderList from "~/components/dashboard/orders/OrderList.vue";
import NavPanel from "~/components/dashboard/panels/NavPanel.vue";
import ConfirmDelete from "~/components/reuse/ui/ConfirmDelete.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import DashboardLayout from "~/layouts/DashboardLayout.vue";
import NavPanelButton from "~/components/dashboard/panels/NavPanelButton.vue";

const selectedOrder = ref(null);
const filterStatus = ref("");
const modal = ref({ type: "", isOpen: false });


function selectOrder(order) {
  selectedOrder.value = order;
}

function updateOrder(updated) {
  orderStore.updateOrder(updated.id, updated);
  closeModal();
}

function removeOrder() {
  if (selectedOrder.value) {
    orderStore.deleteOrder(selectedOrder.value.id);
    selectedOrder.value = null;
    closeModal();
  }
}

function filterByOrderStatus(status) {
  filterStatus.value = status;
}

function openModal(type, order) {
  modal.value = { type, isOpen: true };
  selectedOrder.value = { ...order };
}

function closeModal() {
  modal.value = { type: "", isOpen: false };
}

// Optional route-based logic
const route = useRoute();
const currentNavComponent = computed(() => {
  if (route.path.includes("dashboard/products")) return "ProductsNav";
  if (route.path.includes("dashboard/orders")) return "OrdersNav";
  return null;
});
</script>

<style scoped>
.orderDetailsPanel {
  background: var(--white-1);
  border-left: 1px solid var(--black-1);
}
</style>
