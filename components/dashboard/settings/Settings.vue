<template>
  <div class="settings-page">
    <SettingLinks />

    <div class="settings-content">
      <component :is="currentComponent" v-if="currentComponent" />
    </div>
  </div>
</template>

<script setup>
import { useSetting } from "~/stores/setting/useSetting";
import SettingLinks from "./SettingLinks.vue";
import ShopInfo from "./shopInfo/ShopInfo.vue";
import BrandTheme from "./shopInfo/BrandTheme.vue";
import StaffList from "./staff/StaffList.vue";
import RoleList from "./roles/RoleList.vue";
import LocationList from "./locations/LocationList.vue";
import MenuList from "../menuList/MenuList.vue";

const setting = useSetting();

const currentComponent = computed(() => {
  switch (setting.activeSection) {
    // case 'Preferences':
    //   return Preferences
    case 'Shop Info':
      return ShopInfo
    case 'Themes':
      return BrandTheme
    case 'Locations':
      return LocationList
    case 'Staff':
      return StaffList
    case 'Roles':
      return RoleList
    case 'MenuList':
      return MenuList
    default:
      return null
  }
})

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
