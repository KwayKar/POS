<template>
  <section class="hero w-[calc(100%-40px)]">
    <div class="hero-content">
      <div class="text-panel">
        <p 
          class="subtitle animate"
          :class="{ 'visible': animationStage > 0 }"
        >{{ subtitle }}</p>
        <h1 
          class="title animate"
          :class="{ 'visible': animationStage > 1 }"
        >
          <span :style="{ color: colors[0] }">{{ titleLines[0] }}</span
          ><br />
          <span :style="{ color: colors[1] }">{{ titleLines[1] }}</span>
        </h1>
        <p 
          class="animate"
          :class="{ 'visible': animationStage > 2 }"
        >
          {{ description }}
        </p>
      </div>
      <div class="image-panel">
        <img :src="imageSrc" alt="Hero Image" class="hero-image" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
  props: {
    subtitle: {
      type: String,
      required: true,
    },
    title: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
    },
    colors: {
      type: Array,
      default: () => ["#000", "#555"],
    },
    imageSrc: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      animationStage: 0, // Tracks the current animation stage
    };
  },
  computed: {
    titleLines() {
      return this.title;
    },
  },
  mounted() {
    this.triggerAnimation(); // Start animations on mount
  },
  methods: {
    triggerAnimation() {
      let stage = 0;
      const interval = setInterval(() => {
        if (stage > 2) {
          clearInterval(interval); 
        } else {
          this.animationStage = ++stage; 
        }
      }, 500); 
    },
  },
};

</script>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem;
}
@media screen and (min-width: 601px) {
  .hero {
    padding: 3rem;
  }
}
@media screen and (min-width: 1025px) {
  .hero {
    min-height: 90vh;
    padding: 50px;
  }
}

.hero-content {
  display: flex;
  width: 100%;
  gap: 20px;
  flex-wrap: wrap;
}

.text-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: flex-start;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: var(--black-3);
}

.title {
  font-size: 2.7rem;
  font-weight: bold;
  line-height: 1.4;
}
@media screen and (min-width: 601px) {
 .title {
  font-size: 3.2rem;
 } 
}
@media screen and (min-width: 1025px) {
 .title {
  font-size: 3.5rem;
 } 
}

.image-panel {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image {
  max-width: 100%;
  height: auto;
}

.animate {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.animate.visible {
  opacity: 1;
  transform: translateY(0);
}


@media (max-width: 1024px) {
  .hero-content {
    flex-direction: column;
  }

  .text-panel {
    order: 1;
  }

  .image-panel {
    order: 2;
  }
}
</style>
