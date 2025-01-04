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
import Footer from "~/components/reuse/navigation/Footer.vue";
import Page from "~/components/reuse/navigation/page.vue";
import Navbar from "~/components/reuse/navigation/PublicNav.vue";

export default {
  components: {
    Navbar,
    Footer,
    Page,
  },
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
