<template>
  <Modal
    v-if="true"
    :width="modalWidth"
    :height="modalHeight"
    :minHeight="'400px'"
    :isFullScreenMobile="true"
    @close="closeModal"
  >
    <div class="settings-page">
      <div class="nav-panel">
        <div
          v-for="(items, section) in navigations"
          :key="section"
          class="nav-section"
        >
          <h3 class="section-title">{{ section }}</h3>
          <ul class="nav-items">
            <li
              v-for="item in items"
              :key="item"
              class="nav-item"
              :class="{
                'text-blue-600 font-semibold': item === store.activeItem,
              }"
              @click="handleClick(item)"
            >
              <component :is="iconMap[item]" fill="#685858" />
              <p>{{ item }}</p>
            </li>
          </ul>
        </div>
      </div>

      <div class="settings-content">
        <component :is="currentComponent" v-if="currentComponent" />
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { computed } from "vue";
import Brand from "~/assets/icons/brand.vue";
import Info from "~/assets/icons/info.vue";
import Robot from "~/assets/icons/robot.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import { useStoreLocation } from "~/stores/storeLocation/useStoreLocation";
import ShopInfo from "../settings/shopInfo/ShopInfo.vue";
import LocationList from "../settings/locations/LocationList.vue";
import StaffList from "../settings/staff/StaffList.vue";
import RoleList from "../settings/roles/RoleList.vue";

const navigations = {
  Stores: ["Locations", "Staff", "Roles"],
};
const iconMap = {
  Profile: Brand,
  "Shop List": Info,
  Locations: Robot,
  Staff: Robot,
  Roles: Robot,
  Themes: Brand,
  "Upgrade Plan": Robot,
};

const windowHeight = ref(0);
const windowWidth = ref(0);
const store = useStoreLocation();

onMounted(async () => {
  await nextTick();
  updatePanelSize();
  window.addEventListener("resize", updatePanelSize);

  //   if (!store.activeSection) {
  //     store.setActiveSection("Locations");
  //   }
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

const updatePanelSize = () => {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;
};

const currentComponent = computed(() => {
  switch (store.activeSection) {
    // case 'Preferences':
    //   return Preferences
    case "Shop List":
      return ShopInfo;
    case "Locations":
      return LocationList;
    case "Staff":
      return StaffList;
    case "Roles":
      return RoleList;
    default:
      return null;
  }
});

defineProps({
  navigations: Object,
});
defineEmits(["select"]);

const handleClick = (item) => {
  console.log(item);
  store.setActiveSection(item);
};

const closeModal = () => {
  store.displayStoreModal();
};
</script>

<style scoped>
.nav-panel {
  width: 270px;
  height: 100%;
  padding: 1.5rem 1rem 0;
  border-right: 1px solid #dedede;
  background: var(--white-1);
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

.nav-section + .nav-section {
  margin-top: 1.5rem;
}

.section-title {
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: var(--black-2);
}

.nav-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  display: flex;
  padding: 0.5rem 0;
  cursor: pointer;
  color: var(--black-1);
  font-size: 0.95rem;
}

.nav-item > p {
  margin-left: 10px;
  font-size: 0.9rem;
}

.nav-item:hover {
  color: var(--black-1);
}

.settings-page {
  display: flex;
  height: 100%;
}

.settings-content {
  flex: 1;
}

</style>
