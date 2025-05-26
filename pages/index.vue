<template>
  <div style="background: var(--primary-bg-color-1); min-height: 100vh">
    <div>
      <PublicNav />

      <section class="home-content">
        <Hero
          subtitle="Welcome to Kway Kar"
          :title="['Your Security', 'Simplified']"
          description="Description about the prodcuts go here"
          :colors="['var(--black-2)', '#1e90ff']"
          imageSrc="/path-to-image.png"
        />

        <FeatureContent1
          imageSrc="https://defoodtruckclub.nl/media/pages/foodtrucks/friet-foodtruck/c4a141fc5a-1743434784/pexels-fakhribagirov-17132215-1080x-q72.webp"
          title="Better Title Here"
          description="Add some descriptive content here. This section explains the purpose of the image or provides details about the topic."
          link="/about"
        >
          <template #default>
            <h2 class="home-content-header">
              Everything You Need to Sell Smarter
            </h2>
            <p class="home-content-description">
              Designed to reduce manual work and eliminate costly errors, our
              point of sale system syncs your sales across all online and
              in-person channels.
            </p>
            <br />
            <p class="home-content-description">
              Whether you’re running a busy restaurant or a retail boutique,
              you’ll benefit from a smoother customer experience, effortless
              scaling as your business grows, and clear, affordable pricing—with
              no hidden fees.
            </p>
          </template>
        </FeatureContent1>

        <FeatureContent1
          imageSrc="https://defoodtruckclub.nl/media/pages/foodtrucks/friet-foodtruck/98b5639f8b-1743434837/g-r-mottez-vlvbwylfj-o-unsplash-1080x-q72.webp"
          title="Better Title Here"
          description="Add some descriptive content here. This section explains the purpose of the image or provides details about the topic."
          link="/about"
          :reverseOrder="true"
        >
          <template #default>
            <h2 class="home-content-header">Smarter Point of Sale</h2>
            <p class="home-content-description">
              Accept orders, print receipts, and manage everything in real time.
              Designed for busy restaurant floors and small shops alike.
            </p>

            <ul class="home-content-list">
              <li>
                <strong>Restaurants & Cafés</strong> – Let diners order online,
                manage tables, and speed up checkout with a sleek POS.
              </li>
              <li>
                <strong>Retail Stores</strong> – From inventory tracking to
                customer checkout and online sales, we simplify it all.
              </li>
              <li>
                <strong>Florists & Gift Shops</strong> – Manage seasonal stock,
                handle walk-ins, and take online orders seamlessly.
              </li>
            </ul>
          </template>
        </FeatureContent1>

        <FeatureContent1
          imageSrc="https://defoodtruckclub.nl/media/pages/diensten/catering-bruiloft/3a94413c59-1712567233/drank-catering-1080x-q72.webp"
          title="Better Title Here"
          description="Add some descriptive content here. This section explains the purpose of the image or provides details about the topic."
          link="/about"
          :reverseOrder="false"
        >
          <template #default>
            <h2 class="home-content-header" style="padding-bottom: 0.75rem !important">Smarter Point of Sale</h2>
            <p class="home-content-description">
              Accept orders, print receipts, and manage everything in real time.
              Designed for busy restaurant floors and small shops alike.
            </p>

            <br />

            <h2 class="home-content-header" style="padding-bottom: 0.75rem !important">Smarter Point of Sale</h2>
            <p class="home-content-description">
              Accept orders, print receipts, and manage everything in real time.
              Designed for busy restaurant floors and small shops alike.
            </p>
          </template>
        </FeatureContent1>

        <ContentList1 />

        <LatestArticles />

        <HomeFAQ />

        <ContactLink />
      </section>

      <Footer />
    </div>
  </div>
</template>

<script>
import DashboardLayout from "~/layouts/DashboardLayout.vue";
import PublicNav from "~/components/reuse/navigation/PublicNav.vue";
import FeatureContent1 from "~/components/public/FeatureContent1.vue";
import Footer from "~/components/reuse/navigation/Footer.vue";
import ContentList1 from "~/components/public/ContentList1.vue";
import Hero from "~/components/public/Hero.vue";
import HomeFAQ from "~/components/public/HomeFAQ.vue";
import ContactLink from "~/components/public/ContactLink.vue";
import LatestArticles from "~/components/public/LatestArticles.vue";

export default {
  components: {
    Hero,
    DashboardLayout,
    PublicNav,
    FeatureContent1,
    ContentList1,
    LatestArticles,
    HomeFAQ,
    ContactLink,
    Footer,
  },
};
</script>

<style scoped>
.home-content {
  padding-top: 120px;
}
</style>
