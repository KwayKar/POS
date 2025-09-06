<template>
  <div class="chart-wrapper">
    <Tabs :tabs="['Orders', 'Revenue']">
      <template #Orders>
        <LineChart
          :title="'Orders Comparison'"
        />
      </template>

      <template #Revenue>
        <BarChart
          :title="'Revenue Comparison'"
        />
      </template>
    </Tabs>
  </div>
</template>

<script setup>
import Tabs from "~/components/reuse/ui/Tabs.vue";
import BarChart from "./charts/BarChart.vue";
import LineChart from "./charts/LineChart.vue";
import { watch } from "vue";
import { useAnalyticsStore } from "~/stores/report/useReport";
import { useAdmin } from "~/stores/admin/useAdmin";

const analyticsStore = useAnalyticsStore();
const adminStore = useAdmin();

const fetchReports = async () => {
  const [start, end] = analyticsStore.selectedDate || [];
  if (!start || !end) return;

  const startStr = new Date(start).toISOString().split("T")[0];
  const endStr = new Date(end).toISOString().split("T")[0];

  await analyticsStore.fetchRevenueReport(adminStore.storeId, startStr, endStr);
  await analyticsStore.fetchOrdersReport(adminStore.storeId, startStr, endStr);
};

// Refetch if selectedDate changes
watch(
  () => analyticsStore.selectedDate,
  fetchReports,
  { deep: true }
);
</script>

<style scoped>
.chart-wrapper {
  background: #f4f5ee;
  width: 100%;
  height: auto;
  padding: 14px;
  box-sizing: border-box;
  border-radius: 15px;
  border: 1px solid #a4a4a2;
}
</style>
