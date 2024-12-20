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
     '~/assets/main.css'
  ],
  image: {
    provider: 'static', 
    domains: ['https://images.ctfassets.net'],
    static: {
      dir: 'assets/images'
    }
  },
  plugins: [],
  components: true,
  buildModules: [],
  modules: [
    '@nuxt/image'
  ],
  layers: [
    // '@nuxtjs/tailwindcss',
    '~/custom-layer'
  ],
  build: {}
}
