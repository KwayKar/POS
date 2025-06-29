<template>
  <div class="layout-container rounded-md overflow-hidden">
    <div class="flex justify-between items-center mb-4">
      <!-- Search Input -->
      <div class="input-wrapper">
        <div class="search-icon">
          <SearchIcon />
        </div>
        <Input
          v-model="searchQuery"
          type="text"
          placeholder="Search by ID or Product Name"
          style="height: 36px; font-size: 0.95rem; padding-left: 34px"
        />
      </div>

      <!-- Export Button -->
      <div>
        <Button
          @click="$emit('filter-order', '')"
          style="
            background: var(--primary-btn-color);
            color: var(--white-1);
            border-radius: 4px;
          "
          class="rounded mr-1"
        >
          Export
        </Button>
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
      <tbody>
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
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Icons from "~/components/reuse/icons/Icons.vue";
import SearchIcon from "~/components/reuse/icons/SearchIcon.vue";
import Button from "~/components/reuse/ui/Button.vue";
import Input from "~/components/reuse/ui/Input.vue";
import { useAnalyticsStore } from "~/stores/report/useReport";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value
  );

// Sorting Logic
const sortKey = ref(null);
const sortOrder = ref("asc");
const analytics = useAnalyticsStore();
// const topProducts = analytics.topProducts;
const topProducts = computed(() => analytics.topProducts ?? []);

const sortedProducts = computed(() => {
  if (!sortKey.value) return filteredProducts.value; // Use .value for computed refs
  return [...filteredProducts.value].sort((a, b) => { // Use .value for computed refs
    let modifier = sortOrder.value === "asc" ? 1 : -1;
    // Ensure that a[sortKey.value] and b[sortKey.value] exist and are comparable
    // Add type checks or default values if they might be undefined
    const valA = a[sortKey.value];
    const valB = b[sortKey.value];

    if (valA === valB) return 0;
    if (valA === null || valA === undefined) return modifier * -1; // Nulls last for asc
    if (valB === null || valB === undefined) return modifier * 1;  // Nulls last for asc

    if (typeof valA === 'string' && typeof valB === 'string') {
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
const filteredProducts = 
computed(() =>
  topProducts.value
);

const fetchFilteredProducts = (query) => {
  // loading.value = true;
  // setTimeout(() => {
  //   // Simulate API delay
    filteredProducts.value = soldProducts.value.filter((product) =>
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

const exportCSV = () => {
  // console.log("Exporting...");
};

onMounted(async () => {
  const storeId = "a847ae5e-092d-4e67-951d-75ece890ffaa";
  const orgId = "6542372f-749f-4dc9-95d4-d1078035c50e";
  const start = "2025-06-01";
  const end = "2025-06-22";
  
try {
    await analytics.fetchTopProducts(storeId, start, end, 5);
  } catch (error) {
    // console.error("Failed to fetch top products:", error);
  }});
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

tbody tr,
tbody td {
  background: var(--white-1);
  cursor: default;
}
</style>
