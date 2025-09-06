<template>
  <div v-cloak class="dashboard">
    <NavPanel
      class="navPanel fixed top-0 left-0 lg:left-[100px] w-full lg:w-[calc(100%-100px)] h-16"
      style="z-index: 99"
    >
      <component :is="currentNavComponent" />
      <Button style="border: 1px solid var(--black-1)">Download Report</Button>
    </NavPanel>

    <DashboardLayout>
      <div
        class="custom-container"
        :style="`height: ${height - 64}px`"
      >
        <div class="report-filter-section">
          <CategoryBtn
            @click="activeSection = 'products'"
            :active="activeSection === 'products'"
          >
            Top Products
          </CategoryBtn>
          <CategoryBtn
            @click="activeSection = 'orders'"
            :active="activeSection === 'orders'"
          >
            Orders
          </CategoryBtn>
        </div>

        <div>
          <OrderedProductReport v-if="activeSection === 'products'" />
          <OrderReport v-else-if="activeSection === 'orders'" />
          <!-- <ShopsRevenueReport v-else-if="activeSection === 'shops'" /> -->
        </div>
      </div>
    </DashboardLayout>
  </div>
</template>

<script setup>
import NavPanel from "~/components/dashboard/panels/NavPanel.vue";
import OrderedProductReport from "~/components/dashboard/reports/OrderedProductReport.vue";
import DashboardLayout from "~/layouts/DashboardLayout.vue";
import Button from "~/components/reuse/ui/Button.vue";
import CategoryBtn from "~/components/reuse/ui/CategoryBtn.vue";
// import ShopsRevenueReport from "~/components/dashboard/reports/ShopsRevenueReport.vue";
import OrderReport from "~/components/dashboard/reports/OrderReport.vue";
import { useAnalyticsStore } from "~/stores/report/useReport";
import { useAdmin } from "~/stores/admin/useAdmin";
import { useWindowSize } from "~/composables/useWindowSize";

const activeSection = ref("");
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

const adminStore = useAdmin();
const storeId = adminStore.storeId;
const orgId = adminStore.estId;
const startStr = ref(null);
const endStr = ref(null);

const { height } = useWindowSize();

const endDate = new Date();
const startDate = new Date();
startDate.setMonth(startDate.getMonth() - 3); // past 4 months

startStr.value = startDate.toISOString().split("T")[0];
endStr.value = endDate.toISOString().split("T")[0];

const analytics = useAnalyticsStore();

// Run once on client mount
onMounted(async () => {
  await analytics.fetchRevenueReport(storeId, startStr.value, endStr.value);
  await analytics.fetchOrdersReport(storeId, startStr.value, endStr.value);
  
  await analytics.fetchStoreRevenue(storeId, startStr.value, endStr.value)
  await analytics.fetchTotalSales(storeId, startStr.value, endStr.value)
  
  await analytics.fetchTopProducts({storeId, startDate: startStr.value, endDate: endStr.value, limit: 5})
  await analytics.fetchOrganizationRevenue(orgId, startStr.value, endStr.value)
  activeSection.value = 'products'
})
</script>

<style scoped>
.custom-container {
  width: 100%;
  margin: 0 32px;
  flex: 1;
  flex-direction: column; 
  overflow: hidden;
}
@media screen and (max-width: 600px) {
  .custom-container {
    margin: 0 16px;
  }
}

.report-filter-section {
  display: flex;
  align-items: center;
  margin: 1rem 0;
}

.dashboard {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 6px;
  justify-content: center;
}
@media screen and (max-width: 850px) {
  .dashboard {
    min-width: 900px;
    overflow-x: auto;
  }
}

</style>
