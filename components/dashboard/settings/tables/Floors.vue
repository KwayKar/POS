<template>
  <div ref="floorRef" class="container">
    <div class="form-group" style="width: 100%; margin-bottom: 0">
      <div class="floor-section">
        <label for="category" class="form-label">Floors</label>
        <button
          @click="openAddFloorModal"
          class="text-gray-500 hover:text-black"
          style="margin-left: 20px"
        >
          <Plus />
        </button>
      </div>
    </div>

    <div class="floor-list" :style="{ width: parentWidth + 'px' }">
      <Button
        v-for="(floor, index) in floorStore.getFloorList"
        :key="floor.id"
        @click="floorStore.setSelectedFloorID(floor.id)"
        :variant="
          floorStore.getSelectedFloor?.id === floor.id ? 'primary' : 'secondary'
        "
      >
        {{ floor.name }}
      </Button>
    </div>

    <Modal v-if="modal.isOpen" :width="modalWidth" @close="closeModal">
      <CreateFloor @close="closeModal" />
    </Modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import Button from "~/components/reuse/ui/Button.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import { useTable } from "~/stores/setting/useTable";
import CreateFloor from "./CreateFloor.vue";
import Plus from "~/assets/icons/plus.vue";
import { nextTick } from "vue";

const floorStore = useTable();

const modal = reactive({ isOpen: false });
const modalWidth = "400px";
const floorRef = ref(null);
const parentWidth = ref(0);

const openAddFloorModal = () => {
  modal.isOpen = true;
};

const closeModal = () => {
  modal.isOpen = false;
};

onMounted(async () => {
  await floorStore.fetchFloors();
  
  if (floorStore.getFloorList.length) {
    await floorStore.setSelectedFloorID(floorStore.getFloorList[0].id);
  }

  nextTick(() => {
    if (floorRef.value) {
      parentWidth.value = floorRef.value.offsetWidth;
    }
  });
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
}

.floor-list {
  display: flex;
  gap: 8px;
  overflow-y: auto;
  white-space: nowrap;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.floor-item {
  padding: 8px;
  border: 1px solid var(--gray-2);
  border-radius: 6px;
  background: var(--white);
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modal-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.floor-list {
  display: flex;
  overflow-y: auto;
  width: 400px;
}

.floor-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  width: 100%;
}

.floor-section > label {
  flex: 1;
}
</style>
