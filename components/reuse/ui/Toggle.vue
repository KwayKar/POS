<template>
  <button
    class="toggle"
    @click="$emit('update:modelValue', !modelValue)"
    :class="{ active: modelValue }"
    aria-pressed="modelValue"
  >
    <span class="toggle-circle"></span>
  </button>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
});
defineEmits(["update:modelValue"]);
</script>

<style scoped>
.toggle {
  width: 44px;
  height: 24px;
  background-color: #ccc;
  border-radius: 9999px;
  position: relative;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toggle-circle {
  width: 18px;
  height: 18px;
  background-color: var(--white-1);
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  transition: transform 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.toggle.active {
  background-color: var(--primary-btn-color); 
}

.toggle.active .toggle-circle {
  transform: translateX(20px);
}
</style>
