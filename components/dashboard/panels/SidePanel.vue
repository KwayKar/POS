<template>
  <nav class="w-[100px] flex flex-col items-center py-4 space-y-6">
    <button
      v-for="item in filteredNavigation"
      :key="item.title"
      class="text-white hover:bg-gray-700 p-3 rounded w-[80px]"
      :title="item.title"
      @click="handleNavClick(item)"
    >
      <div class="flex flex-col items-center">
        <div class="w-[30px] h-[30px] flex items-center justify-center">
          <NavSvgIcon :icon="item.icon" />
        </div>
      </div>
      <span class="text-xs mt-1">{{ item.title }}</span>
    </button>

    <SettingsModal v-if="setting.displayModal" />

    <Modal
      v-if="showMenuModal"
      width="440px"
      height="530px"
      @close="closeMenuModal"
    >
      <MenuList @close="closeMenuModal" />
    </Modal>

    <StoreModal v-if="store.displayModal" />
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import NavSvgIcon from "./NavSvgIcon.vue";
import SettingsModal from "../settings/SettingsModal.vue";
import { useSetting } from "~/stores/setting/useSetting";
import MenuList from "../menuList/MenuList.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import StoreModal from "../stores/StoreModal.vue";
import { useStoreLocation } from "~/stores/storeLocation/useStoreLocation";

const router = useRouter();
const userRole = ref("manager");
const showMenuModal = ref(false);

const navigationItems = {
  manager: [
    {
      title: "Order",
      icon: "ShoppingCartOutlined",
      path: "/dashboard/accept-orders",
    },
    { title: "Customers", icon: "People", path: "/customers" },
    { title: "Orders", icon: "Receipt", path: "/dashboard/orders" },
    { title: "Menus", icon: "Menu", path: "/" },
    { title: "Stores", icon: "Store", path: "/stores" },
    { title: "Loyalty", icon: "Loyalty", path: "/dashboard/promotions" },
    { title: "Setting", icon: "Setting", path: "/setting" },
  ],
  waiter: [
    { title: "Order", icon: "ShoppingCartOutlined", path: "/orders" },
    { title: "Customers", icon: "People", path: "/customers" },
  ],
  cashier: [
    { title: "Orders", icon: "Receipt", path: "/all-orders" },
    { title: "Loyalty", icon: "Loyalty", path: "/loyalty" },
  ],
};

const filteredNavigation = computed(
  () => navigationItems[userRole.value] || []
);

const isDesktop = ref(false);

const checkScreen = () => {
  isDesktop.value = window.matchMedia("(min-width: 1024px)").matches;
};

onMounted(() => {
  checkScreen();
  window.addEventListener("resize", checkScreen);
});
onUnmounted(() => {
  window.removeEventListener("resize", checkScreen);
});

const setting = useSetting();
const store = useStoreLocation();

function handleNavClick(item) {
  if (item.title === "Setting") {
    if (isDesktop.value) {
      setting.displaySettingModal();
    } else {
      router.push(item.path);
    }
  } else if (item.title === "Stores") {
    if (isDesktop.value) {
      store.displayStoreModal();
    } else {
      router.push(item.path);
    }
  } else if (item.title === "Menus") {
    showMenuModal.value = true;
  } else {
    router.push(item.path);
  }
}

function closeMenuModal() {
  showMenuModal.value = false;
}
</script>
