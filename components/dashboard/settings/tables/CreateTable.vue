<template>
  <div>
    <h3 class="modal-title">Create Table</h3>

    <div class="table-container">
      <div class="modal-content">
        <div class="form-group flex-1">
          <label for="prefix" class="form-label">Table Name Prefix</label>
          <Input
            v-model="tablePrefix"
            type="text"
            placeholder="e.g., T, Table"
            class="w-full p-2 border rounded"
          />
        </div>

        <div class="form-group flex-1">
          <label for="count" class="form-label">Number of Tables</label>
          <Input
            v-model.number="tableCount"
            type="number"
            min="1"
            placeholder="0"
            class="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div class="modal-actions">
        <Button @click="handleConfirm">Confirm</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Button from "~/components/reuse/ui/Button.vue";
import Input from "~/components/reuse/ui/Input.vue";
import { useTable } from "~/stores/setting/useTable";

const emit = defineEmits(["close"]);

const tableStore = useTable();

const tablePrefix = ref("T");
const tableCount = ref(5);

const handleConfirm = async () => {
  if (!tablePrefix.value || tableCount.value < 1) return;

  await tableStore.createTables({
    prefix: tablePrefix.value,
    count: tableCount.value,
  });
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
  justify-content: flex-end;
}
</style>
