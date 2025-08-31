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
import { useAdmin } from "~/stores/admin/useAdmin";

defineProps({
  title: {
    type: String,
    default: "Trends",
  },
});
const analyticsStore = useAnalyticsStore();
const adminStore = useAdmin();

const storeId = adminStore.storeId;

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
  const sortedMonths = months.sort(
    (a, b) => new Date(a.month) - new Date(b.month)
  );
  const last4Months = sortedMonths.slice(-4);

  const labels = last4Months.map((entry) =>
    new Date(entry.month).toLocaleString("default", {
      month: "short",
      year: "numeric",
    })
  );

  const revenues = months.map((entry) => entry.revenue);

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

watch(
  () => analyticsStore.selectedDate,
  async ([start, end]) => {
    if (!start || !end) return;

    const startDate = new Date(start);
    const endDate = new Date(end);

    const startStr = startDate.toISOString().split("T")[0];
    const endStr = endDate.toISOString().split("T")[0];
    console.log("Fetched revenue:", startStr); 

    analyticsStore.setDateRange(startDate, endDate);

    await analyticsStore.fetchRevenueReport(storeId, startStr, endStr);
  },
  { deep: true } 
);


onMounted(async () => {
  const [start, end] = analyticsStore.selectedDate || [];
  if (!start || !end) return;

  const startStr = new Date(start).toISOString().split("T")[0];
  const endStr = new Date(end).toISOString().split("T")[0];

  // Set the date range in store
  analyticsStore.setDateRange(new Date(start), new Date(end));

  // Fetch chart-specific data
  if (ChartType === "bar") {
    await analyticsStore.fetchRevenueReport(storeId, startStr, endStr);
  } else {
    await analyticsStore.fetchOrdersReport(storeId, startStr, endStr);
  }
});
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
