<template>
  <input
    :type="type"
    :placeholder="placeholder"
    v-model="value"
    :class="'w-full px-4 py-2 border rounded'"
    :style="inputStyle"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  name: "Input",
  data() {
    return {
      value: this.modelValue, 
    };
  },
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number], 
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputStyle() {
      return {
        "--color": this.error ? "red" : "blue", 
      };
    },
    value: {
      get() {
        return this.modelValue;
      },
      set(newValue) {
        this.$emit('update:modelValue', newValue);
      },
    },
  },
};
</script>

<style scoped>
input {
  border: 1px solid var(--gray-1); 
  outline: none;
}

input:focus {
  border-color: var(--primary-btn-color); 
}

input:disabled {
  background-color: #f3f4f6; 
  cursor: not-allowed;
}
</style>
