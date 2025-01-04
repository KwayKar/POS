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
        <ItemList 
          :items="items" 
          :categories="categories"
          @select-item="openModal" />
      </div>
      <div 
        v-if="panelWidth.itemPanel > 400" 
        class="bg-gray-800 p-4 overflow-y-auto" 
        :style="{
          width: panelWidth.windowPanel > 1024 ? panelWidth.orderPanel + 'px' : '100%',
          position: panelWidth.windowPanel < 1024 ? 'fixed' : undefined,
          bottom: panelWidth.windowPanel < 1024 ? 0 : undefined
        }"
      >
        <OrderPanel :order="order" @edit-order="openModal" />
      </div>
      <Modal v-if="modal.isOpen" @close="closeModal">
        <AddOrderInfo
          :item="selectedItem"
          :orderForm="orderForm"
          :modalType="modal.type"
          @update-order-item="handleUpdateOrderItem"
          @delete-order-item="handleDeleteOrderItem"
        />
      </Modal>
    </div>
  </DashboardLayout>
</template>

<script>
import ItemList from "~/components/dashboard/items/ItemList.vue";
import AddOrderInfo from "~/components/dashboard/acceptOrder/AddOrderInfo.vue";
import OrderPanel from "~/components/dashboard/acceptOrder/OrderPanel.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import DashboardLayout from "~/layouts/DashboardLayout.vue";
import NavPanel from "~/components/dashboard/panels/NavPanel.vue";

export default {
  components: {
    DashboardLayout,
    NavPanel,
    ItemList,
    OrderPanel,
    AddOrderInfo,
    Modal,
  },
  data() {
    return {
      categories: [
        { id: 1, name: "Salads" },
        { id: 2, name: "Drinks" },
        { id: 3, name: "Desserts" },
      ],
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
          sizes: [
            {id: "1", display: "Small"},
            {id: "2", display: "Medium"},
            {id: "3", display: "Large"}
          ],
          image:
            "https://images.ctfassets.net/eum7w7yri3zr/3Z3fW9JhznhFDphzlHNmRx/d6410c46ffb8fc2c4c19c736a7f8d920/SG_Web_Image_Salad_Guacamole_Greens.png?w=600&fm=avif&q=75",
        },
      ],
      modal: {
        isOpen: false,
        type: null
      },
      selectedItem: null,
      orderForm: {
        quantity: 1,
        preferences: null
      },
      order: [],
      panelWidth: {
        windowPanel: 0,
        navPanel: 100,
        itemPanel: 0,
        orderPanel: 400,
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
      this.panelWidth.windowPanel = windowWidth;
      if (windowWidth > 1024) {
        this.panelWidth.itemPanel = windowWidth - orderPanelWidth - navPanelWidth; // Remaining space
      } else {
        this.panelWidth.itemPanel = windowWidth;
      }
    },
    // Order
    handleUpdateOrderItem(updatedOrder) {
      const existingOrderIndex = this.order.findIndex(
        (order) => order.item.id == updatedOrder.item.id
      );

      if (existingOrderIndex !== -1) {
        const updateItem = {
          ...this.order[existingOrderIndex],
          ...updatedOrder
        };
        this.order.splice(existingOrderIndex, 1, updateItem);
      } else {
        this.order.push(updatedOrder);
      }

      this.modal = { 
        isOpen: false, 
        type: null 
      };
    },
    handleDeleteOrderItem(itemId) {
      const index = this.order.findIndex((order) => order.item.id === itemId);
      if (index !== -1) {
        this.order.splice(index, 1);
      }
      this.modal = { 
        isOpen: false, 
        type: null 
      }
      this.selectedItem = null;
    },
    // Modal
    openModal(item) {
      const existingOrder = this.order.find(
        (order) => order.item.id === item.id
      );
      if (existingOrder) {
        this.orderForm = existingOrder;
      } else {
        this.orderForm = {
          ...this.orderForm,
          ...existingOrder
        }
      }

      this.selectedItem = item;
      this.modal = { 
        isOpen: true, 
        type: existingOrder ? "edit" : "create"  
      }
    },
    closeModal() {
      this.modal = { 
        isOpen: false, 
        type: null 
      }
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
