<template>
  <div class="store-settings">
    <!-- Left Navigation Panel -->
    <div class="nav-panel">
      <div class="nav-section">
        <ul class="nav-items">
          <li
            v-for="tab in tabs"
            :key="tab.key"
            class="nav-item"
            :class="{ active: activeTab === tab.key }"
            @click="activeTab = tab.key"
          >
            <p>{{ tab.label }}</p>
          </li>
        </ul>
      </div>

      <Button
        @click="onConfirmDelete"
        variant="danger"
        :style="{ height: '38px' }"
      >
        Delete Store
      </Button>
    </div>

    <!-- Right Content Area -->
    <div class="tab-content" :style="{ height: panelHeight }">
      <div v-if="activeTab === 'store'">
        <StoreInfoForm
          :selectedStoreId="props.selectedStoreId"
          :selectedStore="props.selectedStore"
          :panelHeight="{ panelHeight }"
          @close="closeModal"
        />
      </div>

      <div v-if="activeTab === 'opening-hours'">
        <StoreOpeningHours
          :selectedStoreId="props.selectedStoreId"
          @close="closeModal"
        />
      </div>

      <div v-if="activeTab === 'tables'">
        <StoreTables
          :selectedStoreId="props.selectedStoreId"
          @close="closeModal"
        />
      </div>

      <div v-if="activeTab === 'tax'">
        <StoreTaxInfo @close="closeModal" />
      </div>

      <div v-if="activeTab === 'receipt'">
        <StoreReceipt
          :selectedStoreId="props.selectedStoreId"
          @close="closeModal"
        />
      </div>
    </div>
  </div>

  <Modal
    v-if="modal.isOpen && modal.type === 'delete-store'"
    width="420px"
    height="auto"
    @close="closeModal"
  >
    <ConfirmDelete @remove-item="onDeleteStore" @close="closeModal">
      <div>
        <p style="font-size: 0.95rem">Are you sure you want to delete {{ modal?.selectedItem?.name }}?</p>
      </div>
    </ConfirmDelete>
  </Modal>
</template>

<script setup>
import { ref } from "vue";
import StoreInfoForm from "./StoreInfoForm.vue";
import StoreOpeningHours from "./StoreOpeningHours.vue";
import StoreReceipt from "./StoreReceipt.vue";
import StoreTaxInfo from "./StoreTaxInfo.vue";
import { useStoreLocation } from "~/stores/storeLocation/useStoreLocation";
import StoreTables from "./StoreTables.vue";
import Button from "~/components/reuse/ui/Button.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import ConfirmDelete from "~/components/reuse/ui/ConfirmDelete.vue";

const storeStore = useStoreLocation();
const emit = defineEmits(["close"]);

const activeTab = ref("store");
const tabs = [
  { key: "store", label: "Store Info" },
  { key: "opening-hours", label: "Opening Hours" },
  { key: "tables", label: "Tables" },
  { key: "tax", label: "Tax" },
  { key: "receipt", label: "Receipt" },
];

const modal = ref({
  type: null,
  isOpen: false,
  selectedItem: null
});

const props = defineProps({
  panelHeight: {
    type: Number,
    default: 500,
  },
  selectedStoreId: {
    type: String,
  },
  selectedStore: {
    type: Object,
  },
});

const onDeleteStore = () => {
  storeStore.removeStore(props.selectedStoreId);
  closeModal();
} 

const closeModal = () => {
  emit("close");
};

onMounted(async () => {
  if (props.selectedStoreId) {
    await storeStore.fetchStoreById(props.selectedStoreId);
  }
});

const onConfirmDelete = () => {
  modal.value = {
    type: "delete-store",
    isOpen: true,
    selectedItem: props.selectedStore
  };
}
</script>

<style scoped>
.store-settings {
  display: flex;
  border-radius: 12px;
  overflow: hidden;
}

@media (max-width: 768px) {
  .store-settings {
    flex-direction: column;
  }
}

/* Left Navigation Panel */
.nav-panel {
  width: 240px;
  height: auto;
  padding: 1.5rem 1rem 0;
  border-right: 1px solid #dedede;
  background: var(--white-1, #fff);
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-bottom: 24px;
}

.nav-section + .nav-section {
  margin-top: 1.5rem;
}

.section-title {
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.7rem;
  color: var(--black-2);
}

.nav-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  display: flex;
  padding: 0.5rem 0;
  cursor: pointer;
  color: var(--black-1, #333);
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.nav-item > p {
  margin-left: 10px;
  font-size: 0.9rem;
}

.nav-item.active {
  font-weight: bold;
  color: var(--black-1);
}

@media (max-width: 768px) {
  .nav-panel {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #dedede;
    border-radius: 0;
    padding: 0.5rem;
    height: 55px;
    display: flex;
    align-items: center;
  }

  .nav-items {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
  }

  .nav-item {
    padding: 0.5rem 0.75rem;
    white-space: nowrap;
  }

  .nav-item > p {
    margin-left: 0;
  }
}

/* Right Content */
.tab-content {
  flex: 1;
  background: var(--primary-bg-color-1);
}
@media only screen and (max-width: 768px) {
  .tab-content {
    flex: 1;
    padding: 0rem;
    background: var(--primary-bg-color-1);
    overflow-y: auto;
    max-height: 89vh;
  }
}
</style>
