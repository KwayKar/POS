<template>
  <div ref="floorRef" class="container">
    <div
      class="form-group"
      style="width: 100%; margin-top: 0; margin-bottom: 0"
    >
      <div class="floor-section">
        <label for="category" class="form-label">Floors</label>
      </div>
    </div>

    <div class="floor-list" :style="{ width: parentWidth + 'px' }">
      <Button
        v-for="(floor, index) in props.floors"
        :key="floor.id"
        @click="setSelectedFloor(floor)"
        :variant="selectedFloor?.id === floor.id ? 'primary' : 'secondary'"
      >
        {{ floor.name }}
      </Button>
    </div>

    <div
      class="form-group"
      style="width: 100%; margin-top: 1rem; margin-bottom: 0"
    >
      <div class="floor-section">
        <label for="category" class="form-label">Tables</label>
      </div>
    </div>

    <div
      class="table-list"
      v-if="selectedFloor?.tables && selectedFloor?.tables?.length"
    >
      <div
        v-for="table in selectedFloor.tables"
        :key="table.id"
        class="table-item"
        @click="onSelectTable(table.id)"
      >
        {{ table.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick } from "vue";
import { ref, onMounted } from "vue";
import Button from "~/components/reuse/ui/Button.vue";
import { useOrder } from "~/stores/order/useOrder";

const orderStore = useOrder();

const floorRef = ref(null);
const parentWidth = ref(0);
const selectedFloor = ref(null);

const props = defineProps({
  floors: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["close"]);

onMounted(() => {
  nextTick(() => {
    if (floorRef.value) {
      parentWidth.value = floorRef.value.offsetWidth;
    }
  });
  if (props.floors.length) {
    selectedFloor.value = props.floors[0];
  }
});

const setSelectedFloor = (floor) => {
  selectedFloor.value = floor;
};

const onSelectTable = async (tableId) => {
  await orderStore.setTableId(tableId);
  emit("close");
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 1rem 1.4rem 1.4rem;
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
</style>
