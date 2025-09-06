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
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

defineProps({
  title: {
    type: String,
    default: "Trends",
  },
});
const analyticsStore = useAnalyticsStore();

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
  const [start, end] = analyticsStore.selectedDate || [];
  if (!start || !end) return { labels: [], datasets: [] };

  const startDate = new Date(start);
  const endDate = new Date(end);

  // Filter by selected date range
  const filtered = report.filter((entry) => {
    const entryDate = new Date(entry.month);
    return entryDate >= startDate && entryDate <= endDate;
  });

  const sorted = filtered.sort((a, b) => new Date(a.month) - new Date(b.month));

  const labels = sorted.map((entry) =>
    new Date(entry.month).toLocaleString("default", { month: "short", year: "numeric" })
  );
  const revenues = sorted.map((entry) => entry.totalOrders);

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
