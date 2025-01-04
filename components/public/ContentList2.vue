<template>
  <section class="p-8 section">
    <div class="text-center mb-14">
      <p class="text-gray-500 text-sm subtitle">Subtitle goes here</p>
      <h1 class="title">Main Title</h1>
    </div>

    <!-- Cards Section -->
    <div class="flex flex-wrap justify-center m-auto wrap-items">
      <div
        v-for="card in cards"
        :key="card.id"
        class="card-item"
      >
        <div
          class="wrap-image"
        >
          <img
            :src="card.image"
            :alt="card.title"
            class="w-full h-full object-cover rounded-lg"
          />
        </div>

        <h3 class="card-title mt-64">
          {{ card.title }}
        </h3>

        <p class="text-sm text-gray-600">
          {{ card.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import "./reuse-styles.css";

export default {
  data() {
    return {
      cards: [
        {
          id: 1,
          image: "https://get.chownow.com/wp-content/uploads/2024/10/rendezvous-outside-sign-600x486.jpg.webp",
          title: "Card One",
          description: "This is the description for card one.",
        },
        {
          id: 2,
          image: "https://get.chownow.com/wp-content/uploads/2024/11/ebook-hero-600x400.jpg.webp",
          title: "Card Two",
          description: "This is the description for card two.",
        },
        {
          id: 3,
          image: "https://get.chownow.com/wp-content/uploads/2024/10/rendezvous-outside-sign-600x486.jpg.webp",
          title: "Card Three",
          description: "This is the description for card three.",
        },
      ],
    };
  },
};
</script>

<style scoped>
.section {
  margin: 64px 0;
}
.wrap-items{
  gap: 0; 
  max-width: 1600px;
}
@media (min-width: 600px) {
  .wrap-items{
    gap: 18px;
  }
}
.card-item {
  min-height: 275px;
  width: calc(50% - 12px);
  /* flex: 1 1 calc(50% - 12px);  */
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 16px;
  border-radius: 14px;
}
@media (min-width: 768px) {
  .card-item {
    width: calc(20% - 12px); 
    flex: 1 1 calc(20% - 12px); 
  }
}
@media (min-width: 1600px) {
  .card-item {
    max-width: 500px;
  }
}
@media only screen and (max-width: 600px) {
  .card-item {
    width: 100%;
    flex: 1 1 calc(100%); 
    margin-bottom: 32px;
  }
}
.card-title {
  font-weight: 600;
  font-size: 1.3rem;
  margin: 18px 0 10px;
}
.wrap-image > img {
  width: 100%;
  max-width: 100%;
  /* height: 260px; */
  object-fit: cover;
}
</style>
