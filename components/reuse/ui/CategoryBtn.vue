<template>
  <button
    :type="type"
    :class="[
      'custom-button',
      'custom-btn-primary',
      sizeClass,
      applyShadow ? 'custom-btn-shadow' : '',
      { 'custom-btn-active': isActive },
      $attrs.class,
    ]"
    :style="{ backgroundColor: background, color: color }"
    v-bind="$attrs"
    @click="$emit('click')"
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
    size: {
      type: String,
      default: "medium",
    },
    background: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    applyShadow: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isActive() {
      return this.active;
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
  background-color: var(--white-1);
  color: var(--primary-text-color-1);
  font-size: var(--font-size-x-small);
  padding: 6px 32px;
  border: 1px solid var(--black-2);
  border-radius: 24px;
  margin-right: 12px;
  transition: background-color 0.3s ease;
}

.custom-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.custom-button:hover {
  opacity: 0.85;
  background: var(--black-1);
  color: var(--white-1);
}

.custom-btn-primary {
  background-color: var(--white-1);
  color: var(--primary-text-color-1);
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

.custom-btn-shadow {
  box-shadow: var(--box-shadow-2);
}

.custom-btn-active {
  background-color: var(--black-2);
  color: var(--white-1);
}
</style>
