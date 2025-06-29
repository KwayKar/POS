<template>
  <div class="flex h-screen" style="width: 100%">
    <SidePanel
      class="fixed top-0 left-0 h-full w-[100px] bg-gray-800 hidden lg:flex"
    />

    <div class="layout" v-cloak>
      <div class="custom-container" :class="{ 'with-navbar': !disableNavbar }">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import SidePanel from "~/components/dashboard/panels/SidePanel.vue";

export default {
  components: {
    SidePanel,
  },
  props: {
    disableNavbar: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}

.layout {
  width: 100%;
  margin-left: 0px;
}
@media screen and (min-width: 1024px) {
  .layout {
    margin-left: 100px;
  }
}

.custom-container {
  display: flex;
}

.with-navbar {
  padding-top: 2.9rem;
  margin-top: 18px;
}
</style>
