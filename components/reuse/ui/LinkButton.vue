<template>
  <component
    :is="href.startsWith('/') ? 'nuxt-link' : 'a'"
    :to="href.startsWith('/') ? href : undefined"
    :href="href.startsWith('/') ? undefined : href"
    :target="target"
    :rel="rel"
    :class="[
      'px-4 py-2 rounded focus:outline-none transition inline-block',
      sizeClass
    ]"
    class="link"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: "Link",
  props: {
    href: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      default: "_self", 
    },
    rel: {
      type: String,
      default: "noopener",
    },
    size: {
      type: String,
      default: "medium",
    },
    disabled: {
      type: Boolean,
      default: false, 
    },
  },
  computed: {
    sizeClass() {
      switch (this.size) {
        case "small":
          return "text-sm";
        case "large":
          return "text-lg";
        default:
          return "text-base";
      }
    },
  },
};
</script>

<style>
.link {
  background: var(--primary-btn-color);
  color: #fff;
}

</style>
