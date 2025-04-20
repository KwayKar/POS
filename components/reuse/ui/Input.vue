<template>
  <input
    :type="type"
    :placeholder="placeholder"
    v-model="value"
    :class="'w-full px-4 py-2'"
    :style="inputStyle"
    :min="type === 'number' ? min : null"
    :max="type === 'number' ? max : null"
    :inputmode="type === 'number' ? 'numeric' : null"
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
    modelValue: {
      type: [String, Number],
    },
    error: {
      type: Boolean,
      default: false,
    },
    min: {
      type: [Number, String],
      default: null,
    },
    max: {
      type: [Number, String],
      default: null,
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
        this.$emit("update:modelValue", newValue);
      },
    },
  },
};
</script>

<style scoped>
input {
  background: var(--white-1);
  color: var(--black-1);
  border: 1px solid var(--gray-1);
  border-radius: 7px;
  outline: none;
  height: 46px;
}

input:focus {
  border-color: rgb(107, 179, 107);

}

input:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
input:-webkit-autofill {
  background-color: transparent;
  transition: background-color 5000s ease-in-out 0s;
  -webkit-text-fill-color: #000 !important;
}
</style>
