<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.232 5.232L18.768 8.768M4 20H8.5L18.768 9.732C19.0572 9.44284 19.0572 8.98449 18.768 8.69533L15.3047 5.232C15.0155 4.94284 14.5572 4.94284 14.268 5.232L4 15.5V20Z"
      stroke="#000"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M13.5 6.5L17.5 10.5"
      stroke="#000"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
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
