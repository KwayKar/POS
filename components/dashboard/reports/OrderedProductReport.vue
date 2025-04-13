<template>
  <div class="container rounded-md overflow-hidden">
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
            <div class="th-sort-arrow">
              <Icons icon="DropDownArrow" fillColor="black" scale="1.5" />
            </div>
          </th>
          <th class="tableHeaderCol" @click="sortBy('quantitySold')">
            Quantity Sold
            <div class="th-sort-arrow">
              <Icons icon="DropDownArrow" fillColor="black" scale="1.5" />
            </div>
          </th>
          <th class="tableHeaderCol" @click="sortBy('totalSales')">
            Total Sales (USD)
            <div class="th-sort-arrow">
              <Icons icon="DropDownArrow" fillColor="black" scale="1.5" />
            </div>
          </th>
          <th class="tableHeaderCol" @click="sortBy('dateSold')">
            Date Sold
            <div class="th-sort-arrow">
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
          <td class="px-6 py-3">{{ product.name }}</td>
          <td class="px-6 py-3">{{ product.quantitySold }}</td>
          <td class="px-6 py-3">{{ formatCurrency(product.totalSales) }}</td>
          <td class="px-6 py-3">{{ product.dateSold }}</td>
        </tr>
        <tr v-if="sortedProducts.length === 0">
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

const soldProducts = ref([
  {
    id: 1,
    name: "Product A",
    quantitySold: 50,
    totalSales: 500,
    dateSold: "2025-03-10",
  },
  {
    id: 2,
    name: "Product B",
    quantitySold: 30,
    totalSales: 300,
    dateSold: "2025-03-12",
  },
  {
    id: 3,
    name: "Product C",
    quantitySold: 20,
    totalSales: 200,
    dateSold: "2025-03-15",
  },
  {
    id: 4,
    name: "Product D",
    quantitySold: 10,
    totalSales: 100,
    dateSold: "2025-03-18",
  },
]);

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value
  );

// Sorting Logic
const sortKey = ref(null);
const sortOrder = ref("asc");

const sortedProducts = computed(() => {
  if (!sortKey.value) return filteredProducts.value;
  return [...filteredProducts.value].sort((a, b) => {
    let modifier = sortOrder.value === "asc" ? 1 : -1;
    return a[sortKey.value] > b[sortKey.value] ? modifier : -modifier;
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
const filteredProducts = ref([...soldProducts.value]);

const fetchFilteredProducts = (query) => {
  loading.value = true;
  setTimeout(() => {
    // Simulate API delay
    filteredProducts.value = soldProducts.value.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.id.toString().includes(query)
    );
    loading.value = false;
  }, 500); 
};

let debounceTimeout;
watch(searchQuery, (newVal) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    fetchFilteredProducts(newVal);
  }, 300); 
});

const exportCSV = () => {
  console.log("Exporting...");
};
</script>

<style scoped>
.container {
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
}
</style>
