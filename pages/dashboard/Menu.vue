<template>
  <div v-cloak>
    <DashboardLayout>
      <NavPanel
        class="navPanel fixed top-0 left-0 lg:left-[100px] w-full lg:w-[calc(100%-100px)] h-16"
        style="z-index: 99"
      >
        <NavPanelButton
          @click="openToCreateOption"
          style="border: 1px solid var(--black-2)"
        >
          Preview
        </NavPanelButton>
      </NavPanel>

      <div class="menu-wrapper">
        <div class="menu-left">
          <MenuCategory />
        </div>

        <div class="menu-right">
          <MenuItems />
        </div>
      </div>
    </DashboardLayout>
  </div>

  <Modal
    v-if="modal.isOpen && modal.type === 'create'"
    @close="closeModal"
    :minHeight="'400px'"
  >
    <CustomizationForm :mode="'create'" @close="closeModal" />
  </Modal>
</template>

<script setup>
import NavPanel from "~/components/dashboard/panels/NavPanel.vue";
import DashboardLayout from "~/layouts/DashboardLayout.vue";
import NavPanelButton from "~/components/dashboard/panels/NavPanelButton.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import CustomizationForm from "~/components/dashboard/products/customizations/CustomizationForm.vue";
import MenuCategory from "~/components/dashboard/menu/MenuCategory.vue";
import MenuItems from "~/components/dashboard/menu/MenuItems.vue";

const modal = ref({
  type: null,
  isOpen: false,
});
const windowWidth = ref(0);

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

onMounted(() => {
  updateWindowWidth();
  window.addEventListener("resize", updateWindowWidth);

  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWindowWidth);
  document.body.style.overflow = "";
});
</script>

<style scoped>
.menu-wrapper {
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.menu-right {
  flex: 1;
}

@media (min-width: 1100px) {
  .menu-wrapper {
    flex-direction: row;
  }

  .menu-left {
    display: flex;
    width: 300px;
    border-right: 1px solid var(--gray-2);
    padding: 16px;
  }
}

@media screen and (max-width: 1099px) {
  .menu-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  .menu-left {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
}
</style>
