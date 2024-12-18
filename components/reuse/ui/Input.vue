<template>
  <input
    :type="type"
    :placeholder="placeholder"
    v-bind="$attrs"
    :class="
      'w-full px-4 py-2 border rounded focus:outline-none focus:ring transition ' +
      inputClass
    "
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  name: "Input",
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputClass() {
      return this.error
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-blue-500";
    },
  },
};
</script>

<style>
input:disabled {
  background-color: #f3f4f6; 
  cursor: not-allowed;
}
</style>
