<template>
  <div class="chart-container">
    <h2 class="text-xl font-semibold mb-4">Category Sales Distribution</h2>
    <PieChart :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { PieChart } from "vue-chart-3";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, PieController);

const chartData = ref({
  labels: ["Beverages", "Snacks", "Main Course", "Desserts"],
  datasets: [
    {
      label: "Sales",
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
      data: [300, 500, 200, 400],
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 400px;
  height: auto;
  padding: 32px;
  margin: 0 auto;
}
</style>
