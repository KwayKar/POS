<template>
  <div v-cloak>
    <DashboardLayout>
      <NavPanel
        class="navPanel fixed top-0 left-0 lg:left-[100px] w-full lg:w-[calc(100%-100px)] h-16"
        style="z-index: 99"
      >
        <NavPanelButton
          @click="openToCreateProduct"
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
</template>

<script setup>
import NavPanel from "~/components/dashboard/panels/NavPanel.vue";
import ProductCustomizationList from "./products/customizations/ProductCustomizationList.vue";
import DashboardLayout from "~/layouts/DashboardLayout.vue";
import NavPanelButton from "~/components/dashboard/panels/NavPanelButton.vue";
</script>

<style scoped></style>
