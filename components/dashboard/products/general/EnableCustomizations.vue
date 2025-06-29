<template>
  <div>
    <div class="section-title" style="display: flex; flex-direction: column; flex: 1; width: 100%;">
      <div class="section-title-row">
        <label class="form-label">{{ title }}?</label>
        <div class="wrap-toggle">
          <Toggle v-model="hasItems" />
        </div>
      </div>

      <div v-if="type === 'choice' && hasItems" class="section-max-choice">
        <label class="">Max Choice Limit</label>
        <div class="wrap-select">
          <div style="max-width: 200px;">
            <Select
              v-model="props.maxChoice" 
              @update:modelValue="(val) => emit('update:maxChoice', Number(val))"
              :options="[
                { label: '1', value: 1 },
                { label: '2', value: 2 },
                { label: '3', value: 3 }
              ]" 
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="hasItems">
      <div class="variants-list">
        <button class="add-btn" @click="openModal('select-item')">+</button>

        <div v-for="item in entries" :key="item.id" class="variant-item">
          <button
            class="remove-btn"
            @click="openModal('delete', item.id)"
          >
            ✕
          </button>

          <img
            v-if="item.image"
            class="product-color-image"
            :src="item.image"
            :alt="item.title"
          />
          <span>{{ item?.title }}</span>
        </div>
      </div>
    </div>
  </div>

  <Modal
    v-if="modal.isOpen && modal.type === 'select-item'"
    @close="closeModal"
    :width="modalWidth"
    :height="modalHeight + 'px'"
    :minHeight="'500px'"
    :isFullScreenMobile="true"
  >
    <SelectCustomizations
      :title="props.title"
      :type="props.type"
      :initial-selected="props.modelValue"
      @add-selected-items="handleSelectedItems"
      @close="closeModal"
    />
  </Modal>

  <Modal
    v-if="modal.isOpen && modal.type === 'delete'"
    width="420px"
    height="auto"
    @close="closeModal"
  >
    <ConfirmDelete
      @remove-item="removeItem"
      @close="closeModal"
    >
      Are you sure you want to delete?
    </ConfirmDelete>
  </Modal>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import Toggle from "~/components/reuse/ui/Toggle.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import ConfirmDelete from "~/components/reuse/ui/ConfirmDelete.vue";
import SelectCustomizations from "../../items/SelectCustomizations.vue";
import Select from "~/components/reuse/ui/Select.vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  maxChoice: {
    type: Number,
    default: () => 1,
  },
  type: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:modelValue", "update:maxChoice"]);
const windowWidth = ref(0);

const modal = ref({ type: "", isOpen: false, selectedItem: null });
const hasItems = ref(false);
const entries = ref([...props.modelValue]);

const handleSelectedItems = (selectedItems) => {
  const existingIds = entries.value.map((p) => p.id);
  const newEntries = selectedItems && selectedItems
    .filter((p) => !existingIds.includes(p.id))
    .map((p) => ({
      ...p,
      image: p.image || null,
    }));

  entries.value.push(...newEntries);

  emit("update:modelValue", entries.value); 
  closeModal();
};

const removeItem = () => {
  const updatedValue = entries.value && entries.value.filter(p => p.id !== modal.value.selectedItem);
  emit("update:modelValue", updatedValue); 
  closeModal();
};

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

const modalWidth = computed(() => {
  if (windowWidth.value > 1200) {
    return "1200px";
  } else if (windowWidth.value > 1100) {
    return `${windowWidth.value - 100}px`;
  } else {
    return `${windowWidth.value - 120}px`;
  }
});

const modalHeight = computed(() => {
  if (windowWidth.value > 900) {
    return "700px";
  } else {
    return `auto`;
  }
});

const openModal = (type, id) => {
  modal.value = {
    type,
    isOpen: true,
    selectedItem: id
  };
};

const closeModal = () => {
  modal.value = {
    type: "",
    isOpen: false,
    selectedItem: null
  };
};

onMounted(() => {
  updateWindowWidth();
  window.addEventListener("resize", updateWindowWidth);

  if (entries.value.length > 0) {
    hasItems.value = true;
  }
});

watch(
  () => props.modelValue,
  (newValue) => {
    entries.value = [...newValue];
    hasItems.value = entries.value.length > 0;
  },
  { immediate: true }
);
</script>

<style scoped>
.section-title {
  margin: 32px 0 20px;
  display: flex;
  align-items: center;
}
.section-title > label {
  font-size: 1.05rem;
  margin-right: 32px;
  flex: 1;
}

.section-max-choice {
  width: 100%;
  display: flex;
  margin: 1.25rem 0; 
}
.section-max-choice > label {
  font-size: 0.9rem;
  flex: 1;
  display: flex;
  align-items: center;
}

.section-title-row {
  display: flex;
  align-items: center;
  width: 100%;
}

.section-title-row > label {
  font-size: 1.05rem;
  margin-right: 32px;
  flex: 1;
}

.wrap-toggle {
  display: flex;
  align-items: center;
}

.variants-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  border-bottom: 1px solid var(--gray-1);
  padding-bottom: 30px;
}

.wrap-select {
  flex: 1;
}

.wrap-toggle {
  flex: 1; 
  display: flex; 
  align-items: center;
}

.add-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 105px;
  font-size: 2rem;
  background-color: #f7f7f7;
  border: 1px dashed #7f7f7f;
  color: var(--black-2);
  border-radius: 8px;
  margin-right: 8px;
  cursor: pointer;
}

.variant-item {
  position: relative;
  width: auto;
  height: 105px;
  margin-right: 8px;
  background-color: #f7f7f7;
  padding: 6px 8px;
  border-radius: 8px;
  font-size: 14px;
  border: 1px solid var(--gray-1);
  text-align: center;
}

.variant-item span {
  font-size: 12px;
  color: var(--black-2);
}

.product-color-image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 6px;
}

.remove-btn {
  position: absolute;
  top: -10px;
  right: -10px;
  background: var(--white-1);
  border: 1px solid var(--gray-2);
  font-size: 12px;
  padding: 0px;
  margin: 0px;
  width: 28px;
  height: 28px;
  cursor: pointer;
}
</style>
