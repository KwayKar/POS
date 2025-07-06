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
        class="flex flex-col w-full"
        :style="{ width: '100%', margin: '0 32px' }"
      >
        <div class="filter-section">
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
          <CategoryBtn
            @click="activeSection = 'shops'"
            :active="activeSection === 'shops'"
          >
            Shops
          </CategoryBtn>
        </div>

        <div>
          <OrderedProductReport v-if="activeSection === 'products'" />
          <OrderReport v-else-if="activeSection === 'orders'" />
          <ShopsRevenueReport v-else-if="activeSection === 'shops'" />
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
import ShopsRevenueReport from "~/components/dashboard/reports/ShopsRevenueReport.vue";
import OrderReport from "~/components/dashboard/reports/OrderReport.vue";
import { useAnalyticsStore } from "~/stores/report/useReport";
import { useAdmin } from "~/stores/admin/useAdmin";

const activeSection = ref("");
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

const adminStore = useAdmin();
const storeId = adminStore.storeId;
const orgId = '6542372f-749f-4dc9-95d4-d1078035c50e'
const start = '2025-06-01'
const end = '2025-06-30'

const analytics = useAnalyticsStore();


// Run once on client mount
onMounted(async () => {
  await analytics.fetchRevenueReport(storeId, '2025-06-01', '2025-08-22');
  await analytics.fetchOrdersReport(storeId, '2025-06-01', '2025-08-22');
  const revenueByStore = await analytics.fetchStoreRevenue(storeId, start, end)
  const totalSalesByStore = await analytics.fetchTotalSales(storeId, start, end)
  await analytics.fetchTopProducts(storeId, start, end, 5)
  await analytics.fetchOrganizationRevenue(orgId, start, end)
  activeSection.value = 'products'
})
</script>

<style scoped>
.filter-section {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}
.dashboard {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 22px;
  justify-content: center;
}
.chart-container {
  width: 100%;
  gap: 32px;
}
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
