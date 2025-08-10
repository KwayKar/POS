import VCalendar from 'v-calendar'
import 'v-calendar/style.css'
import Vue3TouchEvents from 'vue3-touch-events'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    nuxtApp.vueApp.use(VCalendar, {
      componentPrefix: 'V' 
    });
    nuxtApp.vueApp.use(Vue3TouchEvents)
  }
})