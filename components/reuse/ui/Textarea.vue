<template>
    <div style="width: 100%">
      <textarea
        :id="id"
        :value="preferences"
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
      modelValue: {
        type: String,
        required: true,
      },
      placeholder: {
        type: String,
        default: 'Enter..',
      },
      rows: {
        type: Number,
        default: 3,
      },
      placeholder: {
        type: String,
        default: 'Enter your preferences...',
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
    box-sizing: border-box;
    outline: none;
    padding: 0.5rem;     
  }
  </style>
  