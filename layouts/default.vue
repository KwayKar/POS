<template>
    <div class="layout-wrapper">
      <Navbar />
      <main>
        <NuxtPage />
      </main>
      <Footer />
    </div>
  </template>
  
  <script>
import Footer from '~/components/reuse/navigation/Footer.vue';
import Page from '~/components/reuse/navigation/page.vue';
import Navbar from '~/components/reuse/navigation/PublicNav.vue';

// import PublicNav from '~/components/dashboard/panels/NavPanel.vue';
  
  export default {
    components: {
      Navbar,
      Footer,  
      Page
    }
  }
  </script>
  
  <style scoped>
  /* Add any layout-specific styling here */
  .layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the wrapper takes at least the full height of the viewport */
}

footer {
  margin-top: auto; /* Push the footer to the bottom of the page */
}

  </style>
  