import { defineStore } from "pinia";

export const useOrder = defineStore("order", {
  state: () => ({
    selectedOrderID: null,
    filteredOrders: [],
    orders: [
      {
        id: "ORD001",
        customerName: "John Doe",
        items: [
          { name: "Burger", quantity: 2, price: 5.99, processed: true },
          { name: "Fries", quantity: 1, price: 2.99, processed: false },
        ],
        totalAmount: 14.97,
        status: "pending",
        orderType: "EATIN",
        paymentMethod: "Cash on Delivery",
        createdAt: "2024-03-31T12:30:00Z",
        deliveryAddress: "123 Main St, Springfield, IL 62701",
        paymentMethod: { method: "Cash on Delivery", status: "Unpaid" },
        note: "More sacue"
      },
      {
        id: "ORD002",
        customerName: "Jane Smith",
        items: [
          { name: "Pizza", quantity: 1, price: 10.99, processed: false },
          { name: "Coke", quantity: 2, price: 1.99, processed: false },
        ],
        totalAmount: 14.97,
        orderType: "EATIN",
        status: "completed",
        createdAt: "2024-03-30T15:45:00Z",
        deliveryAddress: "456 Oak Rd, Springfield, IL 62702",
        paymentMethod: { method: "Online Payment", status: "Paid" },
      },
      {
        id: "ORD003",
        customerName: "Alice Brown",
        items: [
          { name: "Pasta", quantity: 1, price: 8.99, processed: false },
          { name: "Salad", quantity: 1, price: 4.99, processed: false },
        ],
        totalAmount: 13.98,
        status: "processing",
        orderType: "DELIVERY",
        createdAt: "2024-03-29T18:15:00Z",
        deliveryAddress: "789 Birch St, Springfield, IL 62703",
        paymentMethod: { method: "Cash on Delivery", status: "Unpaid" },
      },
    ],
  }),
  getters: {
    getOrderList: (state) => state.orders,
  },
  actions: {
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
    updateDeliveryAddress(newAddress) {
      const order = this.orders.find((o) => o.id === this.selectedOrderID);
      if (order) {
        order.deliveryAddress = newAddress;
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
