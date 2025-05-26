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
      :style="{ flexFlow: reverseOrder && isDesktop ? 'row-reverse' : 'row' }"
    >
      <!-- Image Section -->
      <div class="relative w-full w-full md:w-1/2 mb-4 md:mb-0">
       
        <NuxtImg
          :src="imageSrc"
          :alt="title"
          fit="contain"
          class="custom-image w-full h-full object-cover"
          width="343"
          height="193"
          placeholder="blur"
        />
      </div>

      <!-- Content Section -->
      <div class="w-full md:w-1/2 flex flex-col space-y-4 text-left content">
        <slot>
         
        </slot>
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
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  gap: 2.75rem;
}
@media screen and (min-width: 850px) {
  .wrap-section {
    padding: 4% 6%;
    flex-direction: row;
    gap: 4rem;
  }
}
@media screen and (min-width: 1025px) {
  .wrap-section {
    padding: 4% 8%;
    flex-direction: row;
    gap: 6rem;
  }
}

@media screen and (min-width: 850px) {
  .content {
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

@media screen and (max-width: 767px) {
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

.custom-image {
  width: 100%;
  height: auto;
  border-radius: 1rem; 
  border: 2px solid var(--black-1);
}

</style>
