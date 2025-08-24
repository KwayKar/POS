<template>
  <div class="store-list">
    <Select v-model="selectedStore" :options="stores" />
  </div>

  <div class="gap"></div>

  <div class="menu-list">
    <div v-if="menuStore.isLoading" class="status-message">Loading...</div>

    <div v-else-if="menuStore.error" class="status-message">
      {{ menuStore.error }}
    </div>

    <div v-else-if="filteredMenus.length === 0" class="status-message">
      No menu available
    </div>

    <router-link
      v-for="menu in filteredMenus"
      :key="menu.id"
      :to="`/dashboard/menus/${menu.id}`"
      class="menu-item"
    >
      <div class="menu-image">
        <label class="upload-box" for="fileInput" id="uploadLabel">
          <template v-if="menu.image">
            <img :src="menu.image" alt="Logo Preview" />
          </template>
          <template v-else> M </template>
        </label>
      </div>

      <div class="menu-info">
        <h4 class="menu-title">{{ menu.name }}</h4>
        <p class="menu-location">{{ menu.location }}</p>
      </div>
    </router-link>
  </div>

  <div class="gap"></div>

  <div class="button-wrapper">
    <Button
      style="border: 1px solid var(--gray-2); height: 46px; width: 90%"
      class="category-btn"
      variant="primary"
      :applyShadow="true"
      @click="openCreateMenuModal"
    >
      Create Menu
    </Button>
  </div>

  <Modal
    v-if="modal.isOpen && modal.type === 'create-menu'"
    width="500px"
    height="auto"
    @close="closeModal"
  >
    <CreateMenu />
  </Modal>

</template>

<script setup>
import { ref } from "vue";
import Select from "~/components/reuse/ui/Select.vue";
import Button from "~/components/reuse/ui/Button.vue";
import { useMenuList } from "~/stores/menu/useMenuList";
import CreateMenu from "./CreateMenu.vue";
import Modal from "~/components/reuse/ui/Modal.vue";

const selectedStore = ref(null);
const stores = ref([]);
const modal = ref({
  type: null,
  isOpen: false,
});

const menuStore = useMenuList();

onMounted(() => {
  menuStore.fetchMenus();

  const storedStaff = localStorage.getItem("staff");
  if (storedStaff) {
    const staff = JSON.parse(storedStaff);
    stores.value = staff.stores.map((s) => ({
      value: s.id,
      label: s.name,
    }));

    if (stores.value.length > 0) {
      selectedStore.value = stores.value[0].value;
    }
  }
});

const openCreateMenuModal = () => {
   modal.value = {
    type: 'create-menu',
    isOpen: true,
  };
}

const filteredMenus = computed(() => {
  if (!menuStore.menus || menuStore.isLoading || menuStore.error) {
    return [];
  }

  if (selectedStore.value === null) {
    return menuStore.menus;
  }

  return menuStore.menus.filter((menu) => menu.storeId === selectedStore.value);
});

const closeModal = () => {
  modal.value = {
    type: null,
    isOpen: false,
  };
};
</script>

<style scoped>
.store-list {
  padding: 14px 12px 12px;
}
@media screen and (max-width: 900px) {
  .store-list {
    width: 90%;
  }
}

.gap {
  width: 100%;
  height: 1px;
  background: #c1c1c1;
}

.menu-list {
  max-height: 380px;
  min-height: 380px;
  overflow-y: auto;
  padding: 0 16px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.menu-item {
  display: flex;
  align-items: center;
  border: 1px solid var(--pale-gray-2);
  padding: 12px;
  border-radius: 8px;
  background: var(--white-1);
  cursor: pointer;
}
.menu-item:first-child {
  margin-top: 12px;
}
.menu-item:last-child {
  margin-bottom: 12px;
}

.menu-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 16px;
}

.menu-info {
  flex: 1;
}

.menu-title {
  margin: 0;
  font-weight: 600;
  font-size: 15px;
  color: var(--black-2);
}

.menu-location {
  margin: 4px 0 0;
  color: #666;
  font-size: 14px;
}

.upload-box {
  width: 75px;
  height: 75px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  background-color: #fafafa;
  transition: border-color 0.3s ease;
  margin-right: 15px;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 12px;
}

.status-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; 
  font-size: 1rem;
  font-weight: 500;
  color: #666;
}
</style>
