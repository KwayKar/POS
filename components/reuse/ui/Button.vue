<template>
  <button
    :type="type"
    :class="[
      'custom-button', 
      variantClass, 
      sizeClass, 
      applyShadow ? 'custom-btn-shadow' : '',
    ]"
    :style="{ backgroundColor: background, color: color }"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    type: {
      type: String,
      default: "button",
    },
    variant: {
      type: String,
      default: "primary",
    },
    size: {
      type: String,
      default: "medium",
    },
    background: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    applyShadow: {
      type: Boolean,
      default: false, 
    },
  },
  computed: {
    variantClass() {
      switch (this.variant) {
        case "secondary":
          return "custom-btn-secondary";
        case "danger":
          return "custom-btn-danger";
        default:
          return "custom-btn-primary";
      }
    },
    sizeClass() {
      switch (this.size) {
        case "small":
          return "custom-btn-small";
        case "large":
          return "custom-btn-large";
        default:
          return "custom-btn-medium";
      }
    },
  },
};
</script>

<style scoped>
.custom-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--black-1);
  color: var(--white-1);
  font-size: var(--font-size-x-small);
  border: 1px solid var(--white-1);
  padding: 6px 32px;
  border-radius: 24px;
  transition: background-color 0.3s ease;
}

.custom-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.custom-button:hover {
  opacity: 0.85;
  background-color: var(--white-1);
  color: var(--black-1);
  border: 1px solid var(--black-1);
}

.custom-btn-primary {
  background-color: var(--black-2);
  color: var(--white-1);
}

.custom-btn-secondary {
  background-color: var(--white-1);
  color: var(--primary-text-color-1);
}
.custom-btn-secondary:hover {
  opacity: 0.85;
  background-color: var(--black-1);
  color: var(--white-1);
  border: 1px solid var(--black-1);
}

.custom-btn-danger {
  background-color: var(--red-1);
  color: var(--white-1);
  border: 1px solid #c67070 !important;
}
.custom-btn-danger:hover {
  opacity: 1;
  background-color: var(--red-1);
  color: var(--white-1);
}

.custom-btn-small {
  font-size: 12px;
  padding: 4px 16px;
}

.custom-btn-medium {
  font-size: 15px;
  padding: 6px 32px;
}

.custom-btn-large {
  font-size: 20px;
  padding: 8px 48px;
}

.custom-btn-shadow, .custom-btn-danger {
  box-shadow: var(--box-shadow-2);
}
</style>
