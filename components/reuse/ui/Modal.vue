<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    style="z-index: 9999"
    @click.self="close"
  >
    <div
      class="bg-white rounded shadow-lg modal-layout"
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
import Icons from '../icons/Icons.vue';

export default {
  components: {
    Icons
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
      default: "650px",
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
.modal-layout {
  position: relative;
  top: -3%;
}
@media screen and (max-width: 600px) {
  .modal-layout {
    overflow-y: auto;
    top: 5%;
    height: var(--modal-height);
    max-height: var(--modal-height) !important;
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
@media screen and (max-width: 800px) {
  .close-button {
    top: -50px;
    right: 10px;
  }
}
@media screen and (max-width: 600px) {
  .close-button {
    position: fixed;
    top: 25px;
    right: 10px;
  }
}
</style>
