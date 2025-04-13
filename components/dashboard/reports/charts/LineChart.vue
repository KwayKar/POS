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

const selectedCategory = ref("2-weeks");

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
  const dataByCategory = {
    "2-weeks": [
      120, 140, 160, 180, 200, 150, 170, 130, 110, 115, 125, 145, 155, 165,
    ],
    "1-month": Array.from({ length: 30 }, () =>
      Math.floor(100 + Math.random() * 300)
    ),
  };

  const labelsByCategory = {
    "2-weeks": Array.from({ length: 14 }, (_, i) => `Day ${i + 1}`),
    "1-month": [
      "Day 1",
      "Day 5",
      "Day 10",
      "Day 15",
      "Day 20",
      "Day 25",
      "Day 30",
    ],
  };

  const selectedData = selectedCategory.value;

  return {
    labels: labelsByCategory[selectedData],
    datasets: [
      {
        label: "Sales (USD)",
        data: dataByCategory[selectedData],
        borderColor: "#68a182",
        backgroundColor: "rgba(104, 161, 130, 0.2)",
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: "#68a182",
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
