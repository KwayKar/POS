<template>
  <header class="bg-white shadow-md rounded-full">
    <div class="container mx-auto px-4 py-6">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="text-xl font-bold text-black-600 w-[200px]">
          <NuxtLink to="/">CodaClone</NuxtLink>
        </div>

        <!-- Desktop Nav Links -->
        <nav class="hidden md:flex flex-1">
          <!-- Centered Links (Home, About, Pricing) -->
          <div class="flex justify-center space-x-8 flex-1">
            <NuxtLink
              to="/"
              class="flex items-center justify-center px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-200 ease-in-out ">
              Home
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="flex items-center justify-center px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-200 ease-in-out ">
              About
            </NuxtLink>
            <NuxtLink
              to="/pricing"
              class="flex items-center justify-center px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-200 ease-in-out ">
              Pricing
            </NuxtLink>
          </div>

          <!-- Right-aligned Links (Contact, Get Started) -->
          <div class="flex space-x-8">
            <NuxtLink
              to="/contact"
              class="px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-200 ease-in-out ">
              Contact
            </NuxtLink>
            <NuxtLink
              to="/getstarted"
              class="px-4 py-2 bg-black text-white hover:text-blue-600 rounded-full transition duration-200 ease-in-out ">
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
    }
  }
};
</script>

<style scoped>
/* Add custom styles here if necessary */
</style>



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
    }
  }
};
</script>

<style scoped>
/* Add custom styles here if necessary */
</style>


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
    }
  }
};
</script>

<style scoped>
/* Add custom styles here if necessary */
</style>
