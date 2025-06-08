<template>
  <div v-cloak>
    <DashboardLayout>
      <NavPanel
        class="navPanel fixed top-0 left-0 lg:left-[100px] w-full lg:w-[calc(100%-100px)] h-16"
        style="z-index: 99"
      >
        <NavPanelButton
          @click="openToCreateOption"
          style="border: 1px solid var(--black-1)"
        >
          Create Option
        </NavPanelButton>
      </NavPanel>

      <div class="flex flex-col lg:flex-row h-full" :style="{ width: '100%' }">
        <div class="h-full" :style="{ width: '100%' }">
          <ProductCustomizationList />
        </div>
      </div>
    </DashboardLayout>
  </div>

  <Modal
    v-if="modal.isOpen && modal.type === 'create'"
    @close="closeModal"
    :minHeight="'400px'"
    :isFullScreenMobile="true"
  >
    <CustomizationForm :mode="'create'" @close="closeModal" />
  </Modal>
</template>

<script setup>
import NavPanel from "~/components/dashboard/panels/NavPanel.vue";
import ProductCustomizationList from "./products/customizations/ProductCustomizationList.vue";
import DashboardLayout from "~/layouts/DashboardLayout.vue";
import NavPanelButton from "~/components/dashboard/panels/NavPanelButton.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import CustomizationForm from "~/components/dashboard/products/customizations/CustomizationForm.vue";
import { useProductCustomization } from "~/stores/product/useProductCustomization";

const modal = ref({
  type: null, isOpen: false,
});
const selectedItem = ref(null);
const windowWidth = ref(0);

const customizationStore = useProductCustomization();

const openToCreateOption = () => {
  modal.value = {
    type: "create",
    isOpen: true,
  };
};

const closeModal = () => {
  modal.value = {
    type: null,
    isOpen: false,
  };
};

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(async() => {
  updateWindowWidth();
  await customizationStore.fetchCustomizations();
  window.addEventListener("resize", updateWindowWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWindowWidth);
});
</script>

<style scoped></style>
