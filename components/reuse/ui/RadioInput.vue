<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="option in options"
      :key="option.id"
      @click="selectSize(option.display)"
      :style="{ background: selectedValue == option.display ? 'var(--primary-btn-color-2)' : null }"
      :class="[
        'px-4 py-2 border rounded transition-colors radio-btn',
        selectedValue == option.display
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      ]"
    >
      {{ option.display }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, null],
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
        selectedValue: this.value || null,
    };
  },
  methods: {
    selectSize(value) {
      this.selectedValue = value;
      this.$emit("updateValue", value);
    },
  },
};
</script>

<style scoped>
.radio-btn {
  border: 1px solid var(--gray-1);
}
</style>
