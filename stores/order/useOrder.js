import { defineStore } from "pinia";
import { apiFetch } from "~/utils/apiFetch";
import { useAdmin } from "../admin/useAdmin";

export const useOrder = defineStore("order", {
  state: () => ({
    selectedOrderID: null,
    filteredOrders: [],
    orders: [],
    totalCount: 0,
  }),
  getters: {
    getOrderList: (state) => state.orders,
  },
  actions: {
    async fetchFilteredOrders({
      storeId,
      query = "",
      status = "",
      sort = "",
      order = "asc",
      page = 1,
      limit = 10,
      dateFrom,
      dateTo,
    }) {
      try {
        const config = useRuntimeConfig();
        const params = new URLSearchParams({
          query,
          status,
          sort,
          order,
          page,
          limit,
          dateFrom,
          dateTo,
        });

        const res = await apiFetch(
          `${
            config.public.apiBaseUrl
          }/stores/${storeId}/orders?${params.toString()}`
        );
        const { orders, totalCount } = res;

        this.totalCount = totalCount;
        const mappedOrders =
          orders &&
          orders.map((order) => ({
            id: order.id,
            customerName: "",
            items: order.orderItems.map((item) => ({
              id: item.id,
              name: item.product?.title || "Unknown Item",
              quantity: item.quantity,
              price: item.price,
              customizations: item.customizations,
              processed: item?.processed,
              notes: item?.notes,
            })),
            totalAmount: order.total,
            status: order.status.toLowerCase(),
            orderType: order.orderType,
            deliveryAddress: order?.deliveryAddress,
            phoneNumber: order?.phoneNumber,
            paymentMethod: {
              method: order.paymentMethod || "Unknown",
              status: "Unknown",
            },
            createdAt: order.createdAt,
            note: order.notes || "",
          }));

        if (page === 1) {
          this.orders = mappedOrders;
        } else {
          this.orders = [...this.orders, ...mappedOrders];
        }

        return mappedOrders;
      } catch (error) {
        // console.error("Failed to fetch filtered orders", error);
        return [];
      }
    },
    getOrderDetails(id) {
      return this.orders.find((o) => o.id === id);
    },
    createOrder(order) {
      this.orders.push(order);
    },
    updateOrder(id, updates) {
      const idx = this.orders.findIndex((o) => o.id === id);
      if (idx !== -1) this.orders[idx] = { ...this.orders[idx], ...updates };
    },
    deleteOrder(id) {
      this.orders = this.orders.filter((o) => o.id !== id);
    },
    filterOrders(status) {
      this.filteredOrders = this.orders.filter(
        (order) => order.status === status
      );
    },
    setSelectedOrderID(id) {
      this.selectedOrderID = id;
    },
    async updateDeliveryInfo(newAddress, newPhoneNumber) {
      const config = useRuntimeConfig();
      const adminStore = useAdmin();

      const order = this.orders.find((o) => o.id === this.selectedOrderID);
      if (!order) return;

      const url = `${config.public.apiBaseUrl}/stores/${adminStore.storeId}/orders/${this.selectedOrderID}`;
      const res = await apiFetch(url, {
        method: "PUT",
        body: {
          deliveryAddress: newAddress,
          phoneNumber: newPhoneNumber,
        },
      });

      if (res) {
        order.deliveryAddress = newAddress;
        order.phoneNumber = newPhoneNumber;
      }

      return res;
    },
    async updateOrderStatus(newStatus) {
      const config = useRuntimeConfig();
      const adminStore = useAdmin();

      const order = this.orders.find((o) => o.id === this.selectedOrderID);
      if (!order) return;

      const url = `${config.public.apiBaseUrl}/stores/${adminStore.storeId}/orders/${this.selectedOrderID}`;
      const res = await apiFetch(url, {
        method: "PUT",
        body: { status: newStatus.toUpperCase() },
        headers: { "Content-Type": "application/json" },
      });

      if (res) {
        order.status = newStatus.toUpperCase();
      }

      return res;
    },
    async removeProductOrder(itemId) {
      const config = useRuntimeConfig();
      const adminStore = useAdmin();

      const url = `${config.public.apiBaseUrl}/stores/${adminStore.storeId}/orders/${this.selectedOrderID}/items/${itemId}`;

      const res = await apiFetch(url, {
        method: "DELETE",
      });

      if (res) {
        this.orders = this.orders.map((order) => {
          if (order.id === this.selectedOrderID) {
            order.items = order.items.filter((item) => item.id !== itemId);
            order.total = res.newTotal;
          }
          return order;
        });
      }
    },
    async removeProductCustomization(itemId, customizationId) {
      const config = useRuntimeConfig();
      const adminStore = useAdmin();

      const url = `${config.public.apiBaseUrl}/stores/${adminStore.storeId}/orders/${this.selectedOrderID}/items/${itemId}/customizations/${customizationId}`;

      const res = await apiFetch(url, {
        method: "DELETE",
      });

      if (res) {
        this.orders = this.orders.map((order) => {
          if (order.id === this.selectedOrderID) {
            order.total = res.newTotal;
            order.items = order.items.map((item) => {
              if (item.id === itemId) {
                item.customizations = item.customizations.filter(
                  (c) => c.id !== customizationId
                );
              }
              return item;
            });
          }
          return order;
        });
      }
    },
    updatePaymentDetails({ orderId, paymentMethod, paymentStatus }) {
      const order = this.orders.find((o) => o.id === orderId);
      if (order) {
        order.paymentMethod.method = paymentMethod;
        order.paymentMethod.status = paymentStatus;
      }
    },
  },
});
