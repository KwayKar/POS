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
  padding: 0.5rem;     
  box-sizing: border-box;
  outline: none;
  border: 1px solid #232323; 
  border-radius: 7px;

}

.custom-textarea:focus {
  border-color: rgb(155, 246, 155);
  outline: 2px solid var(--gray-1);  
}
</style>
