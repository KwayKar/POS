<template>
  <div>
    <div>
      <div class="order-header" ref="headerRef">
        <div class="order-id">
          #{{ order?.id }}
          <div class="order-total" v-if="!isKitchenStaff">
            - {{ order.totalAmount }}
          </div>
        </div>
        <div class="order-status">
          <span :class="['status-btn', statusClass(order?.status)]">{{
            order?.status
          }}</span>
        </div>
      </div>

      <div class="order-tags" ref="tagsRef">
        <span class="tag" v-if="!isKitchenStaff">{{
          formatOrderType(order?.orderType)
        }}</span>
        <span class="tag">{{ formatDate(order?.createdAt) }}</span>
        <span class="tag">{{ order?.items?.length || 0 }} items</span>
      </div>

      <div
        class="layout-container"
        ref="containerRef"
        :style="{ height: itemsWrapperHeight }"
      >
        <div v-if="order?.deliveryAddress" class="order-address">
          <div style="display: flex">
            <p>{{ order?.deliveryAddress }}</p>
            <div class="edit-order-info" @click="openModal('delivery-address')">
              <div class="order-info-icon">
                <EditPencil />
              </div>
              <p>Edit</p>
            </div>
          </div>
          <p style="margin-top: 12px">{{ order?.phoneNumber }}</p>
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
                <th @click="onAddNewItem" style="width: 55px">
                  <div class="plus-sign"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-for="item in items" :key="item.id">
                <tr
                  :class="{
                    'has-customizations':
                      item.customizations && item.customizations.length,
                  }"
                >
                  <td :class="['item-name', { crossed: item.processed }]">
                    {{ item?.title || item?.name }}
                  </td>
                  <td
                    @click="() => updateItemQty(item.quantity)"
                    style="padding-left: 15px"
                  >
                    <div
                      :style="{
                        width: '40%',
                        height: '50%',
                        border: isEditMode
                          ? '1px solid #dedede'
                          : '1px solid transparent',
                        padding: '8px',
                        textAlign: 'center',
                        borderRadius: '8px',
                      }"
                    >
                      {{ item.quantity }}
                    </div>
                  </td>
                  <td>
                    <Checkbox v-model="item.processed" :id="item.id"
                      >Done</Checkbox
                    >
                  </td>
                  <td style="padding: 0">
                    <div class="wrap-remove-btn">
                      <div
                        v-if="isEditMode"
                        class="remove-btn"
                        @click="onConfirmRemoveItem(item, 'product')"
                      >
                        <div />
                      </div>
                      <div v-else style="width: 50px; padding: 0">
                        <div />
                      </div>
                    </div>
                  </td>
                </tr>

                <tr
                  v-if="item?.customizations?.length"
                  :class="{
                    'has-customizations': item?.notes,
                  }"
                  :key="item.id + '-customs'"
                >
                  <td
                    colspan="4"
                    class="customizations-cell"
                    style="padding-left: 25px"
                  >
                    <ul class="customizations-list">
                      <li
                        v-for="custom in item.customizations"
                        :key="custom.id"
                      >
                        <span class="custom-type">+ {{ custom.title }}</span>
                        <span v-if="!isKitchenStaff && custom.price">
                          ({{ formatCurrency(custom.price) }})</span
                        >
                        <div
                          v-if="isEditMode && custom.type === 'addon'"
                          class="remove-btn"
                          style="width: 25px; height: 25px; margin-left: 12px"
                          @click="onConfirmRemoveItem(custom, 'addon')"
                        >
                          <div />
                        </div>
                      </li>
                    </ul>
                  </td>
                </tr>

                <tr v-if="item?.notes" :key="item.id + '-notes'">
                  <td
                    colspan="4"
                    class="customizations-cell"
                    style="padding-left: 10px; width: 55px"
                  >
                    <div class="item-note">
                      <strong>Note</strong> - {{ item?.notes }}
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>

      <div class="order-btn-section" ref="btnRef">
        <OrderStatus
          :isEditMode="isEditMode"
          :orderStatus="order.status"
          @edit-mode-toggle="handleEditToggle"
        />
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
      width="460px"
      height="auto"
      @close="closeModal"
    >
      <UpdateDeliveryAddress
        :address="order?.deliveryAddress"
        :phoneNumber="order?.phoneNumber"
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
      <UpdateOrderStatus :isOpen="modal.isOpen" @close="closeModal" />
    </Modal>

    <Modal
      v-if="modal.isOpen && modal.type === 'confirm-delete'"
      width="420px"
      height="auto"
      @close="closeModal"
    >
      <ConfirmDelete @remove-item="handleRemove" @close="closeModal">
        <div>
          <p style="font-size: 0.95rem">
            Are you sure to remove
            <strong>"{{ confirmDelete.title }}"</strong> from the order?
          </p>

          <p style="font-size: 15px; color: var(--gray-3); margin-top: 23px">
            This will also update the total amount of the order.
          </p>
        </div>
      </ConfirmDelete>
    </Modal>

    <Modal
      v-if="modal.isOpen && modal.type === 'add-new-items'"
      @close="closeModal"
      :width="modalWidth"
      :height="modalHeight + 'px'"
      :minHeight="'400px'"
      :isFullScreenMobile="true"
    >
      <ProductListForNewOrder @close="closeModal" />
    </Modal>

    <Modal
      v-if="modal.isOpen && modal.type === 'update-item-qty'"
      width="360px"
      height="auto"
      @close="closeModal"
    >
      <UpdateItemQty :qty="existingQty" />
    </Modal>
  </div>
</template>

<script setup>
import Checkbox from "~/components/reuse/ui/Checkbox.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import UpdateOrderStatus from "./UpdateOrderStatus.vue";
import UpdatePayment from "./edit/UpdatePayment.vue";
import UpdateDeliveryAddress from "./edit/UpdateDeliveryAddress.vue";
import Note from "@/components/reuse/icons/Note.vue";
import { formatCurrency } from "~/utils/formatCurrency";
import OrderStatus from "./orderDetails/OrderStatus.vue";
import { useUser } from "~/stores/user/useUser";
import ConfirmDelete from "~/components/reuse/ui/ConfirmDelete.vue";
import EditPencil from "~/assets/icons/editPencil.vue";
import { useOrder } from "~/stores/order/useOrder";
import ProductListForNewOrder from "./orderDetails/ProductListForNewOrder.vue";
import { useWindowSize } from "~/composables/useWindowSize";
import UpdateItemQty from "./orderDetails/UpdateItemQty.vue";

const props = defineProps({
  order: Object,
});
const userStore = useUser();
const orderStore = useOrder();
const { width, height } = useWindowSize();
const modal = ref({
  isOpen: false,
  type: "",
});
// layouts ref
const containerRef = ref(null);
const headerRef = ref(null);
const tagsRef = ref(null);
const btnRef = ref(null);
const itemsWrapperHeight = ref(0);
const items = computed(() => props.order?.items || []);

// for actions
const isEditMode = ref(false);
const confirmDelete = ref({
  id: null,
  type: null,
  name: null,
});
const existingQty = ref();

const isKitchenStaff = computed(() => userStore.role === "kitchen");

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

function formatOrderType(type) {
  if (!type) return "";
  return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
}

// get height for scrollable area
function calculateItemsWrapperHeight() {
  const containerHeight = containerRef.value?.offsetHeight || 0;
  const headerHeight = headerRef.value?.offsetHeight || 0;
  const tagsHeight = tagsRef.value?.offsetHeight || 0;
  const btnHeight = btnRef.value?.offsetHeight || 0;

  const resultHeight =
    window.innerHeight - (headerHeight + tagsHeight + btnHeight + 120);

  itemsWrapperHeight.value = `${resultHeight > 0 ? resultHeight : 0}px`;
}

let resizeTimeout = null;
function onResize() {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    calculateItemsWrapperHeight();
  }, 100);
}

function onConfirmRemoveItem(item, type) {
  openModal("confirm-delete");
  confirmDelete.value = {
    show: true,
    type,
    id: item.id,
    title: item.title,
  };
}

function handleRemove() {
  if (confirmDelete.value.type === "product") {
    removeProduct(confirmDelete.value.id);
  } else if (confirmDelete.value.type === "addon") {
    removeAddonFromItem(confirmDelete.value.id);
  }
  closeModal();
}

function removeProduct(itemId) {
  orderStore.removeProductOrder(itemId);

  // const index = props.order.items.findIndex((item) => item.id === itemId);
  // if (index !== -1) {
  //   props.order.items.splice(index, 1);
  // }
}

function removeAddonFromItem(customizationId) {
  const item = props.order.items.find((item) =>
    item.customizations?.some(
      (c) => c.id === customizationId && c.type === "addon"
    )
  );
  if (!item) return;
  const itemId = item.id;

  orderStore.removeProductCustomization(itemId, customizationId);
  // props.order.items.forEach((item) => {
  //   if (Array.isArray(item.customizations)) {
  //     item.customizations = item.customizations.filter(
  //       (c) => !(c.id === customizationId && c.type === "addon")
  //     );
  //   }
  // });
}

function handleEditToggle(value) {
  isEditMode.value = value;
}

function onAddNewItem() {
  if (isEditMode) {
    openModal("add-new-items");
  }
}

function updateItemQty(value) {
  openModal("update-item-qty");
  existingQty.value = value;
}

onMounted(async () => {
  await nextTick();
  calculateItemsWrapperHeight();
  window.addEventListener("resize", onResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", onResize);
  if (resizeTimeout) clearTimeout(resizeTimeout);
  isEditMode.value = false;
});

const modalWidth = computed(() => {
  if (width.value > 1200) {
    return "1000px";
  } else if (width.value > 1100) {
    return `${width.value - 100}px`;
  } else {
    return `${width.value - 120}px`;
  }
});

const modalHeight = computed(() => {
  if (width.value > 850 && height.value > 770) {
    return 720;
  } else {
    return height.value - 80;
  }
});
</script>

<style scoped>
.layout-container {
  overflow-y: auto;
}

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
  color: #555555;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  cursor: default;
}

.order-total {
  font-size: 1.2rem;
  padding-left: 4px;
  font-weight: 500;
  display: inline;
}

.table {
  width: 100%;
  border-collapse: collapse;
  border: 0px solid !important;
  font-size: 0.95rem;
}

.table th,
.table td {
  padding: 8px 16px;
  text-align: left;
  color: var(--black-2);
  border: none;
}

tr.has-customizations td {
  border-bottom: none !important;
}

.table th {
  font-weight: 600;
  color: var(--black-1);
  border-bottom: 1px solid #ddd;
}

.table td {
  font-weight: 500;
  color: var(--black-1);
  border-bottom: 1px solid #ddd;
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
  background-color: #9581bc; /* purple */
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
  font-size: 1rem;
  color: var(--black-2);
  margin: 12px 0 26px;
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

.item-note {
  background: #f1f1f1;
  padding: 12px;
  margin-bottom: 15px;
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
  overflow: hidden;
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

.customizations-list li {
  margin-bottom: 10px;
  display: flex;
}

.custom-type {
  display: inline-block;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
}

.order-btn-section {
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 9999;
  padding: 0 15px;
  background: var(--white-1);
  display: flex;
  justify-content: flex-end;
}

.wrap-remove-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}

.remove-btn {
  background-color: var(--red-1);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: var(--white-1);
  border: none;
  font-size: 0.75rem;
  padding: 0;
}

.remove-btn div {
  width: 40%;
  height: 3px;
  background: var(--white-1);
}

.edit-order-info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 35px;
  cursor: pointer;
}

.edit-order-info p {
  color: var(--gray-3);
  font-size: 14px;
  font-weight: 600;
  text-decoration: underline;
}

.order-info-icon {
  width: 30px;
  height: 30px;
  fill: var(--olive-gray);
  margin-right: 0px;
}

.plus-sign {
  display: inline-block;
  position: relative;
  width: 25px;
  height: 25px;
  background: var(--white-1);
  border: 1px solid var(--black-2);
  box-sizing: border-box;
  box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.14);
  border-radius: 50%;
  padding: 10px;
}

.plus-sign::before,
.plus-sign::after {
  content: "";
  position: absolute;
  background-color: var(--black-2);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.plus-sign::before {
  width: 2.5px;
  height: 50%;
}

.plus-sign::after {
  width: 50%;
  height: 2.5px;
}
</style>
