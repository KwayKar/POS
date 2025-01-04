<template>
  <div style="background: var(--primary-bg-color-1); min-height: 100vh">
    <div>
      <PublicNav />

      <section class="home-content">
        <Hero 
          subtitle="Welcome to Kway Kar"
          :title="['Your Security', 'Simplified']"
          description="Description about the prodcuts go here"
          :colors="['#ff6347', '#1e90ff']"
          imageSrc="/path-to-image.png"
        />

        <FeatureContent1 
          imageSrc="https://via.placeholder.com/400"
          title="Better Title Here"
          description="Add some descriptive content here. This section explains the purpose of the image or provides details about the topic."
          link="/about"
        />

        <FeatureContent1
          imageSrc="https://via.placeholder.com/400"
          title="Better Title Here"
          description="Add some descriptive content here. This section explains the purpose of the image or provides details about the topic."
          link="/about"
          :reverseOrder="true"
        />

        <ContentList1 />

        <ContentList2 />

        <HomeFAQ />
      </section>

      <Footer />
    </div>
  </div>
</template>

<script lang="ts">
import DashboardLayout from "~/layouts/DashboardLayout.vue";
import PublicNav from "~/components/reuse/navigation/PublicNav.vue";
import FeatureContent1 from "~/components/public/FeatureContent1.vue";
import Footer from "~/components/reuse/navigation/Footer.vue";
import ContentList1 from "~/components/public/ContentList1.vue";
import ContentList2 from "~/components/public/ContentList2.vue";
import Hero from "~/components/public/Hero.vue";
import HomeFAQ from "~/components/public/HomeFAQ.vue";

export default {
  components: {
    Hero,
    DashboardLayout,
    PublicNav,
    FeatureContent1,
    ContentList1,
    ContentList2,
    HomeFAQ,
    Footer,
  },
};
</script>

<style scoped>
  .home-content {
    padding-top: 120px;
  }
</style>
