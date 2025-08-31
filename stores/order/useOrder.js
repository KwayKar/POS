import { defineStore } from "pinia";
import { apiFetch } from "~/utils/apiFetch";
import { useAdmin } from "../admin/useAdmin";
import { usePosStore } from "../pos/usePOS";

export const useOrder = defineStore("order", {
  state: () => ({
    selectedOrderID: null,
    filteredOrders: [],
    orders: [],
    totalCount: 0,
    orderType: 'eat-in',
    selectedTableId: null,
    message: {
      success: null,
      label: ""
    }
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
        const params = new URLSearchParams();

        params.append("query", query);
        params.append("status", status);
        params.append("sort", sort);
        params.append("order", order);
        params.append("page", String(page));
        params.append("limit", String(limit));

        if (dateFrom) {
          params.append("dateFrom", dateFrom);
        }
        if (dateTo) {
          params.append("dateTo", dateTo);
        }

        const res = await apiFetch(
          `${
            config.public.apiBaseUrl
          }/stores/${storeId}/orders?${params.toString()}`
        );
        if (!res.orders) return;

        const { orders, totalCount } = res;

        this.totalCount = totalCount;
        const mappedOrders =
          orders &&
          orders.map((order) => ({
            id: order.id,
            customerName: "",
            items: order.orderItems.map((item) => ({
              id: item.id,
              title: item.product?.title || "Unknown Item",
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
          this.orders.push(...mappedOrders);
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
    setOrderType(type) {
      this.orderType = type
    },
    setTableId(tableId) {
      this.selectedTableId = tableId;
    },
    // by cart
    async submitOrderFromCart() {
      const adminStore = useAdmin();
      const posStore = usePosStore();
      const config = useRuntimeConfig();

      console.log(this.selectedTableId);
      
      const payload = {
        storeId: adminStore.storeId,
        orderType: this.orderType, // "EATIN",
        total:
          posStore.cart &&
          posStore.cart.reduce((sum, item) => sum + item.total, 0),
        notes: "No ketchup",
        status: 'Confirmed',
        selectedTableId: this.selectedTableId,
        orderItems: posStore.cart.map((item) => {
          const rawItem = toRaw(item);
        
          return {
            productId: rawItem.item.id,
            quantity: rawItem.quantity,
            price: rawItem.unitPrice,
            status: 'CONFIRMED',
            notes: rawItem.preferences,
            ...(rawItem.size && { size: rawItem.size.label }), // or sizeId if you store it
            customizations: [
              ...(rawItem.addons?.map((a) => ({
                type: "addon",
                id: a.id,
                title: a.title,
                price: a.price,
                quantity: a.quantity ?? 1,
              })) || []),
              ...(rawItem.choices?.map((c) => ({
                type: "choice",
                id: c.id,
                title: c.title,
              })) || []),
              ...(rawItem.removals?.map((r) => ({
                type: "removal",
                id: r.id,
                title: r.title,
              })) || []),
            ],
          };
        }),
      };

      try {
        // await apiFetch(`${config.public.apiBaseUrl}/stores/${adminStore.storeId}/orders`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: payload,
        // });

        this.message = { success: true, label: "Order Submitted" };
        posStore.clearCart();
      } catch (e) {
        this.message = { success: false, label: "Something went wrong" };
      }
    },
    // adding by item
    async addNewItemsToOrder(rawItem) {
      const order = this.orders.find((o) => o.id === this.selectedOrderID);


      if (order) {
        order.items = [...order.items, {
          productId: rawItem.item.id,
          title: rawItem.item.title,
          quantity: rawItem.quantity,
          price: rawItem.unitPrice,
          status: 'CONFIRMED',
          notes: rawItem.preferences,
          ...(rawItem.size && { size: rawItem.size.label }), // or sizeId if you store it
          customizations: [
            ...(rawItem.addons?.map((a) => ({
              type: "addon",
              id: a.id,
              title: a.title,
              price: a.price,
              quantity: a.quantity ?? 1,
            })) || []),
            ...(rawItem.choices?.map((c) => ({
              type: "choice",
              id: c.id,
              title: c.title,
            })) || []),
            ...(rawItem.removals?.map((r) => ({
              type: "removal",
              id: r.id,
              title: r.title,
            })) || []),
          ],
        }]; 
      }
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
            order.totalAmount = 0;
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
            order.totalAmount = res.newTotal;
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
    resetMessage() {
      this.message = { success: null, label: "" };
    }
  },
});
