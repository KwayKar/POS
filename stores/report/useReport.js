import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app';
import axios from 'axios';

export const useAnalyticsStore = defineStore('analytics', {
  state: () => ({
    revenue: null,
    totalSales: null,
    topProducts: [],
    orgRevenue: [],
    revenueReport: [],
    ordersReport: [],
    loading: false,
    error: null,
    dateRange: {
      start: null,
      end: null,
    },
  }),

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
        const response = await axios.get(
          `${config.public.apiBaseUrl}/analytics/stores/${storeId}/revenue/monthly`,
          {
            params: { start, end },
          }
        );
        this.revenueReport =  [
        {
            "month": "2025-06-01T00:00:00.000Z",
            "revenue": 4680
        },
        {
            "month": "2025-07-01T00:00:00.000Z",
            "revenue": 4200
        },
        {
            "month": "2025-08-01T00:00:00.000Z",
            "revenue": 3000
        }
    ]

        // response.data.monthlyRevenue;
        // console.log(response.data.monthlyRevenue, 'ss')
      } catch (err) {
        console.error('Failed to fetch revenue report:', err);
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
        const response = await axios.get(
          `${config.public.apiBaseUrl}/analytics/stores/${storeId}/orders/monthly`,
          {
            params: { start, end },
          }
        );
        this.ordersReport =  [
        {
            "month": "2025-06-01T00:00:00.000Z",
            "revenue": 4680
        },
        {
            "month": "2025-07-01T00:00:00.000Z",
            "revenue": 4200
        },
        {
            "month": "2025-08-01T00:00:00.000Z",
            "revenue": 3000
        }
    ]
        // response.data;
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },

    async fetchStoreRevenue(storeId, start, end) {
      const config = useRuntimeConfig();

      this.loading = true
      this.error = null
      try {
        const { data, error } = await axios(
          `${config.public.apiBaseUrl}/analytics/stores/${storeId}/revenue`,
          {
            query: { start, end },
          }
        )
        if (error.value) throw error.value
        this.revenue = data.value.revenue
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    async fetchTotalSales(storeId, start, end) {
      const config = useRuntimeConfig();
      
      this.loading = true
      this.error = null
      try {
        const { data, error } = await axios.get(
          `${config.public.apiBaseUrl}/analytics/stores/${storeId}/total-sales`,
          {
            query: { start, end },
          }
        )
        if (error.value) throw error.value
        this.totalSales = data.value.totalSales
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    async fetchTopProducts(storeId, start, end, limit = 5) {
      const config = useRuntimeConfig();

      this.loading = true
      this.error = null
      try {
        const response = await axios(
          `${config.public.apiBaseUrl}/analytics/stores/${storeId}/top-products`,
          {
            params: { start, end, limit },
          }
        )
        // if (error.value) throw error.value
        this.topProducts = response.data.products
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    async fetchOrganizationRevenue(orgId, start, end) {
      const config = useRuntimeConfig();
      
      this.loading = true
      this.error = null
      try {
        const { data, error } = await useFetch(
          `${config.public.apiBaseUrl}/analytics/org/${orgId}/stores-revenue`,
          {
            query: { start, end },
          }
        )
        if (error.value) throw error.value
        this.orgRevenue = data.value
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },
  },
})
