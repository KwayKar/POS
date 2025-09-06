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
    <BarChart :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { BarChart } from "vue-chart-3";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  BarController,
} from "chart.js";
import { useAnalyticsStore } from "~/stores/report/useReport";
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
  BarElement,
  CategoryScale,
  LinearScale,
  BarController
);

const windowWidth = ref(window.innerWidth);
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const barThickness = computed(() => {
  if (windowWidth.value > 1200) {
    return 50;
  } else if (windowWidth.value > 768) {
    return 30;
  } else {
    return 20;
  }
});

const chartData = computed(() => {
  const months = toRaw(analyticsStore.revenueReport) || [];
  const [start, end] = analyticsStore.selectedDate || [];
  if (!start || !end) return { labels: [], datasets: [] };

  const startDate = new Date(start);
  const endDate = new Date(end);

  // Filter by selected date range
  const filtered = months.filter((entry) => {
    const entryDate = new Date(entry.month);
    return entryDate >= startDate && entryDate <= endDate;
  });

  const sorted = filtered.sort((a, b) => new Date(a.month) - new Date(b.month));

  const labels = sorted.map((entry) =>
    new Date(entry.month).toLocaleString("default", { month: "short", year: "numeric" })
  );
  const revenues = sorted.map((entry) => entry.revenue);

  return {
    labels,
    datasets: [
      {
        label: "Sales (USD)",
        backgroundColor: "#68a182",
        data: revenues,
        barThickness: barThickness.value,
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
      categoryPercentage: 0.6,
      barPercentage: 0.8,
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
