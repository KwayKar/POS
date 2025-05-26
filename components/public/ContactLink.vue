<template>
  <section class="shop-section">
    <div class="shop-content">
      <h2 class="shop-title">Ready to setup your shop?</h2>
      <p class="shop-description">
        Tell us a bit about yourself and your shop — we’ll reach out to guide you from there
      </p>
      <Button style="height: 42px" :apply-shadow="true">Contact</Button>
    </div>
    <div class="shop-image">
      <img
        src="https://www.planes.studio/_next/image?url=%2Fassets%2Ficons%2Fsquiggle-arrow-desktop.svg&w=1920&q=75"
        alt="Shop Illustration"
        class="contact-section-image"
      />
    </div>
  </section>
</template>

<script setup>
import Button from "../reuse/ui/Button.vue";
</script>

<style scoped>
.shop-section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 3rem 2.75rem;
  margin: 50px auto;
  gap: 2rem;
  max-width: 1300px;
}
@media (max-width: 700px) {
  .shop-section {
    padding: 3rem 1.75rem;
  }
}

.shop-content,
.shop-image {
  margin: 0 auto;
  flex: 1 1 100%;
  max-width: 100%;
}

.shop-image {
  margin: 0 auto;
  flex: 1 1 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
}

.shop-title {
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #111827;
}

.shop-description {
  font-size: 1rem;
  color: var(--black-3);
  margin-bottom: 2rem;
  max-width: 480px;
  line-height: 1.6;
}


@media (min-width: 900px) {
  .shop-content,
  .shop-image {
    flex: 1 1 50%;
    max-width: 50%;
  }

  .shop-section {
    flex-wrap: nowrap;
  }

  .shop-content {
    padding-right: 2rem;
  }
}

.contact-section-image {
  max-width: 50%;
  height: auto;
  display: block;
}
</style>
