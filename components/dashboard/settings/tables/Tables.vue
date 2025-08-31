<template>
  <div class="container">
    <div class="form-group" style="width: 100%; margin-bottom: 0">
      <div class="table-section">
        <label for="category" class="form-label">Tables</label>
        <button
          @click="openAddtableModal"
          class="text-gray-500 hover:text-black"
          style="margin-left: 20px"
        >
          <Plus />
        </button>
      </div>
    </div>

    <div class="table-list" v-if="selectedFloor.tables && selectedFloor.tables?.length">
      <div
        v-for="table in selectedFloor.tables"
        :key="table.id"
        class="table-item"
        @click="openEditTableModal(table)"
      >
        {{ table.name }}
      </div>
    </div>

    <Modal
      v-if="modal.isOpen && modal.type === 'create'"
      :width="modalWidth"
      @close="closeModal"
    >
      <CreateTable @close="closeModal" />
    </Modal>

    <Modal
      v-if="modal.isOpen && modal.type === 'edit'"
      :width="modalWidth"
      @close="closeModal"
    >
      <EditTable :table="selectedTable" @close="closeModal" />
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import { useTable } from "~/stores/setting/useTable";
import Plus from "~/assets/icons/plus.vue";
import CreateTable from "./CreateTable.vue";
import EditTable from "./EditTable.vue";

const tableStore = useTable();

const modal = ref({
  isOpen: false,
  type: null,
});
const modalWidth = "400px";
const selectedTable = ref(null);

const selectedFloor = computed(() => tableStore.getSelectedFloor);

const openAddtableModal = () => {
  modal.value.isOpen = true;
  modal.value.type = "create";
};

function openEditTableModal(table) {
  selectedTable.value = table;
  modal.value.isOpen = true;
  modal.value.type = "edit";
}

const closeModal = () => {
  modal.value.isOpen = false;
};

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
}
.table-list {
  display: grid;
  gap: 12px;
  width: 100%;
  grid-template-columns: repeat(2, 1fr); /* mobile default: 2 items */
}

@media (min-width: 640px) {
  /* tablet */
  .table-list {
    grid-template-columns: repeat(3, 1fr); /* 3 items per row */
  }
}

@media (min-width: 1024px) {
  /* desktop */
  .table-list {
    grid-template-columns: repeat(4, 1fr); /* 4 items per row */
  }
}

.table-item {
  padding: 8px;
  text-align: center;
  border: 1px solid var(--gray-1);
  border-radius: 6px;
  background: var(--white-1);
  cursor: pointer;
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

.table-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  width: 100%;
}

.table-section > label {
  flex: 1;
}
</style>
