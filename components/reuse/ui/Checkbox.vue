<template>
    <div class="custom-checkbox">
      <input
        type="checkbox"
        :id="id"
        :checked="modelValue"
        @change="handleChange"
      />
      <label :for="id" @click="toggleCheckbox">
        <span class="checkbox-box" :style="modelValue ? { backgroundColor: checkedColor, borderColor: checkedColor } : {}">
          <svg v-if="modelValue" class="tick-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
            <path d="M20.285 2L9 13.313 3.714 8.028 0 11.742 9 20.742 24 5.714z" />
          </svg>
        </span>
        <slot></slot>
      </label>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      modelValue: {
        type: Boolean,
        default: false,
      },
      id: {
        type: String,
        required: true,
      },
      checkedColor: {
        type: String,
        default: "var(--dark-gray-1)", 
      },
    },
    methods: {
      handleChange(event) {
        this.$emit("update:modelValue", event.target.checked);
      },
      toggleCheckbox() {
        this.$emit("update:modelValue", !this.modelValue);
      },
    },
  };
  </script>
  
  <style scoped>
  .custom-checkbox {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .custom-checkbox input {
    opacity: 0;
    position: absolute;
  }
  
  .custom-checkbox label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .checkbox-box {
    width: 20px;
    height: 20px;
    border: 2px solid #232323;
    border-radius: 4px;
    margin-right: 10px;
    position: relative;
    transition: background-color 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .custom-checkbox input:checked + label .checkbox-box {
    background-color: var(--dark-gray-1);
    border-color: var(--dark-gray-1);
  }
  
  .tick-icon {
    width: 10px;
    height: 10px;
  }
  
  .custom-checkbox label {
    font-size: 16px;
    color: #333;
    user-select: none;
  }
  </style>