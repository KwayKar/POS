<template>
  <div class="quantity-selector w-full flex items-center bg-white">
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
      :min="min" 
      :max="max" 
      :step="step"
      class="quantity-input w-full rounded px-2 py-1 text-center"
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
  mounted() {
    console.log(this.value)
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

<style scoped>
.quantity-selector {
  border-radius: 22px;
  border: 1px solid var(--gray-1);
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