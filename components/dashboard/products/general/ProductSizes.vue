<template>
  <div>
    <div class="section-title">
      <label class="form-label">{{ label }}</label>
      <div class="wrap-toggle">
        <Toggle v-model="hasSizesComputed" />
      </div>
    </div>

    <div v-if="hasSizes">
      <div v-if="entries.length" class="flex gap-4 mb-2" style="padding-right: 40px; box-sizing: border-box;">
        <label class="flex-1">Size</label>
        <label class="flex-1">{{ secondLabel }}</label>
      </div>

      <div
        v-for="(entry, index) in entries"
        :key="index"
        class="flex gap-4 mb-3"
      >
        <div class="flex-1">
          <Input v-model="entry.label" placeholder="Size" class="form-input" />
        </div>
       
        <div class="flex-1">
          <Input
            :type="secondType"
            v-model="entry[secondKey]"
            :placeholder="secondLabel"
            class="form-input"
            :min="secondType === 'number' ? 0 : undefined"
          />
        </div>
        <button
          type="button"
          class="remove-btn text-red-500 font-bold"
          @click="openModal('delete', index)"
        >
          ✕
        </button>
      </div>

      <Button
        type="button"
        @click="addEntry"
        style="font-size: 0.9rem; height: 34px; border: 1px solid var(--black-1)"
      >
        Add
      </Button>
    </div>
  </div>

  <Modal
    v-if="modal.isOpen && modal.type === 'delete'"
    width="420px"
    height="auto"
    @close="closeModal"
  >
    <ConfirmDelete
      @remove-item="() => {
        removeEntry(modal.selectedIndex);
        closeModal();
      }"
      @close="closeModal"
    >
      Are you sure you want to delete?
    </ConfirmDelete>
  </Modal>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Button from "~/components/reuse/ui/Button.vue";
import ConfirmDelete from "~/components/reuse/ui/ConfirmDelete.vue";
import Input from "~/components/reuse/ui/Input.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import Toggle from "~/components/reuse/ui/Toggle.vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  hasSizes: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "Enable option?",
  },
  secondLabel: {
    type: String,
    default: "Value",
  },
  secondKey: {
    type: String,
    default: "value",
  },
  secondType: {
    type: String,
    default: "number",
  },
});
const emit = defineEmits(["update:modelValue", "update:hasSizes"]);

const entries = computed({
  get() {
    return Array.isArray(props.modelValue) ? props.modelValue : [];
  },
  set(val) {
    emit("update:modelValue", val);
  },
});
const modal = ref({ type: "", isOpen: false, selectedIndex: null });

const openModal = (type, index) => {
  modal.value = {
    type,
    isOpen: true,
    selectedIndex: index
  };
};

const closeModal = () => {
  modal.value = {
    type: "",
    isOpen: false,
    selectedIndex: null
  };
};

watch(
  () => props.modelValue,
  (newVal) => {
    const normalized = Array.isArray(newVal) ? [...newVal] : [];
    entries.value = normalized;

    if (props.hasSizes && normalized.length === 0) {
      entries.value.push({
        label: "",
        [props.secondKey]: props.secondType === "number" ? 0 : "",
      });
    }
  },
  { immediate: true, deep: true }
);

watch(
  entries,
  (val) => {
    emit("update:modelValue", val);
  },
  { deep: true }
);

const hasSizesComputed = computed({
  get: () => props.hasSizes,
  set: (val) => emit("update:hasSizes", val),
});

watch(hasSizesComputed, (val) => {
  if (val && entries.value.length === 0) {
    entries.value.push({
      label: "",
      [props.secondKey]: props.secondType === "number" ? 0 : "",
    });
  }
});

const addEntry = () => {
  entries.value.push({
    label: "",
    [props.secondKey]: props.secondType === "number" ? 0 : "",
  });
};

const removeEntry = (index) => {
  entries.value.splice(index, 1);
};
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

.wrap-toggle {
  flex: 1; 
  display: flex; 
  align-items: center;
}

</style>
