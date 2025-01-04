<template>
  <header
    class="header bg-white fixed top-5 left-0 right-0 mx-6 box-border max-w-[var(--full-width-panel-size)]"
    style="border-radius: var(--site-border-radius); z-index: 9999"
  >
    <div class="container m-auto max-w-[calc(100%-20px)] p-4">
      <div class="flex items-center justify-between" style="width: 100%">
        <!-- Company Name -->
        <div class="text-xl font-bold text-black-600 w-[200px]">
          <NuxtLink to="/">Kway Kar</NuxtLink>
        </div>

        <!-- Desktop Nav Links -->
        <nav class="hidden md:flex flex-1">
          <div class="flex justify-center space-x-12 flex-1">
            <NuxtLink to="/" class="navLinks"> Home </NuxtLink>
            <NuxtLink to="/about" class="navLinks"> About </NuxtLink>
            <NuxtLink to="/pricing" class="navLinks"> Pricing </NuxtLink>
          </div>

          <!-- Right-aligned Links (Contact, Get Started) -->
          <div class="flex space-x-8">
            <NuxtLink to="/contact" class="navLinks"> Contact </NuxtLink>
            <NuxtLink
              to="/getstarted"
              class="px-4 py-2 bg-black text-white hover:text-blue-600 rounded-full transition duration-200 ease-in-out"
            >
              Get Started
            </NuxtLink>
          </div>
        </nav>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button @click="toggleMenu" class="text-gray-600 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-6 h-6"
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
      </div>

      <!-- Mobile Dropdown Menu -->
      <div v-if="isMenuOpen" class="md:hidden mt-4 space-y-4">
        <NuxtLink
          to="/"
          class="block text-gray-600 hover:text-blue-600"
          @click="closeMenu"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="block text-gray-600 hover:text-blue-600"
          @click="closeMenu"
        >
          About
        </NuxtLink>
        <NuxtLink
          to="/features"
          class="block text-gray-600 hover:text-blue-600"
          @click="closeMenu"
        >
          Features
        </NuxtLink>
        <NuxtLink
          to="/pricing"
          class="block text-gray-600 hover:text-blue-600"
          @click="closeMenu"
        >
          Pricing
        </NuxtLink>
        <NuxtLink
          to="/contact"
          class="block text-gray-600 hover:text-blue-600"
          @click="closeMenu"
        >
          Contact
        </NuxtLink>
        <NuxtLink
          to="/getstarted"
          class="block text-gray-600 hover:text-blue-600"
          @click="closeMenu"
        >
          Get Started
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  background: #fff;
  margin: 0 auto;
  max-width: var(--full-width-panel-size);
}
.navLinks {
  font-size: 1.15rem;
  color: var(--primary-text-color-1);
  display: flex;
  margin: 0 1px;
  align-items: center;
}
</style>
