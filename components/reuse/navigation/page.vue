<template>
    <div class="rotating-text">
      <span v-html="currentText"></span>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        texts: ["Collaborate", "Create", "Organize", "Inspire"],
        currentIndex: 0,
      };
    },
    computed: {
      currentText() {
        return this.texts[this.currentIndex];
      },
    },
    mounted() {
      this.startRotation();
    },
    methods: {
      startRotation() {
        setInterval(() => {
          this.currentIndex =
            (this.currentIndex + 1) % this.texts.length;
        }, 2000); // Change every 2 seconds
      },
    },
  };
  </script>
  
  <style scoped>
  .rotating-text {
    display: inline-block;
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    animation: fadeIn 1s ease-in-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
  