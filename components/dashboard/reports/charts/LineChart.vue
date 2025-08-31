<template>
  <div class="chart-container">
    <div class="header">
      <h2 class="flex text-xl font-semibold mb-4">{{ title }}</h2>
      <div class="wrap-select-box">
         <client-only>
          <VueDatePicker
            v-model="analyticsStore.selectedDate"
            range
            :clear-button="false"
            :auto-apply="true"
            format="yyyy-MM-dd"
            placeholder="Select Date Range"
          />
        </client-only>
      </div>
    </div>
    <LineChart :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { LineChart } from "vue-chart-3";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  LineController,
} from "chart.js";
import { useAnalyticsStore } from "~/stores/report/useReport";
import "@vuepic/vue-datepicker/dist/main.css";
import { useAdmin } from "~/stores/admin/useAdmin";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

defineProps({
  title: {
    type: String,
    default: "Trends",
  },
});
const analyticsStore = useAnalyticsStore();
const adminStore = useAdmin();

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  LineController
);

const chartData = computed(() => {
  const report = analyticsStore.ordersReport || [];

  const sorted = [...report].sort(
    (a, b) => new Date(a.month) - new Date(b.month)
  );
  const last4 = sorted.slice(-4);

  const labels = last4.map((e) =>
    new Date(e.month).toLocaleString("default", {
      month: "short",
      year: "numeric",
    })
  );
  const revenues = last4.map((e) => e.totalOrders);

  return {
    labels,
    datasets: [
      {
        label: "Sales (USD)",
        backgroundColor: "#68a182",
        borderColor: "#68a182",
        tension: 0.3,
        fill: false,
        data: revenues,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: {
        maxTicksLimit: 7,
      },
    },
    y: {
      beginAtZero: true,
    },
  },
};

watch(
  () => analyticsStore.selectedDate,
  async ([start, end]) => {
    if (!start || !end) return;

    const startDate = new Date(start);
    const endDate = new Date(end);

    const startStr = startDate.toISOString().split("T")[0];
    const endStr = endDate.toISOString().split("T")[0];

    analyticsStore.setDateRange(startDate, endDate);

    await analyticsStore.fetchOrdersReport(adminStore.storeId, startStr, endStr);
  },
  { deep: true } 
);
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: auto;
  padding: 32px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
</style>
