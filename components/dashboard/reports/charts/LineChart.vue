<template>
  <div class="chart-container">
    <div class="header">
      <h2 class="flex text-xl font-semibold mb-4">{{ title }}</h2>
      <div class="wrap-select-box">
        <Select v-model="selectedCategory" :options="categories" />
      </div>
    </div>
    <LineChart :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
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
import Select from "~/components/reuse/ui/Select.vue";
import { useAnalyticsStore } from "~/stores/report/useReport";

defineProps({
  title: {
    type: String,
    default: "Trends",
  },
});

const categories = [
  { label: "Past 2 Weeks", value: "2-weeks" },
  { label: "Past Month", value: "1-month" },
];

const selectedCategory = ref(["2025-06", "2025-07", "2025-08"]);
// ref("2-weeks");

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
  const analyticsStore = useAnalyticsStore();
const report = analyticsStore.ordersReport || [];

const selectedPeriods = selectedCategory.value; // e.g. ['2025-06-01']
const isDaily = selectedPeriods.length && selectedPeriods[0].length === 10;

const filtered = report.filter((entry) => {
  const rawPeriod = entry.period || entry.date || entry.month; // flexible
  const period = rawPeriod?.slice(0, isDaily ? 10 : 7);
  return selectedPeriods.includes(period);
});

const labels = filtered.map((entry) =>
  new Date(entry.period).toLocaleString("default", {
    ...(isDaily
      ? { day: "numeric", month: "short" }
      : { month: "short", year: "numeric" }),
  })
);

const revenues = filtered.map((entry) => entry.revenue);


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
