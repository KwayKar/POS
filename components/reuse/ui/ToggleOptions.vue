<template>
  <div class="rounded-md">
    <div class="item-selector">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="item-box"
        @click="toggleRemoval(item)"
        :class="{ selected: isSelected(item) }"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:selectedRemovals"]);

const selectedRemovals = ref([]);

const toggleRemoval = (removal) => {
  const index = selectedRemovals.value.findIndex(
    (r) => r.label === removal.label
  );
  if (index === -1) {
    selectedRemovals.value.push(removal);
  } else {
    selectedRemovals.value.splice(index, 1);
  }
  emit("update:selectedRemovals", selectedRemovals.value);
};

const isSelected = (removal) => {
  return selectedRemovals.value.some((r) => r.label === removal.label);
};
</script>

<style scoped>
.item-selector {
  display: flex;
  flex-wrap: wrap;
}

.item-box {
  padding: 10px 16px;
  border: 1px solid #ccc;
  border-radius: 24px;
  margin-right: 12px;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  background-color: var(--white-1);
  transition: background 0.2s;
}

.item-box + .item-box {
  margin-left: -1px;
}

.item-box.selected {
  background-color: var(--red-1);
  color: var(--white-1);
  border-color: var(--red-1);
}
</style>
