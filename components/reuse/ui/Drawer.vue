<template>
  <teleport to="#modal-root">
    <transition name="slide">
      <div class="drawer" v-if="isOpen">
        <div class="drawer-header">
          <h2 class="header2">Categories</h2>
          <button class="close-btn" @click="emit('close')">✕</button>
        </div>
        
        <div class="drawer-body">
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
defineProps({
  items: Array,
  isOpen: Boolean,
});
const emit = defineEmits(["close"]);
</script>

<style scoped>
.drawer {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: var(--white-1);
  z-index: 9999;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.15);
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--gray-1);
}

.drawer-body {
  padding: 1rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateY(100%);
}
.slide-leave-to {
  transform: translateY(100%);
}
</style>
