<template>
  <section class="layout">
    <div class="faq-container">
      <h2 class="title faq-title">FAQs</h2>
      <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
        <div class="faq-question" @click="toggleFaq(index)">
          <span>{{ faq.question }}</span>
          <div class="toggle-sign" :class="{ open: openIndex === index }"></div>
        </div>

        <transition name="faq-transition" @enter="onEnter" @leave="onLeave">
          <div v-if="openIndex === index" class="faq-answer-wrapper">
            <p class="faq-answer">{{ faq.answer }}</p>
          </div>
        </transition>

        <hr class="faq-divider" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      openIndex: null,
      faqs: [
        {
          question: "What is Vue.js?",
          answer:
            "Vue.js is a progressive JavaScript framework for building user interfaces.",
        },
        {
          question: "How does React differ from Vue?",
          answer:
            "React uses JSX and is more flexible, while Vue offers simplicity and reactivity out of the box.",
        },
        {
          question: "What is AWS used for?",
          answer:
            "AWS provides cloud computing services, including storage, databases, and deployment tools.",
        },
        {
          question: "How can I improve web performance?",
          answer:
            "Optimizing assets, reducing API latency, and using CDNs are some ways to improve web performance.",
        },
      ],
    };
  },
  methods: {
    toggleFaq(index) {
      this.openIndex = this.openIndex === index ? null : index;
    },
    onEnter(el) {
      el.style.height = "0";
      el.offsetHeight; // Force reflow
      el.style.transition = "height 0.3s ease";
      el.style.height = el.scrollHeight + "px";
    },
    onLeave(el) {
      el.style.height = el.scrollHeight + "px";
      el.offsetHeight; // Force reflow
      el.style.transition = "height 0.3s ease";
      el.style.height = "0";
    },
  },
};
</script>

<style scoped>
.layout {
  padding: 3rem 1.5rem; 
  background-image: radial-gradient(rgba(0, 0, 0, 0.1) 2px, transparent 0px);
  background-size: 30px 30px;
  border: 1px solid var(--gray-1);
}

.faq-container {
  max-width: 640px;
  margin: 100px auto;
  background: var(--white-1);
  border: 1px solid var(--gray-1);
  padding: 30px 54px 54px;
  box-sizing: border-box;
  box-shadow: var(--box-shadow-2);
}
@media screen and (max-width: 850px) {
  .faq-container {
    padding: 24px;
  }
}
.faq-title {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--black-1);
}
.faq-item {
  margin-bottom: 1rem;
}
.faq-question {
  display: flex;
  font-weight: bold;
  color: var(--black-3);
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0.75rem 1rem;
  border-radius: 4px;
}
.faq-answer-wrapper {
  overflow: hidden;
}
.faq-answer {
  padding: 1rem;
  border-radius: 4px;
  margin-top: 0.5rem;
  color: var(--black-3);
}
.faq-divider {
  border-top: 1px dashed #ccc;
  margin: 0.75rem 0;
}

.toggle-sign {
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.toggle-sign::before,
.toggle-sign::after {
  content: "";
  position: absolute;
  background-color: #555;
  transition: all 0.3s ease;
}

.toggle-sign::before {
  width: 20px;
  height: 2px;
  background-color: #555;
}

.toggle-sign::after {
  width: 2px;
  height: 20px;
  background-color: #555;
  transform-origin: center;
  transition: transform 0.3s ease;
}

.toggle-sign.open::after {
  transform: rotate(90deg); 
}
</style>
