<template>
  <Modal
    v-if="displayModal"
    :width="modalWidth"
    :height="modalHeight"
    :minHeight="'400px'"
    :isFullScreenMobile="true"
    @close="closeModal"
  >
    <Settings />
  </Modal>
</template>

<script setup>
//   import { storeToRefs } from "pinia";
//   import { useMenu } from "~/stores/menu/useMenu";
import Modal from "~/components/reuse/ui/Modal.vue";
import Settings from "./Settings.vue";
import { useSetting } from "~/stores/setting/useSetting";

//   const menu = useMenu();
//   const { items, selectedCategory, selectedItems } = storeToRefs(menu);

const windowHeight = ref(0);
const windowWidth = ref(0);
const setting = useSetting();
const { displayModal } = storeToRefs(setting);

const updatePanelSize = () => {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;
};

onMounted(async () => {
  await nextTick();
  updatePanelSize();
  window.addEventListener("resize", updatePanelSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", updatePanelSize);
});

const modalWidth = computed(() => {
  if (windowWidth.value > 1200) {
    return "1100px";
  } else if (windowWidth.value > 1100) {
    return `${windowWidth.value - 100}px`;
  } else {
    return `${windowWidth.value - 120}px`;
  }
});

const modalHeight = computed(() => {
  if (windowWidth.value > 900 && windowHeight.value > 800) {
    return "700px";
  } else {
    return `${windowHeight.value}px`;
  }
});

const closeModal = () => {
  setting.displaySettingModal();
};

watch(
  () => setting.displayModal,
  (val) => {
    console.log("displayModal changed:", val);
  },
  { immediate: true }
);

</script>

<style scoped></style>
