<template>
  <div class="order-container">
    <h2 class="header2">Order Details</h2>

    <div class="order-layout">
      <div class="order-details">
        <div class="order-details-info">
          <label>ID:</label>
          <p>{{ order?.id }}</p>
        </div>

        <div class="order-details-info-gap" />

        <div class="order-details-info">
          <label>Type:</label>
          <p>{{ order?.orderType }}</p>
        </div>

        <div class="order-details-info-gap" />

        <div class="order-details-info">
          <label>Total:</label>
          <p>{{ order?.totalAmount }}</p>
        </div>

        <div class="order-details-info-gap" />

        <div class="order-details-info">
          <label>Status:</label>
          <p>{{ order?.status }}</p>
          <!-- <div class="edit-pencil">
            <EditPencil2 />
          </div> -->
        </div>

        <div class="order-details-info-gap" />

        <div class="order-details-info">
          <label>Order Date:</label>
          <p>{{ formatDate(order?.createdAt) }}</p>
        </div>

        <div class="order-details-info-gap" />

        <div class="order-details-info">
          <label>Delivery Address:</label>
          <p>{{ order?.deliveryAddress }}</p>
          <div class="edit-pencil" @click="openModal('delivery-address')">
            <EditPencil2 />
          </div>
        </div>

        <div class="order-details-info-gap" />

        <div class="order-details-info" style="padding-bottom: 52px">
          <label>Payment Method:</label>
          <p>{{ order?.paymentMethod?.method }}</p>
          <div class="edit-pencil" @click="openModal('payment-method')">
            <EditPencil2 />
          </div>
        </div>
      </div>

      <div class="wrap-order-items">
        <table class="table">
          <thead class="tableHeader bg-gray-100">
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Processed</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in order.items" :key="item.id">
              <td style="font-weight: 600; color: 'var(--olive-gray)'">{{ item.name }}</td>
              <td>{{ item.quantity }}</td>
              <td>
                <Checkbox v-model="item.processed" :id="item.id">Done</Checkbox>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="modal-bottom">
        <Button
          @click="openModal('order-status')"
          background="var(--red-1)"
          color="var(--white-1)"
          :applyShadow="true"
        >
          Status - Processing
        </Button>
      </div>
    </div>
  </div>

  <Modal
    v-if="modal.isOpen && modal.type === 'payment-method'"
    width="420px"
    height="auto"
    @close="closeModal"
  >
    <UpdatePayment
      :isOpen="modal.isOpen"
      @close="closeModal"
    />
  </Modal>

  <Modal
    v-if="modal.isOpen && modal.type === 'delivery-address'"
    width="420px"
    height="auto"
    @close="closeModal"
  >
    <UpdateDeliveryAddress
      :isOpen="modal.isOpen"
      @close="closeModal"
    />
  </Modal>

  <Modal
    v-if="modal.isOpen && modal.type === 'order-status'"
    width="420px"
    height="auto"
    @close="closeModal"
  >
    <UpdateOrderStatus
      :isOpen="modal.isOpen"
      @close="closeModal"
    />
  </Modal>
</template>

<script>
import { NCheckbox } from "naive-ui";
import Button from "~/components/reuse/ui/Button.vue";
import Checkbox from "~/components/reuse/ui/Checkbox.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import UpdateOrderStatus from "./UpdateOrderStatus.vue";
import EditPencil2 from "~/components/reuse/icons/EditPencil2.vue";
import UpdatePayment from "./edit/UpdatePayment.vue";
import UpdateDeliveryAddress from "./edit/UpdateDeliveryAddress.vue";

export default {
  name: "OrderDetails",
  props: {
    order: Object,
  },
  data() {
    return {
      options: ["Deliver", "Processing", "Deliver", "Dispatched"],
      selectedOption: null,
      modal: {
        isOpen: false,
        type: "",
      },
    };
  },
  components: {
    NCheckbox,
    Checkbox,
    Button,
    Modal,
    EditPencil2,
    UpdateOrderStatus,
    UpdatePayment,
    UpdateDeliveryAddress,
  },
  methods: {
    openModal(type) {
      this.modal.isOpen = true;
      this.modal.type = type;
    },
    closeModal() {
      this.modal.isOpen = false;
      this.modal.type = "";
    },
    formatDate(date) {
      if (!date) return "N/A";
      const options = {
        day: "2-digit",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      return new Date(date).toLocaleString("en-US", options);
    },
  },
};
</script>

<style scoped>
.order-container {
  padding: 24px;
  position: relative;
}

.order-layout {
  display: flex;
  margin: 32px 0 100px;
}
@media (max-width: 850px) {
  .order-layout {
    flex-direction: column;
  }
}

.wrap-order-items {
  width: 100%;
  height: 100%;
  flex: 1;
  border-radius: 14px;
  border: 1px solid var(--black-2);
  overflow: hidden;
}

.order-details {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex: 0.75;
  margin-right: 35px;
  width: 100%;
  padding: 14px;
  background: var(--white-1);
  border-radius: 24px;
  box-shadow: 1px 2px 4px #d9d9d97d;
  border: 1px solid var(--black-2);
}
@media screen and (min-width: 850px) {
  .order-details {
    max-width: 450px;
  }
}
@media (max-width: 900px) {
  .order-details {
    width: 100%;
  }
}
.order-details p {
  flex: 2;
  min-width: 150px;
}
.order-details-info {
  display: flex;
  align-items: flex-start;
  padding: 12px 0;
  word-wrap: break-word;
  word-break: break-word;
  white-space: normal;
}
@media (min-width: 768px) {
  .order-details-info:hover .edit-pencil {
    visibility: visible;
  }
}
.order-details-info-gap {
  margin: 0;
  width: 100%;
  height: 1px;
  background: var(--line-gap);
}
.order-details-info label {
  min-width: 150px;
  flex: 1;
  font-size: var(--font-size-small);
  font-weight: 600;
  margin: 0;
  color: var(--olive-gray);
}
.order-details-info p {
  display: flex;
  align-items: center;
  font-size: var(--font-size-small);
  color: var(--black-1);
}

.full-width {
  width: 100%;
}

.gap-line {
  width: 100%;
  height: 1px;
  background: var(--pale-gray-1);
  margin: 22px 0;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}

.table {
  width: 100%;
  border: none !important;
}

.table th,
.table td {
  font-size: 0.95rem;
  color: var(--olive-gray);
  height: 54px;
  border-bottom: 1px solid #dedede;
}

.table th,
.tabletable th {
  font-size: var(--font-size-small);
  font-weight: 600;
}

.n-checkbox ::v-deep .n-checkbox-inner {
  border: 1px solid var(--black-2) !important;
  border-radius: 4px;
}

.option {
  color: var(--black-1);
  font-size: var(--font-size-small);
  padding: 10px;
  cursor: pointer;
  margin: 8px 14px;
  border-radius: 8px;
}

.option:hover {
  background-color: var(--primary-hover-bg-color-1);
}

.selected {
  background-color: var(--black-1);
  color: var(--white-1);
  border-color: var(--black-1);
}
.edit-pencil {
  width: 20px;
  height: 20px;
  fill: #787474;
  visibility: visible;
  cursor: pointer;
}
@media (min-width: 768px) {
  .edit-pencil {
    visibility: hidden;
  }
}
</style>
