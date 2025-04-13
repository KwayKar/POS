<template>
  <button
    :type="type"
    :class="[
      'custom-button',
      variantClass,
      sizeClass,
      applyShadow ? 'custom-btn-shadow' : '',
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
  height: 42px;
  background-color: var(--white-1);
  color: var(--primary-text-color-1);
  font-size: var(--font-size-x-small);
  padding: 6px 32px;
  border-radius: 24px;
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s ease;
  margin-right: 3vw;
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

</style>
