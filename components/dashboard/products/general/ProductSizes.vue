<template>
  <div>
    <div class="section-title">
      <label class="form-label">{{ label }}</label>
      <Toggle v-model="hasSizes" />
    </div>

    <div v-if="hasSizes">
      <div class="flex mb-2">
        <label class="form-label flex-1">Size</label>
        <label class="form-label flex-1">{{ secondLabel }}</label>
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
          class="text-red-500 font-bold"
          @click="removeEntry(index)"
        >
          ✕
        </button>
      </div>

      <Button
        type="button"
        @click="addEntry"
        style="font-size: 1rem; height: 38px; border: 1px solid var(--black-1)"
      >
        Add
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Button from "~/components/reuse/ui/Button.vue";
import Input from "~/components/reuse/ui/Input.vue";
import Toggle from "~/components/reuse/ui/Toggle.vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
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
const emit = defineEmits(["update:modelValue"]);

const hasSizes = ref(false);
const entries = ref([...props.modelValue]);

onMounted(() => {
  if (entries.value.length > 0) {
    hasSizes.value = true;
  }
});

watch(
  entries,
  (val) => {
    emit("update:modelValue", val);
  },
  { deep: true }
);

watch(hasSizes, (value) => {
  if (value && entries.value.length === 0) {
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
}
</style>
