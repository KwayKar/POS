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
            <client-only>
              <VDatePicker
                v-model.range="selectedDate"
                mode="range"
                :popover="{ visibility: 'click' }"
              >
                <template #default="{ inputValue, togglePopover }">
                  <input
                    :value="formatRange(inputValue)"
                    @click="togglePopover"
                    readonly
                    placeholder="Select date range"
                    class="date-input"
                  />
                </template>
              </VDatePicker>
            </client-only>
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

          <tbody
            ref="tbodyRef"
            class="table-body"
            :style="{ height: tbodyHeight }"
          >
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
                <div
                  :class="['status', order.status.toLowerCase()]"
                  style="text-transform: capitalize"
                >
                  {{ capitalize(order?.status) }}
                </div>
              </td>
              <td class="cell">
                <div>{{ order?.totalAmount }}</div>
                <span>{{ order?.paymentMethod.method }}</span>
              </td>
            </tr>
            <tr v-if="isLoading" key="loading">
              <td colspan="6" class="px-6 py-7 text-center text-gray-400">
                Loading ...
              </td>
            </tr>
            <tr v-else-if="filteredOrders?.length === 0 && !isLoading" key="no-order">
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
import { useAdmin } from "~/stores/admin/useAdmin";
import { nextTick } from "vue";
import { watch } from "vue";

const orderStore = useOrder();
const adminStore = useAdmin();
const currentSortKey = ref("");

const modal = ref({
  isOpen: false,
  order: null,
});
const windowWidth = ref(null);
const searchQuery = ref("");
const selectedStatus = ref("");
const selectedDate = ref({
  start: null,
  end: null,
});
const page = ref(1);
const hasMore = ref(true);
const isLoading = ref(false);
const sortOrder = ref("asc");

const orders = computed(() => orderStore.getOrderList);
const totalCount = computed(() => orderStore.totalCount);

const filteredOrders = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  const status = selectedStatus.value;

  return orders.value.filter((order) => {
    const matchesQuery =
      !query ||
      order.id?.toString().toLowerCase().includes(query) ||
      order.orderType?.toLowerCase().includes(query);

    const matchesStatus =
      !status || order.status?.toLowerCase() === status.toLowerCase();

    return matchesQuery && matchesStatus;
  });
});

async function fetchOrders({ pageNumber = 1, append = false } = {}) {
  isLoading.value = true;

  // const dateFrom = selectedDate.value.start
  //   ? new Date(selectedDate.value.start).toISOString().slice(0, 19) // '2025-06-25T00:00:00'
  //   : null;

  // const dateTo = selectedDate.value.end
  //   ? new Date(selectedDate.value.end).toISOString().slice(0, 19)
  //   : null;

  function normalizeStartLocal(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function normalizeEndLocal(date) {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return d;
  }

  const rawDate = selectedDate.value;

  const dateFrom = rawDate?.start
    ? normalizeStartLocal(rawDate.start).toISOString()
    : null;

  const dateTo = rawDate?.end
    ? normalizeEndLocal(rawDate.end).toISOString()
    : null;

  const newOrders = await orderStore.fetchFilteredOrders({
    storeId: adminStore.storeId,
    query: searchQuery.value,
    status: selectedStatus.value,
    sort: currentSortKey.value,
    order: sortOrder.value,
    page: pageNumber,
    limit: 10,
    dateFrom,
    dateTo,
  });

  if (!append) {
    page.value = newOrders?.length >= 10 ? 2 : 1;
  } else {
    if (orderStore.orders.length >= totalCount.value || newOrders.length < 10) {
      hasMore.value = false;
    } else {
      page.value += 1;
    }
  }

  isLoading.value = false;
}

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

watch(
  [searchQuery, selectedStatus, selectedDate],
  async () => {
    hasMore.value = true;
    fetchOrders({ pageNumber: 1, append: false });
  },
  { immediate: true }
);

function sortBy(key) {
  currentSortKey.value = key;
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  hasMore.value = true;
  fetchOrders({ pageNumber: 1, append: false });
}

async function loadMoreOrders() {
  if (!hasMore.value || isLoading.value) return;
  fetchOrders({ pageNumber: page.value, append: true });
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

onMounted(async () => {
  if (document.getElementById("modal-root")) {
    isDrawerReady.value = true;
  }

  windowWidth.value = window.innerWidth;
  window.addEventListener("resize", handleResize);

  // select cannot open - clashing with v-calendar unless wait for a sec
  setTimeout(() => {
    showSelect.value = true;
  }, 50);

  const container = document.querySelector(".table-body");
  if (container) {
    container.addEventListener("scroll", handleScroll);
  }

  nextTick(() => {
    updateTbodyHeight();
    window.addEventListener("resize", updateTbodyHeight);
  });
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("resize", updateTbodyHeight);

  const container = document.querySelector(".table-body");
  if (container) {
    container.removeEventListener("scroll", handleScroll);
  }
});

let scrollTimeout = null;
function handleScroll(e) {
  if (scrollTimeout) clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(() => {
    const el = e.target;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
      loadMoreOrders();
    }
  }, 250);
}

// Scrollable tbody height
const tbodyRef = ref(null);
const tbodyHeight = ref("auto");
function updateTbodyHeight() {
  if (!tbodyRef.value) return;
  const offsetTop = tbodyRef.value.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  const desiredHeight = windowHeight - offsetTop - 20; // 20px for bottom padding/margin
  tbodyHeight.value = `${desiredHeight}px`;
}

const drawerWidth = computed(() => {
  if (windowWidth.value > 1250) {
    return `${windowWidth.value / 2}px`;
  } else if (windowWidth.value > 900) {
    return `${windowWidth.value * 0.7}px`;
  } else {
    return `${windowWidth.value}px`;
  }
});

function formatRange(val) {
  if (!val?.start || !val?.end) return "";
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const start = new Date(val.start).toLocaleDateString(undefined, options);
  const end = new Date(val.end).toLocaleDateString(undefined, options);
  return `${start} - ${end}`;
}
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
  height: 36px;
  min-width: 190px;
  padding: 5px 10px;
  border: 1px solid var(--gray-2);
  border-radius: 6px;
  font-size: 14px;
}

.filter-section {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
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
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding: 0 20px 0px;
  box-sizing: border-box;
  background: var(--primary-bg-color-1);
}

.table {
  border: 1px solid var(--pale-gray-1) !important;
}

.table tbody {
  overflow-y: auto;
  width: 100%;
  display: block;
  background: var(--white-1);
}

.table tr {
  display: table;
  width: 100%;
  table-layout: fixed;
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
