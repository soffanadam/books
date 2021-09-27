import '@/assets/css/app.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import Notifications from '@kyvg/vue3-notification'

createApp(App).use(store, key).use(router).use(Notifications).mount('#app')
