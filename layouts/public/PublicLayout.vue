<template>
  <div class="layout-wrapper">
    <Navbar />
    <main>
      <n-config-provider :theme-overrides="themeOverrides">
        <n-global-style />
          <NuxtPage />
      </n-config-provider>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Footer from "~/components/reuse/navigation/Footer.vue";
import Navbar from "~/components/reuse/navigation/PublicNav.vue";

const themeOverrides = {
  common: {
    primaryColor: 'blue',
    primaryColorHover: 'blue',
    borderColor: 'blue',
    borderRadius: '8px', 
    textColorBase: '#1f2937'
  },
  Input: {
    border: '1px solid blue',
    borderHover: '1px solid blue',
    borderFocus: '1px solid blue',
    borderRadius: '8px',
    boxShadowFocus: '0 0 0 2px rgba(255, 87, 51, 0.3)'
  },
  Button: {
    borderRadius: '6px',
    color: '#1e40af',
    colorHover: '#1e3a8a',
    colorPressed: '#1d4ed8'
  }
};


</script>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

footer {
  margin-top: auto;
}
</style>
