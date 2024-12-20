<template>
  <div class="flex h-screen">
    <SidePanel
      class="fixed top-0 left-0 h-full w-[100px] bg-gray-800 hidden lg:flex"
    />

    <div class="flex flex-col flex-1 lg:ml-[100px]">
      <NavPanel
        class="fixed top-0 left-0 lg:left-[100px] w-full lg:w-[calc(100%-100px)] h-16 bg-white shadow"
      />
      <div class="pt-12 flex flex-1 overflow-hidden">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import SidePanel from "~/components/dashboard/panels/SidePanel.vue";
import NavPanel from "~/components/dashboard/panels/NavPanel.vue";

export default {
  components: {
    SidePanel,
    NavPanel,
  },
};
</script>
