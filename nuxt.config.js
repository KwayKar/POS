export default {
  head: {
    title: 'firstest',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    '@/assets/main.css',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  image: {
    provider: 'ipx',
    domains: ['*'],
    placeholders: {
      // default placeholder: 'blur'
      blur: true
    },
    screens: {
      sm: 320,
      md: 768,
      lg: 1024,
      xl: 1280
    }
  },

  plugins: [],
  components: true,
  buildModules: [],

  modules: [
    '@nuxt/image',
    '@pinia/nuxt',
  ],

  layers: [
    // '@nuxtjs/tailwindcss',
    '~/custom-layer'
  ],

  build: {
    loaders: {
      css: {
        additionalData: `@import "~assets/css/form.css";` 
      },
      // transpile: ['vuedraggable'],
    }
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push(
        {
          path: '/dashboard/accept-orders',
          component: resolve(__dirname, 'pages/dashboard/accept-orders.vue'),
          meta: { roles: ['admin', 'waiter'] }, 
          middleware: 'auth',
        },
      );
    },
  },

  compatibilityDate: '2025-01-06',
};