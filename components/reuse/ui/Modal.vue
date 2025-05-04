<template>
  <div class="overlay" @click.self="close">
    <div
      class="modal-layer rounded shadow-lg"
      :class="modalClass"
      :style="computedModalStyles"
    >
      <div class="close-button" @click="close">
        <Icons icon="Cross" fillColor="var(--black-1)" />
      </div>

      <div
        :style="{
          height: height,
          overflow: 'hidden',
        }"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import Icons from '../icons/Icons.vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  width: { type: String, default: '700px' },
  height: { type: String, default: 'auto' },
  maxHeight: { type: String, default: '95vh' },
  minHeight: { type: [String, Number], default: '0px' },
  isFullScreenMobile: { type: Boolean, default: false }, // still allowed to be passed
});

const emit = defineEmits(['close']);

const isMobileScreen = ref(false);

// Updates only on screens <= 900px
function updateScreenStatus() {
  isMobileScreen.value = window.innerWidth <= 900;
}

onMounted(() => {
  updateScreenStatus();
  window.addEventListener('resize', updateScreenStatus);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenStatus);
});

// Combined logic: only apply prop if on mobile screen
const modalClass = computed(() => {
  return isMobileScreen.value && props.isFullScreenMobile
    ? 'modal-layout-mobile'
    : 'modal-layout';
});

const computedModalStyles = computed(() => ({
  width: props.width,
  height: props.height,
  maxHeight: props.maxHeight,
  minHeight: props.minHeight,
  position: 'relative',
}));

function setModalHeight() {
  const height = window.innerHeight;
  document.documentElement.style.setProperty('--modal-height', `${height}px`);
  document.documentElement.style.setProperty('--max-modal-height-mobile', `${height}px`);
}

function close() {
  emit('close');
}

onMounted(() => {
  setModalHeight();
});
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background-color: #0000008a;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 1s ease-in-out;
  z-index: 9999;
}
.modal-layout {
  position: relative;
  top: -3%;
  border-radius: 12px;
  background: var(--primary-bg-color-1);
}

@media screen and (max-width: 900px) {
  .modal-layout-mobile {
    position: relative;
    top: 0%;
    width: 100vw !important;
    height: 100vh !important;
    max-height: 100vh !important;
    border-radius: 0px;
    background: var(--primary-bg-color-1);
  }
}
.close-button {
  position: absolute;
  top: 2px;
  right: -50px;
  background-color: var(--white-1);
  color: var(--black-1);
  width: 35px;
  height: 35px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
}
@media screen and (max-width: 900px) {
  .close-button {
    position: absolute;
    top: 20px;
    right: 10px;
    font-size: 24px;
    font-weight: bold;
    background-color: transparent;
  }
}
</style>
