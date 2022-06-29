import {createRouter, createWebHistory} from 'vue-router'
import Home from './pages/App-home.vue'
import Modes from './pages/App-modes.vue'
import Statistics from './pages/App-statistics.vue'


const routes = [
    { path: '/', component: Home },
    { path: '/modes', component: Modes },
    { path: '/statistics', component: Statistics },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router