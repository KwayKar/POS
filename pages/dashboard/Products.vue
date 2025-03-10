<template>
  <DashboardLayout>
    <NavPanel
      class="fixed top-0 left-0 lg:left-[100px] w-full lg:w-[calc(100%-100px)] h-16 bg-white shadow"
    >
      <div>
        <Button 
          class="create-btn" 
          style="background-color: var(--primary-btn-color, #4caf50)"
          @click="openModal('create')"
        >
          Create Product
        </Button>
      </div>
    </NavPanel>
    <div class="flex flex-col lg:flex-row h-full">
      <div class="p-4 bg-gray-100 h-full overflow-y-auto">
        <ItemList :items="items" :categories="categories" @select-item="openModal" />
      </div>
      
      <Modal v-if="modal.isOpen && modal.type === 'edit'" @close="closeModal" :minHeight="'400px'">
        <ProductInfo :item="selectedItem" @edit-item="updateItem" @remove-item="removeItem" />
      </Modal>
      
      <Modal v-if="modal.isOpen && modal.type === 'create'" @close="closeModal" :minHeight="'400px'">
        <CreateProduct @create-item="createItem" @open-category-modal="openCategoryModal" />
      </Modal>
      
      <Modal v-if="modal.isOpen && modal.type === 'category'" @close="closeModal" :minHeight="'400px'">
        <CreateCategory 
          :categories="categories"
          @update-categories="updateCategories"
        />
      </Modal>
    </div>
  </DashboardLayout>
</template>

<script>
import ItemList from "~/components/dashboard/items/ItemList.vue";
import NavPanel from "~/components/dashboard/panels/NavPanel.vue";
import ProductInfo from "~/components/dashboard/products/ProductInfo.vue";
import CreateProduct from "~/components/dashboard/products/CreateProduct.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import DashboardLayout from "~/layouts/DashboardLayout.vue";
import CreateCategory from "~/components/dashboard/products/categories/CreateCategory.vue";
import Button from "~/components/reuse/ui/Button.vue";

export default {
  components: {
    DashboardLayout,
    ItemList,
    Modal,
    ProductInfo,
    NavPanel,
    CreateProduct,
    CreateCategory,
    Button
  },
  data() {
    return {
      items: [
        { id: 1, title: "Item 1", category: "Main", price: 30, description: "Description goes here", image: "https://images.ctfassets.net/eum7w7yri3zr/3Z3fW9JhznhFDphzlHNmRx/d6410c46ffb8fc2c4c19c736a7f8d920/SG_Web_Image_Salad_Guacamole_Greens.png?w=600&fm=avif&q=75" },
        { id: 2, title: "Item 2", category: "Salads", price: 20, description: "Description goes here", image: "https://images.ctfassets.net/eum7w7yri3zr/3Z3fW9JhznhFDphzlHNmRx/d6410c46ffb8fc2c4c19c736a7f8d920/SG_Web_Image_Salad_Guacamole_Greens.png?w=600&fm=avif&q=75" },
        { id: 3, title: "Item 3", category: "Drinks", price: 40, description: "Description goes here", image: "https://images.ctfassets.net/eum7w7yri3zr/3Z3fW9JhznhFDphzlHNmRx/d6410c46ffb8fc2c4c19c736a7f8d920/SG_Web_Image_Salad_Guacamole_Greens.png?w=600&fm=avif&q=75" },
        { id: 4, title: "Item 4", category: "Desserts", price: 30, description: "Description goes here", image: "https://images.ctfassets.net/eum7w7yri3zr/3Z3fW9JhznhFDphzlHNmRx/d6410c46ffb8fc2c4c19c736a7f8d920/SG_Web_Image_Salad_Guacamole_Greens.png?w=600&fm=avif&q=75" }
      ],
      modal: {
        type: null,
        isOpen: false,
      },
      selectedItem: null,
      categories: [
        { id: 1, name: "Salads" },
        { id: 2, name: "Drinks" },
        { id: 3, name: "Desserts" },
      ],
    };
  },
  methods: {
    // Modal
    openModal(type, item) {
      this.selectedItem = item;
      this.modal = {
        type,
        isOpen: true,
      };
    },
    closeModal() {
      this.modal = {
        type: null,
        isOpen: false
      };
      this.selectedItem = null;
    },
    createItem(item) {
      this.items = [
        ...this.items,
        item
      ];
    },
    updateItem(updatedItem) {
      const index = this.items.findIndex((item) => item.id === updatedItem.id);
      if (index !== -1) {
        this.$set(this.items, index, updatedItem);
      }
      this.closeModal();
    },
    removeItem(itemToRemove) {
      this.items = this.items.filter(item => item.id !== itemToRemove);
      this.closeModal();
    },
    // category
    openCategoryModal() {
      this.modal = {
        type: 'category',
        isOpen: true,
      };
    },
    updateCategories(newCategories) {
      this.categories = newCategories;
    },
  },
};
</script>
