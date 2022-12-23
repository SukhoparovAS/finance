import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AddButton from '@/components/AppAddButton.vue'
import './css/style.scss'


createApp(App)
    .use(store)
    .use(router)
    .component('add-button', AddButton)
    .mount('#app')
    

