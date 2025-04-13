<template>
  <div class="overlay" @click.self="close">
    <div
      class="rounded shadow-lg modal-layout"
      :style="computedModalStyles"
    >
      <div class="close-button" @click="close">
        <Icons icon="Cross" fillColor="var(--black-1)" />
      </div>
      <slot></slot>
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
  },
  computed: {
    computedModalStyles() {
      return {
        width: this.width,
        height: this.height,
        maxHeight: this.maxHeight,
        minHeight: this.minHeight,
      };
    },
  },
  methods: {
    setModalHeight() {
      const height = window.innerHeight - 100;
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
  background-color: rgba(0, 0, 0, 0.44);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 1s ease-in-out;
  z-index: 9999;
}
@media screen and (max-width: 900px) {
  .overlay {
    align-items: flex-end;
  }
}

.modal-layout {
  position: relative;
  top: -3%;
  border-radius: 12px;
  background: var(--primary-bg-color-1);

}

@media screen and (max-width: 900px) {
  .modal-layout {
    overflow-y: auto;
    top: 0%;
    width: 100vw !important;
    height: 92vh !important;
    max-height: 100vh !important;
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
    position: fixed;
    top: 90px;
    right: 10px;
    font-size: 24px;
    font-weight: bold;
    background-color: transparent;
  }
}
</style>
