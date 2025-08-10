<template>
  <div class="layout-container rounded-md">
    <div class="table-filters">
      <div class="filter-left">
        <div class="search-input">
          <span class="icon">🔍</span>
          <Input
            type="text"
            v-model="searchQuery"
            placeholder="Search orders..."
            style="height: 34px; border: 0.5px solid #232323"
          />
        </div>
      </div>

      <div class="filter-right">
        <!-- Status Filter -->
        <Select
          v-if="showSelect"
          v-model="selectedStore"
          :options="storeOptions"
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
                :value="formatDateRange(inputValue)"
                @click="togglePopover"
                readonly
                placeholder="Select Date Range"
                class="date-input"
              />
            </template>
          </VDatePicker>
        </client-only>
      </div>
    </div>

    <table class="table">
      <thead class="tableHeader bg-gray-100">
        <tr>
          <th class="tableHeaderCol" @click="sortBy('name')">
            Product
            <div
              class="th-sort-arrow"
              :style="{
                transform: sortOrder === 'desc' ? 'rotate(180deg)' : '',
              }"
            >
              <Icons icon="DropDownArrow" fillColor="black" scale="1.5" />
            </div>
          </th>
          <th class="tableHeaderCol" @click="sortBy('quantitySold')">
            Quantity Sold
            <div
              class="th-sort-arrow"
              :style="{
                transform: sortOrder === 'desc' ? 'rotate(180deg)' : '',
              }"
            >
              <Icons icon="DropDownArrow" fillColor="black" scale="1.5" />
            </div>
          </th>
          <th class="tableHeaderCol" @click="sortBy('totalSales')">
            Product Revenue
            <div
              class="th-sort-arrow"
              :style="{
                transform: sortOrder === 'desc' ? 'rotate(180deg)' : '',
              }"
            >
              <Icons icon="DropDownArrow" fillColor="black" scale="1.5" />
            </div>
          </th>
          <th class="tableHeaderCol" @click="sortBy('dateSold')">
            % of Total Sales
            <div
              class="th-sort-arrow"
              :style="{
                transform: sortOrder === 'desc' ? 'rotate(180deg)' : '',
              }"
            >
              <Icons icon="DropDownArrow" fillColor="black" scale="1.5" />
            </div>
          </th>
        </tr>
      </thead>
      
      <tbody ref="tbodyRef" class="table-body" :style="{ height: tbodyHeight }">
        <template v-if="!isLoading">
          <tr
            v-for="product in sortedProducts"
            :key="product.id"
            class="border-t hover:bg-gray-50"
            :class="{ 'opacity-50 pointer-events-none': loading }"
          >
            <td class="px-6 py-3">{{ product.title }}</td>
            <td class="px-6 py-3">{{ product?.unitsSold }}</td>
            <td class="px-6 py-3">{{ formatCurrency(product?.revenue) }}</td>
            <td class="px-6 py-3">{{ product?.percentageOfTotalSales }}%</td>
          </tr>
          <tr v-if="topProducts.length === 0">
            <td colspan="4" class="px-6 py-3 text-center text-gray-500">
              No products sold this month.
            </td>
          </tr>
          <tr v-if="isLoading" key="loading">
            <td colspan="4" class="px-6 py-7 text-center text-gray-400">
              Loading ...
            </td>
          </tr>
          <tr
            v-else-if="filteredOrders?.length === 0 && !isLoading"
            key="no-order"
          >
            <td colspan="4" class="px-6 py-7 text-center text-gray-500">
              No reports available
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Icons from "~/components/reuse/icons/Icons.vue";
import Input from "~/components/reuse/ui/Input.vue";
import Select from "~/components/reuse/ui/Select.vue";
import { useAdmin } from "~/stores/admin/useAdmin";
import { useAnalyticsStore } from "~/stores/report/useReport";
import { formatCurrency } from "~/utils/formatCurrency";
import { formatDateRange } from "~/utils/formatDateRange";

const adminStore = useAdmin();
const storeId = adminStore.storeId;

// Sorting Logic
const sortKey = ref(null);
const sortOrder = ref("asc");
const selectedDate = ref({
  start: null,
  end: null,
});
const showSelect = ref(false);
const selectedStore = ref("");

const storeOptions = [
  { label: "All", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Ready to Deliver", value: "ready" },
  { label: "Dispatched", value: "dispatched" },
  { label: "Completed", value: "completed" },
  { label: "Canceled", value: "canceled" },
];

const analytics = useAnalyticsStore();
const isLoading = analytics.loading;
// const topProducts = analytics.topProducts;
const topProducts = computed(() => analytics.topProducts ?? []);

const sortedProducts = computed(() => {
  if (!sortKey.value) return filteredProducts.value; // Use .value for computed refs
  return [...filteredProducts.value].sort((a, b) => {
    // Use .value for computed refs
    let modifier = sortOrder.value === "asc" ? 1 : -1;
    // Ensure that a[sortKey.value] and b[sortKey.value] exist and are comparable
    // Add type checks or default values if they might be undefined
    const valA = a[sortKey.value];
    const valB = b[sortKey.value];

    if (valA === valB) return 0;
    if (valA === null || valA === undefined) return modifier * -1; // Nulls last for asc
    if (valB === null || valB === undefined) return modifier * 1; // Nulls last for asc

    if (typeof valA === "string" && typeof valB === "string") {
      return valA.localeCompare(valB) * modifier;
    }

    return (valA > valB ? 1 : -1) * modifier;
  });
});

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortOrder.value = "asc";
  }
};

// Searching by input
const searchQuery = ref("");
const loading = ref(false);
const filteredProducts = computed(() => topProducts.value);

const fetchFilteredProducts = (query) => {
  // loading.value = true;
  // setTimeout(() => {
  //   // Simulate API delay
  filteredProducts.value = soldProducts.value.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.id.toString().includes(query)
  );
  //   loading.value = false;
  // }, 500);
};

let debounceTimeout;
watch(searchQuery, (newVal) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    fetchFilteredProducts(newVal);
  }, 300);
});

// Filtering
const handleStoreChange = (value) => {
  selectedStore.value = value;
};

onMounted(async () => {
  const start = "2025-06-01";
  const end = "2025-08-22";

  try {
    // select cannot open - clashing with v-calendar unless wait for a sec
    setTimeout(() => {
      showSelect.value = true;
    }, 50);

    await analytics.fetchTopProducts(storeId, start, end, 5);

    const container = document.querySelector(".table-body");
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    nextTick(() => {
      updateTbodyHeight();
      window.addEventListener("resize", updateTbodyHeight);
    });
  } catch (error) {
    // console.error("Failed to fetch top products:", error);
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
  const desiredHeight = windowHeight - offsetTop; // 20px for bottom padding/margin
  tbodyHeight.value = `${desiredHeight}px`;
}

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("resize", updateTbodyHeight);

  const container = document.querySelector(".table-body");
  if (container) {
    container.removeEventListener("scroll", handleScroll);
  }
});
</script>

<style scoped>
.layout-container {
  margin-top: 10px;
  margin-bottom: 100px;
}

.input-wrapper {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 11px;
}

.report-summary {
  margin-bottom: 32px;
  background: var(--white-1);
  border-radius: 12px;
}

.table-style {
  background: var(--white-1);
  border: 1px solid var(--gray-1);
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

</style>
