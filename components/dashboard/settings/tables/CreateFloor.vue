<template>
  <div>
    <h3 class="modal-title">Create Floor</h3>

    <div class="floor-container">
      <div class="modal-content">
        <div class="form-group flex-1">
          <label for="title" class="form-label">Floor</label>
          <Input
            v-model="floorName"
            type="text"
            placeholder="Enter floor"
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

const floorStore = useTable();
const floorName = ref("");

const handleConfirm = async () => {
  await floorStore.createFloor({ name: floorName.value });
  emit("close");
};
</script>

<style scoped>
.floor-container {
  padding: 10px 20px 20px;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
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
