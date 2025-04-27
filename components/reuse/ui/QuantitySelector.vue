<template>
  <div :class="['quantity-selector', { 'focused': isFocused }]" class="quantity-selector w-full flex items-center bg-white">
    <button
      @click="decrement"
      :disabled="value <= min"
      class="button ml-2 my-2"
    >
      -
    </button>
    <input
      type="text"
      :value="value"
      @input="onInput"
      @keypress="onlyAllowNumbers"
      :min="min"
      :max="max"
      :step="step"
      class="quantity-input w-full rounded px-2 py-1 text-center"
      @focus="isFocused = true"
      @blur="isFocused = false"
      style="border: none; outline: none"
    />
    <button
      @click="increment"
      :disabled="value >= max"
      class="button mr-2 my-2"
    >
      +
    </button>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const isFocused = ref(false);

const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 1000,
  },
  step: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["updateValue"]);

const increment = () => {
  if (props.value + props.step <= props.max) {
    triggerFocusEffect();
    emitValueChange(props.value + props.step);
  }
};

const decrement = () => {
  if (props.value - props.step >= props.min) {
    triggerFocusEffect();
    emitValueChange(props.value - props.step);
  }
};

const triggerFocusEffect = () => {
  isFocused.value = true;
  setTimeout(() => {
    isFocused.value = false;
  }, 600);
};

const onInput = (event) => {
  let newValue = event.target.value.replace(/[^0-9]/g, "");

  if (newValue === "") {
    newValue = 0;
  } else {
    newValue = parseInt(newValue, 10);
  }

  if (!isNaN(newValue) && newValue >= props.min && newValue <= props.max) {
    emitValueChange(newValue);
  }
};

const emitValueChange = (newValue) => {
  emit("updateValue", newValue);
};

const onlyAllowNumbers = (event) => {
  const char = String.fromCharCode(event.keyCode);
  if (!/[0-9]/.test(char)) {
    event.preventDefault();
  }
};
</script>


<style scoped>
.quantity-selector {
  border-radius: 22px;
  border: 1px solid var(--gray-1);
  transition: border-color 0.2s ease;

}
.quantity-selector.focused {
  border-color: var(--primary-btn-color);
}
.button {
  width: 40px;
  height: 30px;
  border: 1px solid var(--gray-2);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-self: center;
  font-size: 1.2rem;
  box-sizing: border-box;
}
</style>
