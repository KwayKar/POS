<template>
  <div class="overlay" @click.self="close">
    <div
      class="modal-layer rounded shadow-lg"
      :class="isFullScreenMobile ? 'modal-layout-mobile' : 'modal-layout'"
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

<script>
import Icons from "../icons/Icons.vue";

export default {
  components: {
    Icons,
  },
  props: {
    width: {
      type: String,
      default: "700px",
    },
    height: {
      type: String,
      default: "auto",
    },
    maxHeight: {
      type: String,
      default: "95vh",
    },
    minHeight: {
      type: [String, Number],
      default: "0px",
    },
    isFullScreenMobile: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedModalStyles() {
      return {
        width: this.width,
        height: this.height,
        maxHeight: this.maxHeight,
        minHeight: this.minHeight,
        position: 'relative'
      };
    },
  },
  methods: {
    setModalHeight() {
      const height = window.innerHeight;
      document.documentElement.style.setProperty(
        "--modal-height",
        `${height}px`
      );
      document.documentElement.style.setProperty(
        "--max-modal-height-mobile",
        `${height}px`
      );
    },
    close() {
      this.$emit("close");
    },
  },
  mounted() {
    this.setModalHeight();
    window.addEventListener("resize", this.setModalHeight);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.setModalHeight);
  },
};
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
