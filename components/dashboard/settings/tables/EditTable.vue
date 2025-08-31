<template>
  <div>
    <h3 class="modal-title">Edit Table</h3>

    <div class="table-container">
      <div class="modal-content">
        <div class="form-group flex-1">
          <label for="tableName" class="form-label">Table Number</label>
          <Input
            v-model="props.table.name"
            type="text"
            class="w-full p-2 border rounded bg-gray-100"
            readonly
          />
        </div>

        <div class="form-group flex-1">
          <label for="capacity" class="form-label">Capacity</label>
          <Input
            v-model.number="capacity"
            type="number"
            min="1"
            placeholder="Enter capacity"
            class="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div class="modal-actions">
        <Button
          @click="onDeleteTable"
          style="
            border: 1px solid #ababab;
            background: var(--red-1);
            color: var(--white-1);
            height: 40px;
          "
        >
          Delete
        </Button>
        <Button @click="handleSave">Save</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Button from "~/components/reuse/ui/Button.vue";
import Input from "~/components/reuse/ui/Input.vue";
import { useTable } from "~/stores/setting/useTable";

const props = defineProps({
  table: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const tableStore = useTable();
const capacity = ref(props.table.capacity || 1);

// Update local state if prop changes
watch(
  () => props.table,
  (newTable) => {
    if (newTable) {
      capacity.value = newTable.capacity || 1;
    }
  },
  { immediate: true }
);

const handleSave = async () => {
  if (capacity.value < 1) return;

  await tableStore.updateTable({
    tableId: props.table.id,
    capacity: capacity.value,
  });

  emit("close");
};

const onDeleteTable = async () => {
  await tableStore.deleteTable(props.table.id);
  emit("close");
};
</script>

<style scoped>
.table-container {
  padding: 10px 20px 20px;
}

.modal-content {
  display: flex;
  flex-direction: column;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.modal-actions {
  display: flex;
  gap: 8px;
  justify-content: space-between;
}
</style>
