<template>
  <div class="quantity-selector">
    <button @click="decrement" :disabled="value <= min">-</button>
    <input 
      type="number" 
      :value="value" 
      @input="onInput" 
      :min="min" 
      :max="max" 
      :step="step"
    />
    <button @click="increment" :disabled="value >= max">+</button>
  </div>
</template>

<script>
export default {
  name: "QuantitySelector",
  props: {
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
  },
  methods: {
    increment() {
      if (this.value + this.step <= this.max) {
        this.emitValueChange(this.value + this.step);
      }
    },
    decrement() {
      if (this.value - this.step >= this.min) {
        this.emitValueChange(this.value - this.step);
      }
    },
    onInput(event) {
      let newValue = parseInt(event.target.value, 10);
      if (!isNaN(newValue) && newValue >= this.min && newValue <= this.max) {
        this.emitValueChange(newValue);
      }
    },
    emitValueChange(newValue) {
      this.$emit("updateValue", newValue);
    },
  },
};
</script>
