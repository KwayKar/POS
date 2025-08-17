<template>
  <div>
    <div ref="panelRefHeight" style="height: 100%">
      <div class="header-section">
        <h3 class="header3">Store List</h3>
        <Button
          @click="onSelectStore()"
          :applyShadow="true"
          :style="{ height: '40px' }"
          variant="primary"
        >
          Create
        </Button>
      </div>

      <div
        class="store-list"
        :style="{
          height:
            typeof panelHeight === 'number' ? `${panelHeight}px` : panelHeight,
        }"
      >
        <div
          v-for="store in storeStore.storeList"
          :key="store.id"
          class="store-row"
          @click="onSelectStore(store.id)"
        >
          <div class="store-left">
            <div class="avatar">
              {{ store.name?.charAt(0).toUpperCase() }}
            </div>
            <div class="store-info">
              <p class="store-name">{{ store.name }}</p>
              <p class="store-address">{{ store.address?.street || "No address" }}{{ store.address?.city ? ", " + store.address.city : "" }}</p>
            </div>
          </div>

          <div class="store-extra desktop-only">
            {{ store.establishment?.name || "N/A" }}
          </div>

          <div class="edit-icon desktop-only">
            <EditPencil />
          </div>
        </div>
      </div>
    </div>

    <Modal
      v-if="modal.isOpen && modal.type === 'store-info'"
      :width="modalWidth"
      :height="modalHeight"
      @close="closeModal"
    >
      <LocationTabs
        :panelHeight="modalHeight"
        :selectedStoreId="selectedStore.id"
        @close="closeModal"
      />
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed, nextTick } from "vue";
import EditPencil from "~/components/reuse/icons/EditPencil.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import Button from "~/components/reuse/ui/Button.vue";
import { useStoreLocation } from "~/stores/storeLocation/useStoreLocation";
import LocationTabs from "./LocationTabs.vue";
import { useAdmin } from "~/stores/admin/useAdmin";

const storeStore = useStoreLocation();
const adminStore = useAdmin();

const panelRefHeight = ref(null);
const windowWidth = ref(0);
const panelHeight = ref("auto");
const selectedStore = ref({});
const modal = ref({
  isOpen: false,
  type: "",
  mode: "",
});

const onSelectStore = async (id) => {
  const emptyStore = {
    id: id,
    name: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    latitude: null,
    longitude: null,
    phoneNumber: "",
    email: "",
    type: "",
  };

  if (id && id.trim() !== "") {
    selectedStore.value = await storeStore.storeList.find(
      (store) => store.id === id
    ) || { ...emptyStore };
  } else {
    selectedStore.value = { ...emptyStore };
  }
  modal.value = {
    isOpen: true,
    type: "store-info",
    mode: id ? "edit" : "create",
  };
};

const updatePanelSize = () => {
  windowWidth.value = window.innerWidth;
  const totalHeight = panelRefHeight.value.offsetHeight;
  panelHeight.value = `${totalHeight - 72}px`;
};

onMounted(async () => {
  await storeStore.fetchStoreList(adminStore.estId, adminStore.storeId);
  await nextTick();
  updatePanelSize();
  window.addEventListener("resize", updatePanelSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", updatePanelSize);
});

watch(
  () => modal.value.isOpen,
  (isOpen) => {
    if (isOpen) {
      nextTick(() => {
        updatePanelSize();
        window.addEventListener("resize", updatePanelSize);
      });
    } else {
      window.removeEventListener("resize", updatePanelSize);
    }
  }
);

const modalHeight = computed(() => {
  if (windowWidth.value > 900) {
    return "620px";
  } else {
    return `100vh`;
  }
});

const modalWidth = computed(() => {
  if (windowWidth.value > 1200) {
    return "870px";
  } else if (windowWidth.value < 900) {
    return `${windowWidth.value - 50}px`;
  }
});

const closeModal = () => {
  modal.value.isOpen = false;
};
</script>

<style scoped>
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 0;
}

.store-list {
  overflow-y: auto;
  padding: 2rem 2rem 5rem;
  background: #ffffff;
  margin: 22px;
  border-radius: 12px;
  border: 0.5px solid #dedede;
  scrollbar-width: none;
}

.store-list::-webkit-scrollbar {
  display: none;
}

.store-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #dedede;
  cursor: pointer;
}

.store-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.avatar {
  width: 40px;
  height: 40px;
  background-color: #dce1de;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.store-info {
  display: flex;
  flex-direction: column;
}

.store-name {
  font-size: 0.95rem;
  font-weight: 500;
}

.store-address {
  font-size: 0.875rem;
  color: #838383;
}

.store-extra {
  flex: 0.5;
  font-size: 0.9rem;
  color: var(--black-1);
}

.edit-icon {
  opacity: 0;
  cursor: pointer;
}

.store-row:hover .edit-icon {
  opacity: 1;
}

@media (max-width: 900px) {
  .desktop-only {
    display: none;
  }
}
</style>
