import { ref, onMounted, onUnmounted } from "vue";

export function useWindowSize() {
  const width = ref(0);
  const height = ref(0);

  const updateSize = () => {
    if (typeof window !== "undefined") {
      width.value = window.innerWidth;
      height.value = window.innerHeight;
    }
  };

  onMounted(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateSize);
  });

  return {
    width,
    height,
  };
}
