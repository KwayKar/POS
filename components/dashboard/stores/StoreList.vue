<template>
  <div class="store-container">
    <div class="store-header">
      <h1>Store List</h1>
      <button class="create-btn" @click="openModal('create')">Create Store</button>
    </div>
    <ul class="item-list">
      <StoreItem
        v-for="store in stores.stores"
        :key="store.id"
        :store="store"
        @edit="editStore"
        @delete="confirmDelete"
      />
    </ul>
    <!-- <n-data-table
      :columns="columns"
      :data="stores.stores"
      :bordered="true"
      striped
    /> -->

    <Modal v-if="modal.isOpen" :width="'540px'" @close="closeModal">
      <StoreForm
        v-if="modal.type === 'create'"
        :store="selectedStore"
        @save="saveStore"
        :isOpen="modal.isOpen"
        @close="closeModal"
      />

      <StoreForm
        v-if="modal.type === 'edit'"
        :store="selectedStore"
        @save="saveStore"
        :isOpen="modal.isOpen"
        @close="closeModal"
      />

      <ConfirmDeleteModal
        v-if="modal.type === 'confirm-delete'"
        :itemName="selectedStore?.name"
        @confirm="removeStore"
        @cancel="closeModal"
      />
    </Modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import StoreItem from "./StoreItem.vue";
import StoreForm from "./StoreForm.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import { useStore} from '~/stores/shop/useRestaurant';
import ConfirmDeleteModal from "~/components/reuse/general/confirmDelete/ConfirmDelete"

const stores = useStore();
// const manageStore = useStore();
const selectedStore = ref(null);
const modal = ref({ isOpen: false, type: "" });

const openModal = (type, store = null) => {
  modal.value = { isOpen: true, type };
  selectedStore.value = store;
};

const closeModal = () => {
  modal.value.isOpen = false;
  selectedStore.value = null;
};

const saveStore = (store) => {
  if (store.id) {
    stores.updateStore(store.id, store);
  } else {
    stores.addStore(store);
  }
  closeModal();
};

const editStore = (store) => {
  openModal("edit", store);
};

const confirmDelete = (id) => {
  selectedStore.value = id;
  modal.value = { isOpen: true, type: "confirm-delete" };
};

const removeStore = () => {
  if (selectedStore.value) {
    stores.removeStore(selectedStore.value);
  }
  closeModal();
};
</script>

<style scoped>
.item-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  list-style: none;
  padding: 0;
}
@media screen and (max-width: 900px) {
  .item-list {
    flex-direction: column;
  }
}

.store-container {
}

.store-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.create-btn {
  background-color: var(--primary-btn-color);
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
}

</style>
