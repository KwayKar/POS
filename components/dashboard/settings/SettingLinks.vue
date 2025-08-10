<template>
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
          :class="{ 'text-blue-600 font-semibold': item === activeItem }"
          @click="handleClick(item)"
        >
         <component :is="iconMap[item]" fill="#685858" />
         <p>{{ item }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import Brand from '~/assets/icons/brand.vue';
import Chain from '~/assets/icons/chain.vue';
import Info from '~/assets/icons/info.vue';
import Robot from '~/assets/icons/robot.vue';
import { useSetting } from '~/stores/setting/useSetting';

const navigations = {
  Account: ["Preferences", "Shop Info", "Staff"],
  Stores: ["Locations", "Staff", "Roles"],
  Brands: ["Themes"],
  Upgrade: ["Upgrade Plan", "Billing"],
};
const iconMap = {
  Preferences: Brand,
  "Shop Info": Info,
  "Locations": Robot,
  "Staff": Robot,
  "Roles": Robot,
  Themes: Brand,
  "Upgrade Plan": Robot,
  Billing: Chain
};

const setting = useSetting();

defineProps({
  navigations: Object,
  activeItem: String,
});
defineEmits(['select']);

const handleClick = (item) => {
  setting.setActiveSection(item);
}

</script>

<style scoped>
.nav-panel {
  width: 270px;
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
  color: #000;
}
</style>
