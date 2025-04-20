<template>
  <button
    type="button"
    class="radio-button"
    :class="{ active: isSelected }"
    @click="$emit('update:modelValue', value)"
  >
    <span class="radio-circle" :class="{ selected: isSelected }"></span>
    <span class="radio-label" :class="{ selected: isSelected }">{{
      label
    }}</span>
  </button>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    value: {
      required: true,
    },
    modelValue: {
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  computed: {
    isSelected() {
      return this.value === this.modelValue;
    },
  },
};
</script>

<style scoped>
.radio-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px 8px 12px;
  border: 1px solid var(--gray-1);
  background-color: #fff;
  cursor: pointer;
  border-radius: 7px;
  transition: all 0.2s ease;
}

.radio-button.active {
  border-color: #d3d3d3;
  border: 1px solid var(--gray-2);
  background-color: #d3d3d3;
}

.radio-circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #666;
  display: inline-block;
  position: relative;
}

.radio-circle.selected::after {
  content: "";
  width: 8px;
  height: 8px;
  background-color: #616161;
  color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
}

.radio-label {
  font-size: 14px;
  color: var(--black-1);
}
</style>
