import { defineStore } from "pinia";
import { useRuntimeConfig } from "nuxt/app";
import { apiFetch } from "~/utils/apiFetch";

export const useAnalyticsStore = defineStore("analytics", {
  state: () => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 4); // 4 months ago

    let savedDate = null;
    if (process.client) {
      const raw = localStorage.getItem("selectedDate");
      if (raw) {
        try {
          savedDate = JSON.parse(raw);
        } catch (e) {
          console.error("Failed to parse saved date:", e);
        }
      }
    }

    return {
      selectedDate: savedDate || [startDate, endDate],
      revenue: null,
      totalSales: null,
      storeList: [],
      topProducts: [],
      orgRevenue: [],
      revenueReport: [],
      ordersReport: [],
      loading: false,
      error: null,
      dateRange: {
        start: startDate,
        end: endDate,
      },
    };
  },
  actions: {
    setDateRange(start, end) {
      this.dateRange.start = start;
      this.dateRange.end = end;
    },

    async fetchRevenueReport(storeId, start, end) {
      const config = useRuntimeConfig();
      this.loading = true;
      this.error = null;
      try {
        const response = await apiFetch(
          `${config.public.apiBaseUrl}/analytics/stores/${storeId}/revenue/monthly?start=${start}&end=${end}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        this.revenueReport = response.monthlyRevenue;
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },

    async fetchOrdersReport(storeId, start, end) {
      const config = useRuntimeConfig();
      this.loading = true;
      this.error = null;
      try {
        const response = await apiFetch(
          `${config.public.apiBaseUrl}/analytics/stores/${storeId}/orders/monthly?start=${start}&end=${end}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        this.ordersReport = response.monthlyOrder;
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },

    async fetchStoreRevenue(storeId, start, end) {
      const config = useRuntimeConfig();

      this.loading = true;
      this.error = null;
      try {
        const url = new URL(
          `${config.public.apiBaseUrl}/analytics/stores/${storeId}/revenue`
        );
        url.searchParams.append("start", start);
        url.searchParams.append("end", end);

        const data = await apiFetch(url.toString());
        this.revenue = data.value.revenue;
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },

    async fetchTotalSales(storeId, start, end) {
      const config = useRuntimeConfig();

      this.loading = true;
      this.error = null;
      try {
        const url = new URL(
          `${config.public.apiBaseUrl}/analytics/stores/${storeId}/total-sales`
        );
        url.searchParams.append("start", start);
        url.searchParams.append("end", end);

        const data = await apiFetch(url.toString());
        this.totalSales = data.totalSales;
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },

    async fetchTopProducts({
      storeId,
      startDate,
      endDate,
      limit = 35,
      search = "",
    }) {
      const config = useRuntimeConfig();

      this.loading = true;
      this.error = null;

      const params = {
        start: startDate,
        end: endDate,
        limit,
      };

      if (search && String(search).trim() !== "") {
        params.search = search;
      }
      try {
        const res = await apiFetch(
          `${config.public.apiBaseUrl}/analytics/stores/${storeId}/top-products`,
          {
            params,
          }
        );
        this.storeList = res.stores;
        this.topProducts = res.products;
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },

    async fetchOrganizationRevenue(orgId, start, end) {
      const config = useRuntimeConfig();

      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await useFetch(
          `${config.public.apiBaseUrl}/analytics/org/${orgId}/stores-revenue`,
          {
            query: { start, end },
          }
        );
        if (error.value) throw error.value;
        this.orgRevenue = data.value;
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
  },
});
