<template>
  <header class="header" :style="{ maxHeight: isMenuOpen ? '100vh' : '75px' }">
    <div class="header-container">
      <div class="company-title">
        <NuxtLink to="/">Kway Kar</NuxtLink>
      </div>

      <nav class="nav-desktop">
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
        <NuxtLink to="/about" class="nav-link">About</NuxtLink>
        <NuxtLink to="/pricing" class="nav-link">Pricing</NuxtLink>
      </nav>

      <div class="nav-right">
        <Button style="height: 44px">Get Started</Button>
      </div>

      <button class="mobile-toggle" @click="toggleMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  </header>

  <Transition name="slide-fade">
    <div v-if="isMenuOpen" class="mobile-menu">
      <div class="close-btn" @click="closeMenu" aria-label="Close menu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>

      <NuxtLink to="/" class="mobile-link" @click="closeMenu" style="margin-top: 40px">Home</NuxtLink>
      <NuxtLink to="/about" class="mobile-link" @click="closeMenu"
        >About</NuxtLink
      >
      <NuxtLink to="/features" class="mobile-link" @click="closeMenu"
        >Features</NuxtLink
      >
      <NuxtLink to="/pricing" class="mobile-link" @click="closeMenu"
        >Pricing</NuxtLink
      >
      <NuxtLink to="/contact" class="mobile-link" @click="closeMenu"
        >Contact</NuxtLink
      >
      <NuxtLink to="/getstarted" class="mobile-link" @click="closeMenu"
        >Get Started</NuxtLink
      >

      <div class="mobile-footer-info">
        <p>Yangon, Myanmar</p>
        <p><a href="https://example.com" target="_blank">example.com</a></p>
        <p>+95 123 456 789</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from "vue";
import Button from "../ui/Button.vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.classList.toggle("no-scroll", this.isMenuOpen);
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

import { watch } from 'vue';

watch(() => isMenuOpen.value, (open) => {
  if (open) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
});
</script>

<style scoped>
.header {
  position: fixed;
  top: 20px;
  left: 24px;
  right: 24px;
  background: rgba(255, 255, 255, 0.86);
  border-radius: 50px;
  z-index: 9999;
  border: 1px solid #cfcfcf;
  box-sizing: border-box;
  padding: 10px 16px;
  max-width: calc(100% - 48px);
  transition: max-height 0.3s ease-in-out; /* Transition on max-height */
  overflow: hidden; /* Important to prevent content overflow during transition */
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  margin: 0 0 0 20px;
}

.company-title {
  font-size: 20px;
  font-weight: bold;
}

.nav-desktop {
  display: flex;
  flex: 1;
  justify-content: center;
  gap: 48px;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-link {
  font-size: 1.05rem;
  color: #222;
  text-decoration: none;
  box-sizing: border-box;
}
@media screen and (min-width: 850px) {
  .nav-link {
    padding: 8px 20px;
  }
}
@media screen and (min-width: 768px) {
  .nav-link:hover {
    color: var(--black-1);
    background: #ddecd6;
    border-radius: 32px;
  }
}


.btn-get-started {
  background: var(--black-2);
  color: var(--white-1);
  padding: 8px 20px;
  border-radius: 9999px;
  text-decoration: none;
  transition: background 0.2s ease-in-out;
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.mobile-toggle svg {
  width: 24px;
  height: 24px;
  color: #444;
}

/* Mobile styles */
@media (max-width: 768px) {
  .nav-desktop,
  .nav-right {
    display: none;
  }

  .mobile-toggle {
    display: block;
  }

  .mobile-menu {
    display: none;
    padding: 20px 0 50px;
  }

  @media screen and (max-width: 768px) {
    .mobile-menu {
      position: fixed;
      top: 0px;
      left: 0px;
      z-index: 9999;
      width: calc(100%);
      height: 100vh;
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 0;
      background: var(--white-1);
      border: 1px solid #cfcfcf;
      border-radius: 20px;
      box-sizing: border-box;
      padding: 16px 16px 50px;
    }
  }

  .mobile-link {
    color: var(--black-2);
    text-decoration: none;
    font-size: 1.1rem !important;
    padding: 10px 20px;
  }

  .mobile-link:hover {
    color: #2563eb;
  }

  /* Transition animation for the mobile menu (slide-fade remains) */
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }

  .slide-fade-enter-from {
    opacity: 0;
    transform: translateY(-10px);
  }

  .slide-fade-enter-to {
    opacity: 1;
    transform: translateY(0);
  }

  .slide-fade-leave-from {
    opacity: 1;
    transform: translateY(0);
  }

  .slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  padding: 6px;
  cursor: pointer;
  color: #333;
}

.close-btn svg {
  width: 24px;
  height: 24px;
}

.no-scroll {
  overflow: hidden;
  touch-action: none;
}

.mobile-footer-info {
  margin-top: auto;
  padding: 20px;
  font-size: 1.1rem;
  color: #666;
  line-height: 1.8;
}

.mobile-footer-info a {
  color: var(--black-1);
  text-decoration: none;
}
</style>
