<template>
  <DashboardLayout>
    <NavPanel
      class="fixed top-0 left-0 lg:left-[100px] w-full lg:w-[calc(100%-100px)] h-16 bg-white shadow"
    />
    <div class="flex flex-col lg:flex-row h-full">
      <div
        :style="{ width: panelWidth.itemPanel + 'px' }"
        class="bg-gray-100 p-4 overflow-y-auto"
      >
        <ItemList :items="items" @select-item="openModal" />
      </div>
      <div v-if="panelWidth.itemPanel > 400" class="bg-gray-800 p-4 overflow-y-auto" :style="{width: panelWidth.orderPanel + 'px'}">
        <OrderPanel :order="order" @edit-order="openModal" />
      </div>
      <Modal v-if="isModalOpen" @close="closeModal" :minHeight="'500px'">
        <AddOrderInfo
          :item="selectedItem"
          :quantity="quantity"
          @update-order-item="handleUpdateOrderItem"
          @delete-order-item="handleDeleteOrderItem"
        />
      </Modal>
    </div>
  </DashboardLayout>
</template>

<script>
import ItemList from "~/components/dashboard/items/ItemList.vue";
import AddOrderInfo from "~/components/dashboard/orders/AddOrderInfo.vue";
import OrderPanel from "~/components/dashboard/orders/OrderPanel.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import DashboardLayout from "~/layouts/DashboardLayout.vue";

export default {
  components: {
    DashboardLayout,
    ItemList,
    OrderPanel,
    AddOrderInfo,
    Modal,
  },
  data() {
    return {
      items: [
        {
          id: 1,
          title: "Item 1",
          category: "Salads",
          price: 30,
          description: "Description goes here",
          image:
            "https://images.ctfassets.net/eum7w7yri3zr/3Z3fW9JhznhFDphzlHNmRx/d6410c46ffb8fc2c4c19c736a7f8d920/SG_Web_Image_Salad_Guacamole_Greens.png?w=600&fm=avif&q=75",
        },
        {
          id: 2,
          title: "Item 2",
          category: "Drinks",
          price: 20,
          description: "Description goes here",
          image:
            "https://images.ctfassets.net/eum7w7yri3zr/3Z3fW9JhznhFDphzlHNmRx/d6410c46ffb8fc2c4c19c736a7f8d920/SG_Web_Image_Salad_Guacamole_Greens.png?w=600&fm=avif&q=75",
        },
        {
          id: 3,
          title: "Item 3",
          category: "Salads",
          price: 40,
          description: "Description goes here",
          image:
            "https://images.ctfassets.net/eum7w7yri3zr/3Z3fW9JhznhFDphzlHNmRx/d6410c46ffb8fc2c4c19c736a7f8d920/SG_Web_Image_Salad_Guacamole_Greens.png?w=600&fm=avif&q=75",
        },
        {
          id: 4,
          title: "Item 4",
          category: "Desserts",
          price: 30,
          description: "Description goes here",
          image:
            "https://images.ctfassets.net/eum7w7yri3zr/3Z3fW9JhznhFDphzlHNmRx/d6410c46ffb8fc2c4c19c736a7f8d920/SG_Web_Image_Salad_Guacamole_Greens.png?w=600&fm=avif&q=75",
        },
      ],
      isModalOpen: false,
      selectedItem: null,
      order: [],
      quantity: 1,
      panelWidth: {
        navPanel: 100,
        itemPanel: 0,
        orderPanel: 500,
      },
    };
  },
  mounted() {
    this.calculateItemListWidth();
    window.addEventListener("resize", this.calculateItemListWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.calculateItemListWidth);
  },
  methods: {
    calculateItemListWidth() {
      const windowWidth = window.innerWidth;
      const orderPanelWidth = this.panelWidth.orderPanel;
      const navPanelWidth = this.panelWidth.navPanel;
      this.panelWidth.itemPanel = windowWidth - orderPanelWidth - navPanelWidth; // Remaining space
    },
    // Order
    handleUpdateOrderItem(updatedOrder) {
      const existingOrderIndex = this.order.findIndex(
        (order) => order.item.id == updatedOrder.item.id
      );

      if (existingOrderIndex !== -1) {
        const updateItem = {
          ...this.order[existingOrderIndex],
          quantity: updatedOrder.quantity,
        };
        this.order.splice(existingOrderIndex, 1, updateItem);
      } else {
        this.order.push(updatedOrder);
      }

      this.isModalOpen = false;
      this.selectedItem = null;
    },
    handleDeleteOrderItem(itemId) {
      const index = this.order.findIndex((order) => order.item.id === itemId);
      if (index !== -1) {
        this.order.splice(index, 1);
      }
      this.isModalOpen = false;
      this.selectedItem = null;
    },
    // Modal
    openModal(item) {
      const existingOrder = this.order.find(
        (order) => order.item.id === item.id
      );
      if (existingOrder) {
        this.quantity = existingOrder.quantity;
      } else {
        this.quantity = 1;
      }

      this.selectedItem = item;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedItem = null;
    },
  },
  computed: {
    showOrderPanel() {
      return this.screenWidth >= 800;
    },
  },
};
</script>
