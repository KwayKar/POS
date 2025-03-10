<template>
  <h3 class="text-lg font-semibold my-2 text-style">
    <slot></slot>
  </h3>
</template>

<script>
export default {
  name: "FormTitle",
};
</script>

<style scoped>
.text-style {
    color: var(--black-1);
}
</style>
