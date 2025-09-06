<template>
  <div class="layout-container rounded-md">
    <div class="table-filters">
      <div class="filter-left">
        <div class="search-input">
          <span class="icon">🔍</span>
          <Input
            type="text"
            v-model="searchQuery"
            placeholder="Search items..."
            style="height: 34px; border: 0.5px solid #232323"
          />
        </div>
      </div>

      <div class="filter-right">
        <!-- Status Filter -->
        <div>
          <Select
            v-if="showSelect"
            v-model="selectedStore"
            :options="storeList"
            @update:modelValue="handleStoreChange"
            style="
              padding: 0 14px;
              height: 38px;
              font-size: 14px;
              width: 200px;
              border: 1px solid var(--gray-2);
            "
          />
        </div>

        <client-only>
          <VueDatePicker
            v-model="selectedDate"
            range
            :clear-button="false"
            :auto-apply="true"
            :format="'yyyy-MM-dd'"
            placeholder="Select Date Range"
            class="datepicker-wrapper"
            input-class="datepicker-input"
          />
        </client-only>
      </div>
    </div>

    <table class="table">
      <thead class="tableHeader bg-gray-100">
        <tr>
          <th class="tableHeaderCol" @click="sortBy('title')">
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
          <th class="tableHeaderCol" @click="sortBy('unitsSold')">
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
          <th class="tableHeaderCol" @click="sortBy('revenue')">
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
          <th class="tableHeaderCol" @click="sortBy('percentageOfTotalSales')">
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
          <tr v-if="topProducts.length === 0 && !isLoading">
            <td colspan="4" class="px-6 py-3 text-center text-gray-500">
              No products to show.
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
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const adminStore = useAdmin();
const storeId = adminStore.storeId;

// Sorting Logic
const sortKey = ref(null);
const sortOrder = ref("asc");
const selectedDate = ref([null, null]);
const showSelect = ref(false);
const selectedStore = ref("");
const filteredProducts = ref([]);
const startStr = ref(null);
const endStr = ref(null);
const limit = 35;

const statusOptions = [
  { label: "All", value: "" },
  { label: "Delivery", value: "delivery" },
  { label: "Takeaway", value: "takeaway" },
  { label: "Eatin", value: "eatin" },
];

const analytics = useAnalyticsStore();
const isLoading = analytics.loading;
// const topProducts = analytics.topProducts;
const topProducts = computed(() => analytics.topProducts ?? []);
const storeList = computed(() =>
  (analytics.storeList ?? []).map((store) => ({
    label: store.name,
    value: store.id,
  }))
);

const sortedProducts = computed(() => {
  const list = [...filteredProducts.value]; // make a copy
  if (!sortKey.value) return list;

  const modifier = sortOrder.value === "asc" ? 1 : -1;
  return list.sort((a, b) => {
    const valA = a[sortKey.value];
    const valB = b[sortKey.value];

    if (valA === valB) return 0;
    if (valA == null) return -modifier;
    if (valB == null) return modifier;

    if (typeof valA === "string") return valA.localeCompare(valB) * modifier;
    return (valA > valB ? 1 : -1) * modifier;
  });
});

watch(
  () => topProducts.value,
  (newProducts) => {
    filteredProducts.value = [...newProducts];
  },
  { immediate: true }
);

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

const fetchFilteredProducts = async (query) => {
  try {
    const data = await analytics.fetchTopProducts({
      storeId,
      startDate: startStr.value,
      endDate: endStr.value,
      limit,
      search: query.toLowerCase(),
    });
    filteredProducts.value = data.topProducts;
  } catch (error) {}
};

let debounceTimeout;
watch(searchQuery, (newVal) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    if (startStr.value && endStr.value) {
      fetchFilteredProducts(newVal);
    }
  }, 300);
});

watch(selectedDate, async ([start, end]) => {
  if (!start || !end) return;

  // Format dates as strings if your API expects that
  startStr.value = start.toISOString().split("T")[0];
  endStr.value = end.toISOString().split("T")[0];

  try {
    await analytics.fetchTopProducts({
      storeId,
      startDate: startStr.value,
      endDate: endStr.value,
      limit,
    });
  } catch (error) {
    // console.error(error);
  }
});

// Filtering
const handleStoreChange = async (value) => {
  selectedStore.value = value;
  try {
    await analytics.fetchTopProducts({
      storeId: value,
      startDate: startStr.value,
      endDate: endStr.value,
      limit,
    });
  } catch (error) {
    // console.error(error);
  }
};

onMounted(async () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 2); // past 4 months
  selectedDate.value = [startDate, endDate];

  startStr.value = startDate.toISOString().split("T")[0];
  endStr.value = endDate.toISOString().split("T")[0];

  try {
    // select cannot open - clashing with v-calendar unless wait for a sec
    setTimeout(() => {
      showSelect.value = true;
    }, 50);

    await analytics.fetchTopProducts({
      storeId,
      startDate: startStr.value,
      endDate: endStr.value,
      limit,
    });

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

function handleResize() {
  windowWidth.value = window.innerWidth;
};

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

.datepicker-wrapper {
  width: 260px;
}

.datepicker-input {
  padding: 0 12px;
  font-size: 14px;
  box-sizing: border-box;
}

.datepicker-wrapper >>> input {
  border-radius: 6px;
  border: 1px solid var(--gray-2);
}
</style>
