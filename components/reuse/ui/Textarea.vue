<template>
  <div style="width: 100%">
    <textarea
      v-model="inputValue"  
      :rows="rows"
      class="custom-textarea"
      :placeholder="placeholder"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'Textarea',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
    },
    rows: {
      type: Number,
      default: 3,
    },
  },
  computed: {
    inputValue: {
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
.custom-textarea {
  width: 100% !important;
  resize: none;
  padding: 0.5rem 1rem;     
  box-sizing: border-box;
  outline: none;
  border: 1px solid var(--gray-1); 
  border-radius: 7px;
  color: var(--black-1);
}

.custom-textarea:focus {
  border: 1px solid var(--primary-btn-color);
}
</style>
