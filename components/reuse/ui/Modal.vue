<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="close"
  >
    <div
      class="bg-white rounded shadow-lg relative overflow-none"
      :style="computedModalStyles"
      style="position: relative; top: -5%"
    >
      <div
        class="absolute top-2 right-[-50px] bg-gray-300 text-black w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
        @click="close"
      >
        ✕
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
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
    close() {
      this.$emit("close");
    },
  },
};
</script>
