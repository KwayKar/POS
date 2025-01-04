<template>
  <section
    :class="[
      'flex flex-col md:flex-row items-center md:items-start md:space-x-8 space-y-6 md:space-y-0 p-4 md:p-6',
    ]"
    class="layout"
  >
    <div
      :class="[
        'flex items-center w-full wrap-section',
      ]"
      :style="{ flexFlow: reverseOrder && isDesktop ? 'row-reverse' : 'row', gap: isDesktop ? '6rem' : '2rem' }"
    >
      <!-- Image Section -->
      <div class="w-full md:w-1/2 mb-4 md:mb-0">
        <img
          :src="imageSrc"
          :alt="title"
          class="w-full h-auto rounded-lg shadow-md"
        />
      </div>

      <!-- Content Section -->
      <div class="w-full md:w-1/2 flex flex-col space-y-4 text-left content">
        <h2 class="title">
          {{ title }}
        </h2>
        <p class="description">
          {{ description }}
        </p>
        <div>
          <LinkButton 
            :href="link" 
            size="large" 
            class="bg-blue-500 text-white hover:bg-blue-600"
          >
            Learn More
          </LinkButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LinkButton from '../reuse/ui/LinkButton.vue';


export default {
  name: "FeatureContent1",
  components: {
    LinkButton
  },
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    reverseOrder: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isDesktop: false,
    };
  },
  mounted() {
    this.checkViewport();
    window.addEventListener("resize", this.checkViewport);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkViewport);
  },
  methods: {
    checkViewport() {
      this.isDesktop = window.innerWidth >= 768;
    },
  },
};
</script>

<style scoped>
.wrap-section {
  padding: 6%;
  display: flex;
  flex-direction: column;
}

@media screen and (min-width: 768px) {
  .wrap-section {
    padding: 4% 8%;
    flex-direction: row;
  }
}

.content {
  @media screen and (min-width: 850px) {
    max-width: 44%;
    line-height: 1.6;
  }
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
}

.description {
  font-size: 1.2rem;
}

@media screen and (max-width: 600px) {
  .title {
    font-size: 1.25rem;
  }
  .description {
    font-size: 1rem;
  }
  .wrap-section {
    gap: 1.5rem;
    flex-flow: column !important;
  }
}
</style>
