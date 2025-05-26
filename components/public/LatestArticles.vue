<template>
  <section class="layout">
    <div class="home-header2-block">
      <p class="home-header2-subtitle">Subtitle goes here</p>
      <h1 class="home-header2-title">Latest Articles</h1>
    </div>

    <!-- Cards Section -->
    <div class="cards-flex">
      <div
        v-for="(card, index) in cards"
        :key="card.id"
        :class="['card-item', { 'center-third': index === 2 }]"
      >
        <div class="wrap-image">
          <!-- <img
            :src="card.image"
            :alt="card.title"
            class="w-full h-full object-cover"
          /> -->
          <NuxtImg
            :src="card.image"
            :alt="card.title"
            width="343"
            height="193"
            sizes="(max-width: 290px) 100vw, 290px"
            format="png"
            fit="cover"
            loading="lazy"
            placeholder="blur"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="wrap-content">
          <h3 class="card-title">{{ card.title }}</h3>
          <p class="text-sm text-gray-600">{{ card.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          id: 1,
          image: "https://www.datocms-assets.com/60253/1685100965-brandblog.png?dpr=2&fit=fill&fm=webp&h=193&w=343",
          title: "Card One",
          description: "This is the description for card one.",
        },
        {
          id: 2,
          image: "https://www.datocms-assets.com/60253/1712055166-e-simblog.png?dpr=2&fit=fill&fm=webp&h=193&w=343",
          title: "Card Two",
          description: "This is the description for card two.",
        },
        {
          id: 3,
          image: "https://www.datocms-assets.com/60253/1739877561-kiteslogo2png.png?dpr=2&fit=fill&fm=webp&h=193&w=343",
          title: "Card Three",
          description: "This is the description for card three.",
        },
      ],
    };
  },
};
</script>

<style scoped>
.layout {
  max-width: 1600px;
  margin: 30px auto 100px;
  padding: 32px;
}
@media (max-width: 768px) {
  .layout {
    padding: 1.5rem;
  }
}

.home-header2-block {
  text-align: center;
  margin-bottom: 32px;
}
.home-header2-subtitle {
  color: var(--gray-2);
}
.home-header2-title {
  font-size: 2rem;
  font-weight: bold;
  color: var(--black-1);
}

.cards-flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 28px;
}

.card-item {
  background: var(--white-1);
  border: 1px solid var(--gray-2);
  border-radius: 14px;
  box-shadow: var(--box-shadow-2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  flex: 1 1 calc(100%);
}

/* Tablet: two on top, one centered */
@media (min-width: 600px) and (max-width: 1023px) {
  .card-item {
    flex: 1 1 calc(50% - 14px);
  }
  .center-third {
    flex: 0 0 auto;
    width: calc(50% - 14px);
    margin: 0 auto;
  }
}

/* Desktop: 3 in a row */
@media (min-width: 1024px) {
  .card-item {
    flex: 1 1 calc(33.333% - 28px);
  }
}

.wrap-image > img {
  width: 100%;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.wrap-content {
  padding: 10px 16px 16px;
}
.card-title {
  font-weight: 600;
  font-size: 1.3rem;
  margin: 6px 0 10px;
  color: var(--black-1);
}
</style>
