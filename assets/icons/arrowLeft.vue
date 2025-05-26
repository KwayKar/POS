<template>
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    :fill="fill"
  >
    <path d="M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"></path>
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [Number, String],
    default: 24,
  },
  fill: {
    type: String,
    default: "none",
  },
});
</script>
