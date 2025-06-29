<template>
  <teleport to="#modal-root">
    <transition name="fade">
      <div v-if="isOpen" class="drawer-backdrop" @click="emit('close')"></div>
    </transition>
    <transition name="slide">
      <div
        :class="['drawer', direction]"
        v-if="isOpen"
        :style="{
          width: width || undefined,
          height: height || undefined,
          background
        }"
      >
        <div class="drawer-header">
          <h3 class="header3">{{ title }}</h3>
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
  isOpen: Boolean,
  title: {
    type: String,
    default: "",
  },
  direction: {
    type: String,
    default: "right", // or "bottom"
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "100vh",
  },
  background: {
    type: String,
    default: "#fff",
  },
});
const emit = defineEmits(["close"]);
</script>

<style scoped>
.drawer {
  position: fixed;
  background: var(--white-1);
  z-index: 9999;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.15);
}

.drawer.right {
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
}

.drawer.bottom {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
}

/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.drawer.right.slide-enter-from,
.drawer.right.slide-leave-to {
  transform: translateX(100%);
}

.drawer.bottom.slide-enter-from,
.drawer.bottom.slide-leave-to {
  transform: translateY(100%);
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9rem;
  margin-bottom: 0.85rem;
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

.drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9998;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
