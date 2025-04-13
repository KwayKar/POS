<template>
  <div class="chart-container">
    <div class="header">
      <h2 class="flex text-xl font-semibold mb-4">{{ title }}</h2>
      <div class="wrap-select-box">
        <Select v-model="selectedCategory" :options="categories" />
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
    "1-month": Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
  };

  const selectedData = selectedCategory.value;

  return {
    labels: labelsByCategory[selectedData],
    datasets: [
      {
        label: "Sales (USD)",
        backgroundColor: "#68a182",
        data: dataByCategory[selectedData],
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
.wrap-select-box {
}
</style>
