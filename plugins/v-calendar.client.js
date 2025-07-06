import VCalendar from 'v-calendar'
import 'v-calendar/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    nuxtApp.vueApp.use(VCalendar, {
      componentPrefix: 'V' 
    })
  }
})