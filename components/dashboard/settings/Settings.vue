<template>
  <div class="settings-page">
    <SettingLinks />

    <div class="settings-content">
      <component
        :is="currentComponent"
        v-if="currentComponent"
      />
    </div>
  </div>
</template>

<script setup>
import { useSetting } from "~/stores/setting/useSetting";
import SettingLinks from "./SettingLinks.vue";
import ShopInfo from "./shopInfo/ShopInfo.vue";
import BrandTheme from "./shopInfo/BrandTheme.vue";
import LocationList from "./locations/LocationList.vue";
import MenuList from "../menuList/MenuList.vue";
import CurrentUserProfile from "./currentUserProfile/CurrentUserProfile.vue";
import OrgInfo from "./orgInfo/OrgInfo.vue";
import { onMounted, ref } from "vue";

const setting = useSetting();

onMounted(async () => {
  try {
    await setting.loadInitialData();
  } catch (err) {}
});

const currentComponent = computed(() => {
  switch (setting.activeSection) {
    case "User Profile":
      return CurrentUserProfile;
    case "Organization":
      return OrgInfo;
    case "Shop Info":
      return ShopInfo;
    case "Themes":
      return BrandTheme;
    case "Locations":
      return LocationList;
    case "MenuList":
      return MenuList;
    default:
      return null;
  }
});
</script>

<style scoped>
.settings-page {
  display: flex;
  height: 100%;
}

.settings-content {
  flex: 1;
}
</style>
