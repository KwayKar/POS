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
        <div class="menu-categories">
          <MenuCategory @select="scrollToCategory" />
        </div>

        <div class="menu-items">
          <MenuItems ref="menuItemsRef" />
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
import { ref } from 'vue';
import { useRestaurant } from "~/stores/shop/useRestaurant";
import { useMenu } from "~/stores/menu/useMenu";

const modal = ref({
  type: null,
  isOpen: false,
});
const windowWidth = ref(0);
const menuItemsRef = ref();
// const menu = useRestaurant();
const menu = useMenu();

const onCategorySelect = (id) => {
  menuItemsRef.value?.scrollToCategory(id);
};

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
  await menu.fetchItems();
  if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0 });
  }

  updateWindowWidth();
  window.addEventListener("resize", updateWindowWidth);
  // document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWindowWidth);
  document.body.style.overflow = "";
});

function scrollToCategory(id) {  
  const el = document.querySelector(`[data-category-id="${id}"]`);
  const container = document.querySelector('.menu-items'); // or use ref!

  if (el && container) {
    const y = el.getBoundingClientRect().top + window.pageYOffset - 130;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

</script>

<style scoped>
.menu-wrapper {
  display: flex;
  width: 100%;
}

.menu-items {
  flex: 1;
}

@media (min-width: 1100px) {
  .menu-wrapper {
    display: flex;
    flex-direction: column;
    /* height: 100%; */
    width: 100%;
  }
  .menu-categories {
    display: flex;
    flex-direction: row;
    width: 100%;

    position: sticky;
    top: 64px;
    left: 0px;
    z-index: 1;
    overflow: hidden;
  }
}

@media screen and (max-width: 1099px) {
  .menu-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  .menu-categories {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
}
</style>
