<template>
  <div>
    <div class="order-header">
      <div class="order-id">#{{ order?.id }}</div>
      <div class="order-status">
        <span :class="['status-btn', statusClass(order?.status)]">{{
          order?.status
        }}</span>
      </div>
    </div>

    <div class="order-tags">
      <span class="tag">{{ order?.orderType }}</span>
      <span class="tag">{{ formatDate(order?.createdAt) }}</span>
      <span class="tag">{{ order?.items?.length || 0 }} items</span>
    </div>

    <div v-if="order?.deliveryAddress" class="order-address">
      {{ order.deliveryAddress }}
    </div>

    <div v-if="order?.note" class="order-note">
      <div class="note-icon">
        <Note size="20" fill="#555" />
      </div>
      <div>
        <div class="note-title">Customer Note</div>
        <div class="note-info">{{ order.note }}</div>
      </div>
    </div>

    <div class="star-separator"></div>
    
    <div class="wrap-order-items">
      <table class="table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Processed</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order.items" :key="item.id">
            <td :class="['item-name', { 'crossed': item.processed }]">{{ item.name }}</td>
            <td style="padding-left: 40px;">{{ item.quantity }}</td>
            <td>
              <Checkbox v-model="item.processed" :id="item.id">Done</Checkbox>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <Modal
    v-if="modal.isOpen && modal.type === 'payment-method'"
    width="420px"
    height="auto"
    @close="closeModal"
  >
    <UpdatePayment :isOpen="modal.isOpen" @close="closeModal" />
  </Modal>

  <Modal
    v-if="modal.isOpen && modal.type === 'delivery-address'"
    width="420px"
    height="auto"
    @close="closeModal"
  >
    <UpdateDeliveryAddress :isOpen="modal.isOpen" @close="closeModal" />
  </Modal>

  <Modal
    v-if="modal.isOpen && modal.type === 'order-status'"
    width="420px"
    height="auto"
    @close="closeModal"
  >
    <UpdateOrderStatus :isOpen="modal.isOpen" @close="closeModal" />
  </Modal>
</template>

<script setup>
import Button from "~/components/reuse/ui/Button.vue";
import Checkbox from "~/components/reuse/ui/Checkbox.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import UpdateOrderStatus from "./UpdateOrderStatus.vue";
import EditPencil2 from "~/components/reuse/icons/EditPencil2.vue";
import UpdatePayment from "./edit/UpdatePayment.vue";
import UpdateDeliveryAddress from "./edit/UpdateDeliveryAddress.vue";
import Note from "@/components/reuse/icons/Note.vue";

const props = defineProps({
  order: Object,
});

const modal = ref({
  isOpen: false,
  type: "",
});

function openModal(type) {
  modal.value.isOpen = true;
  modal.value.type = type;
}

function closeModal() {
  modal.value.isOpen = false;
  modal.value.type = "";
}

function statusClass(status) {
  switch (status?.toLowerCase()) {
    case "pending":
      return "status-pending";
    case "processing":
      return "status-processing";
    case "ready":
      return "status-ready";
    case "dispatched":
      return "status-dispatched";
    case "delivered":
      return "status-delivered";
    case "completed":
      return "status-completed";
    case "canceled":
      return "status-canceled";
    default:
      return "status-default";
  }
}

function formatDate(date) {
  if (!date) return "N/A";
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return new Date(date).toLocaleString("en-US", options);
}
</script>

<style scoped>

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.order-id {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--black-1);
}

.order-status .status-btn {
  padding: 6px 24px;
  border-radius: 18px;
  color: var(--black-1);
  font-size: 0.9rem;
  text-transform: capitalize;
  display: flex;
  align-items: center;
}

.table {
  width: 100%;
  border-collapse: collapse;
  border: 0px solid !important;
  font-size: 0.95rem;
}

.table th,
.table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  color: var(--black-2);
}

.table th {
  font-weight: 600;
  color: var(--black-1);
}

.table td {
  font-weight: 500;
  color: var(--black-1);
}

.table td ::v-deep(label) {
  font-size: 13px !important;
}

.status-btn::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: var(--dot-color);
}

.status-pending {
  background-color: #e0e0e0;
  --dot-color: #9e9e9e;
}

.status-processing {
  background-color: #ffe7c2;
  --dot-color: #ff9800;  
}

.status-ready {
  background-color: #c4eac5;  
  --dot-color: #4caf50;
}

.status-dispatched {
  background-color: #9581bc;  /* purple */
}

.status-delivered {
  background-color: #c4eac5; 
  --dot-color: #4caf50;
}

.status-completed {
  background-color: #c4eac5; 
  --dot-color: #4caf50;
}

.status-canceled {
  background-color: #c68c92;  
}

.status-default {
  background-color: #e0e0e0;  
}

.order-tags {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.tag {
  background-color: var(--white-1) !important;
  border: 1px solid var(--gray-2);
  padding: 4px 20px;
  border-radius: 24px;
  font-size: 0.875rem;
  color: var(--black-3);
  user-select: none;
}

.order-address {
  font-size: 0.9rem;
  color: var(--black-2);
  margin-bottom: 26px;
}

.order-note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.9rem;
  margin-bottom: 24px;
  background: #f1f1f1;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 8px;
}

.note-icon {
  width: 24px;
  height: 24px;
  fill: var(--olive-gray);
  margin-top: 2px;
}

.note-title {
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 10px;
  color: var(--black-1);
}

.note-info {
  color: var(--gray-3);
  white-space: pre-wrap;
}

.wrap-order-items {
  /* same styling you have for the table container */
}

.item-name {
  font-weight: 600;
  color: var(--olive-gray);
}

.crossed {
  text-decoration: line-through;
  color: var(--gray-2); 
}

.star-separator {
  width: 100%;
  height: 1.5em; 
  margin: 2rem 0;
  position: relative;
}

.star-separator::before {
  content: "★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★"; 
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  letter-spacing: 0.5em;
  color: var(--black-1);
  font-weight: bold;
  font-size: 8px;
  user-select: none;
  width: 100%;
  text-align: center;
}
</style>
