<template>
  <div class="rounded-md">
    <div class="item-selector">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="item-box"
        @click="toggleRemoval(item)"
        :style="{ 
          // width: item?.image ? '170px' : undefined,
          borderRadius: item?.image ? '12px' : '24px',
          textWrap: !item?.image ? 'nowrap' : 'wrap'
        }"
        :class="{ selected: isSelected(item) }"
      >
        <div class="image" v-if="item.image">
          <img :src="item.image" alt="Add/Removal Image" />
        </div>
        {{ item.title }}
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
  selectdValues: {
    type: Array,
    default: null,
  }
});

const emit = defineEmits(["updateValue"]);

const selectedRemovals = ref([]);

const toggleRemoval = (removal) => {
  const index = selectedRemovals.value.findIndex(
    (r) => r.id === removal.id
  );
  if (index === -1) {
    selectedRemovals.value.push(removal);
  } else {
    selectedRemovals.value.splice(index, 1);
  }
  emit("updateValue", selectedRemovals.value);
};

onMounted(() => {
  if (props.selectdValues && props.selectdValues.length > 0) {
    selectedRemovals.value = [...props.selectdValues];
  }
});

const isSelected = (removal) => {
  return selectedRemovals.value.some((r) => r.id === removal.id);
};

watch(
  () => props.selectdValues,
  (newVal) => {
    if (newVal?.length) {
      selectedRemovals.value = [...newVal];
    }
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
.item-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: flex-start;
}

.item-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 0 1 calc(33.333% - 16px);
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 24px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  background-color: var(--white-1);
  transition: background 0.2s;
}
@media screen and (max-width: 700px) {
  .item-box {
    flex: 0 1 calc(50% - 10px);
    box-sizing: border-box;
  }
}

.item-box + .item-box {
  margin-left: -1px;
}

.image img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-bottom: 12px;
}

.item-box.selected {
  background-color: #f7cdcd;
  border-color: var(--red-1);
}

.item-box.selected > .image {
  opacity: 0.5;  
}
</style>
