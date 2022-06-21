// библиотеки
// Компоненты приложений
import App from './App'
import router from './routes.js'
import * as Vue from 'vue'

const app = Vue.createApp(App)
app.use(router)
app.mount("#app")
