<template>
  <div>
    <div class="wrap-table bg-white w-full">
      <div class="table-container overflow-x-auto min-w-[800px]">
        <div class="table-filters min-w-[800px]">
          <div class="filter-left">
            <div class="search-input">
              <span class="icon">🔍</span>
              <Input
                type="text"
                v-model="searchQuery"
                placeholder="Search orders..."
                style="height: 34px; border: 0.5px solid ghostwhite"
              />
            </div>
          </div>

          <div class="filter-right">
            <!-- Status Filter -->
            <Select
              v-if="showSelect"
              v-model="selectedStatus"
              :options="statusOptions"
              @update:modelValue="handleStatusChange"
              style="
                padding: 0 14px;
                height: 36px;
                font-size: 14px;
                min-width: 200px;
                border: 1px solid var(--gray-2);
              "
            />

            <!-- Date Filter -->
            <vc-date-picker
              v-model="selectedDate"
              mode="single"
              is-required
              color="green"
              :popover="{ visibility: 'focus', transition: '' }"
            >
              <template #default="{ inputValue, inputEvents }">
                <input
                  class="date-picker"
                  :value="inputValue"
                  v-on="inputEvents"
                  placeholder="Select a date"
                  readonly
                />
              </template>
            </vc-date-picker>
          </div>
        </div>
        <table class="table min-w-[800px]">
          <thead class="tableHeader bg-gray-100">
            <tr>
              <th class="tableHeaderCol" @click="sortBy('id')">ID</th>
              <th class="tableHeaderCol" @click="sortBy('type')">
                Type
                <div class="th-sort-arrow">
                  <Icons icon="DropDownArrow" fillColor="black" scale="1.5" />
                </div>
              </th>
              <th class="tableHeaderCol" @click="sortBy('status')">
                Info
                <div class="th-sort-arrow">
                  <Icons icon="DropDownArrow" fillColor="black" scale="1.5" />
                </div>
              </th>
              <th class="tableHeaderCol" @click="sortBy('totalAmount')">
                Total Amount
                <div class="th-sort-arrow">
                  <Icons icon="DropDownArrow" fillColor="black" scale="1.5" />
                </div>
              </th>
              <!-- <th class="tableHeaderCol" style="text-align: right"></th> -->
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="order in filteredOrders"
              :key="order.id"
              class="border-t"
              @click="openDrawer(order)"
            >
              <td class="cell">
                <div>{{ order?.id }}</div>
                <span>{{ formatDate(order?.createdAt) }}</span>
              </td>
              <td class="cell">{{ order?.orderType }}</td>
              <td class="cell">
                <div :class="['status', order.status.toLowerCase()]" style="text-transform: capitalize;">
                  {{ capitalize(order?.status) }}
                </div>
              </td>
              <td class="cell">
                <div>{{ order?.totalAmount }}</div>
                <span>{{ order?.paymentMethod.method }}</span>
              </td>
              <!-- <td class="px-6 py-3" style="text-align: right">
                <button
                  @click.stop="$emit('edit-order', 'edit', order)"
                  class="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  @click.stop="$emit('edit-order', 'delete', order)"
                  class="ml-4 text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td> -->
            </tr>
            <tr v-if="filteredOrders.length === 0">
              <td colspan="6" class="px-6 py-7 text-center text-gray-500">
                No order available
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Drawer
      v-if="isDrawerReady"
      :isOpen="modal.isOpen"
      @close="closeModal"
      :direction="'right'"
      :width="drawerWidth"
      height="100vh"
      :title="'Order Details'"
      background="'#fff'"
    >
      <OrderDetails :order="modal.order" @close="closeModal" />
    </Drawer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import Icons from "~/components/reuse/icons/Icons.vue";
import OrderDetails from "./OrderDetails.vue";
import { useOrder } from "~/stores/order/useOrder";
import Select from "~/components/reuse/ui/Select.vue";
import Input from "~/components/reuse/ui/Input.vue";
import Drawer from "~/components/reuse/ui/Drawer.vue";

const orderStore = useOrder();

const props = defineProps({
  orders: {
    type: Object,
    required: true,
  },
});

const modal = ref({
  isOpen: false,
  order: null,
});
const windowWidth = ref(null);
const searchQuery = ref("");
const selectedStatus = ref("");
const selectedDate = ref(null);

const filteredOrders = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  const status = selectedStatus.value;

  return props.orders.filter((order) => {
    const matchesQuery =
      !query ||
      order.id?.toString().toLowerCase().includes(query) ||
      order.orderType?.toLowerCase().includes(query);

    const matchesStatus =
      !status || order.status?.toLowerCase() === status.toLowerCase();

    return matchesQuery && matchesStatus;
  });
});

const handleStatusChange = (value) => {
  selectedStatus.value = value;
};

const statusOptions = [
  { label: "All", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Ready to Deliver", value: "ready" },
  { label: "Dispatched", value: "dispatched" },
  { label: "Completed", value: "completed" },
  { label: "Canceled", value: "canceled" },
];

const sortOrder = ref("asc");
function sortBy(key) {
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  if (key === "totalAmount") {
    orderStore.orders.sort((a, b) => {
      if (sortOrder.value === "asc") {
        return a.totalAmount - b.totalAmount;
      } else {
        return b.totalAmount - a.totalAmount;
      }
    });
  } else if (key === "createdAt") {
    orderStore.orders.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      if (sortOrder.value === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  } else if (key === "status") {
    orderStore.orders.sort((a, b) => {
      const statusA = a.status.toLowerCase();
      const statusB = b.status.toLowerCase();
      if (sortOrder.value === "asc") {
        return statusA > statusB ? 1 : statusA < statusB ? -1 : 0; // Ascending order
      } else {
        return statusA < statusB ? 1 : statusA > statusB ? -1 : 0; // Descending order
      }
    });
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", "");
}

function openDrawer(order) {
  modal.value.order = order;
  modal.value.isOpen = true;
  orderStore.setSelectedOrderID(order.id);
}

function closeModal() {
  modal.value.isOpen = false;
  modal.value.order = null;
}

function handleResize() {
  windowWidth.value = window.innerWidth;
}

const showSelect = ref(false);
const isDrawerReady = ref(false);
onMounted(() => {
  if (document.getElementById("modal-root")) {
    isDrawerReady.value = true;
  }

  windowWidth.value = window.innerWidth;
  window.addEventListener("resize", handleResize);

  // select cannot open - clashing with v-calendar unless wait for a sec
  setTimeout(() => {
    showSelect.value = true;
  }, 50);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const drawerWidth = computed(() => {
  if (windowWidth.value > 1000) {
    return `${windowWidth.value / 2}px`;
  } else {
    return `${windowWidth.value}px`;
  }
});
</script>

<style scoped>
.table-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  flex-wrap: wrap;
  border: 1px solid var(--gray-1);
  border-bottom: 0px solid var(--gray-1);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background: var(--white-1);
}

.filter-left {
  flex: 1;
  min-width: 200px;
}

.search-input {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input .icon {
  position: absolute;
  left: 10px;
  color: #999;
  font-size: 16px;
}

.search-input input {
  padding: 5px 5px 5px 32px;
  width: 100%;
  border: 1px solid var(--gray-1);
  outline: 1px solid var(--gray-1);
  border-radius: 6px;
  font-size: 14px;
  max-width: 300px;
}

.search-input input:focus {
  border: 1px solid var(--green-1);
  outline: 1px solid var(--green-1) !important;
  outline-offset: 1px;
}

.filter-right {
  display: flex;
  gap: 12px;
  align-items: center;
}

.date-input {
  padding: 5px 10px;
  border: 1px solid var(--gray-2);
  border-radius: 6px;
  font-size: 14px;
}

.filter-section {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 16px 16px 0;
  gap: 12px;
}

.filter-section button {
  border-radius: 0.25rem;
  font-size: var(--font-size-x-small);
  color: var(--black-2);
  border-radius: 30px;
}

.order-details {
  display: flex;
  flex-wrap: wrap;
}

.wrap-table {
  overflow: hidden;
  width: 100%;
  margin-top: 32px;
}

.order-column {
  flex: 1;
  min-width: 300px;
}

.full-width {
  width: 100%;
}

@media (max-width: 900px) {
  .order-details {
    flex-direction: column;
  }
}

.table-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding: 0 20px;
  box-sizing: border-box;
  background: var(--primary-bg-color-1);
}

.table {
  border: 1px solid var(--pale-gray-1) !important;
}

.table tr:nth-child(even) {
  background-color: var(--table-stripe);
}

.cell {
  padding: 12px 24px;
}

.cell span {
  color: #888888;
  font-size: 13px;
}

.status {
  --dot-color: var(--black-1);
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  color: #333;
  background-color: #eee;
}

.status::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 6px;
  background-color: var(--dot-color);
}
.status.completed {
  background-color: #c4eac5;
  --dot-color: #4caf50;
}

.status.pending {
  background-color: #e0e0e0;
  --dot-color: #9e9e9e;
}

.status.processing {
  background-color: #ffe7c2;
  --dot-color: #ff9800;
}

.status.dispatched {
  background-color: #d0e6ff;
  --dot-color: #2196f3; /* blue */
}

.status.delivered {
  background-color: #c4eac5;
  --dot-color: #4caf50; /* same green as completed */
}

.status.canceled {
  background-color: #f0f0f0;
  --dot-color: #9e9e9e; /* same as pending */
}

.date-picker {
  width: 100%;
  font-size: 14px !important;
  padding: 7px 5px 6px 20px;
  border: 1px solid var(--gray-2);
  border-radius: 7px;
  color: var(--black-1) !important;
}

.date-picker:focus {
  outline: 0px solid var(--green-1) !important;
  outline-offset: 0px;
  border: 1px solid var(--green-1) !important;
}

/* th:nth-child(1) { width: 10%; } 
th:nth-child(2) { width: 20%; } 
th:nth-child(3) { width: 15%; }  
th:nth-child(4) { width: 20%; }  
th:nth-child(5) { width: 15%; }  
th:nth-child(6), th:nth-child(7) { width: 10%; text-align: right; }  */
</style>
