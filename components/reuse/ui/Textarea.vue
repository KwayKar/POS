<template>
    <div style="width: 100%">
      <textarea
        :id="id"
        :value="value"
        :rows="rows"
        @input="updateValue"
        class="custom-textarea"
        :placeholder="placeholder"
      ></textarea>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Textarea',
    props: {
      value: {
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
    data() {
      return {
        innerValue: this.modelValue, 
      };
    },
    watch: {
      modelValue(newValue) {
        this.innerValue = newValue; 
      },
    },
    methods: {
      updateValue(event) {
        this.$emit('input', event.target.value);  // Pass the new value to parent
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
    border: 1px solid var(--gray-1);
  }
  </style>
  