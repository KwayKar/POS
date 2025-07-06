<template>
  <div class="container rounded-md overflow-hidden">
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
import { formatCurrency } from "~/utils/formatCurrency";

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

// Sorting Logic
const sortKey = ref(null);
const sortOrder = ref("asc");

const sortedProducts = computed(() => {
  if (!sortKey.value) return soldProducts.value;
  return [...soldProducts.value].sort((a, b) => {
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

</script>

<style scoped>
.container {
  margin-top: 10px;
  margin-bottom: 100px;
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
