// библиотеки
// Компоненты приложений
import App from './App'
import router from './routes.js'
import * as Vue from 'vue'
import axios from "axios"
axios.defaults.baseURL = 'http://localhost:3000'

const app = Vue.createApp(App)
app.use(router)
app.mount("#app")
