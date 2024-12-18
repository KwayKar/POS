<template>
    <button
      :type="type"
      :class="['px-4 py-2 rounded focus:outline-none transition', variantClass, sizeClass, $attrs.class]"
      v-bind="$attrs"
      @click="$emit('click')"
    >
      <slot />
    </button>
  </template>
  
  <script>
  export default {
    name: 'Button',
    props: {
      type: {
        type: String,
        default: 'button',
      },
      variant: {
        type: String,
        default: 'primary', 
      },
      size: {
        type: String,
        default: 'medium', 
      },
    },
    computed: {
      variantClass() {
        switch (this.variant) {
          case 'secondary':
            return 'bg-gray-500 text-white hover:bg-gray-600';
          case 'danger':
            return 'bg-red-500 text-white hover:bg-red-600';
          default:
            return 'bg-blue-500 text-white hover:bg-blue-600';
        }
      },
      sizeClass() {
        switch (this.size) {
          case 'small':
            return 'text-sm';
          case 'large':
            return 'text-lg';
          default:
            return 'text-base';
        }
      },
    },
  };
  </script>
  
  <style>
  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  </style>