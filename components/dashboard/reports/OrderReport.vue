<template>
  <div class="chart-wrapper">
    <Tabs :tabs="['Orders', 'Revenue']">
      <template #Orders>
        <LineChart
          :chart-data="chartData"
          :title="'Orders Comparison'"
          :chart-options="chartOptions"
        />
      </template>

      <template #Revenue>
        <BarChart
          :chart-data="chartData"
          :title="'Revenue Comparison'"
          :chart-options="chartOptions"
        />
      </template>
    </Tabs>
  </div>
</template>

<script setup>
import Tabs from "~/components/reuse/ui/Tabs.vue";
import BarChart from "./charts/BarChart.vue";
import LineChart from "./charts/LineChart.vue";
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
