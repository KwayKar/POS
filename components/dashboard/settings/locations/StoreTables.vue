<template>
  <div class="modal-content store-tables">
    <h4 class="form-section-header">Manage Tables</h4>

    <div>
      <p class="label-description" style="margin-bottom: 18px">
        Set up your restaurant’s tables and floors here.
      </p>

      <Floors />
      <Tables />
    </div>
  </div>

  <div class="modal-footer" style="justify-content: flex-end;">
    <div class="flex justify-end my-2">
      <Button
        variant="danger"
        @click="confirmDelete"
        :apply-shadow="true"
        :isProcessing="isSubmitting"
      >
        {{ `Delete Floor` }}
      </Button>
    </div>
  </div>

  <Modal
    v-if="modal.isOpen && modal.type === 'remove-floor'"
    width="420px"
    height="auto"
    @close="closeModal"
  >
    <ConfirmDelete @remove-item="handleRemove" @close="closeModal">
      <div>
        <p style="font-size: 0.95rem">
          All tables inside floor {{ selectedFloor?.name }} will be deleted.
        </p>
      </div>
    </ConfirmDelete>
  </Modal>
</template>

<script setup>
import Button from "~/components/reuse/ui/Button.vue";
import Floors from "../tables/Floors.vue";
import Tables from "../tables/Tables.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import ConfirmDelete from "~/components/reuse/ui/ConfirmDelete.vue";
import { computed, ref } from "vue";
import { useTable } from "~/stores/setting/useTable";

const floorStore = useTable();
const selectedFloor = computed(() => {
  return floorStore.floors.find(
    (floor) => floor.id === floorStore.selectedFloorID
  );
});

const modal = ref({
  type: null,
  isOpen: false,
  selectedItem: null,
});

const confirmDelete = () => {
  modal.value = {
    type: "remove-floor",
    isOpen: true,
    selectedItem: selectedFloor,
  };
};

const handleRemove = () => {
  floorStore.deleteFloor(modal.value.selectedItem?.id);
  closeModal();
};

const closeModal = () => {
  modal.value = {
    type: null,
    isOpen: false,
    selectedItem: null,
  };
};
</script>

<style scoped>
.store-tables {
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: var(--white);
  height: 540px;
  overflow-y: scroll;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--black-1);
}
</style>
