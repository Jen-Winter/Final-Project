import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '/Users/jenniferw/Documents/Jennifer-Repository-Ironhack/Final Project/upcabulary-app/src/pages/AuthPage.vue'
import Dashboard from '/Users/jenniferw/Documents/Jennifer-Repository-Ironhack/Final Project/upcabulary-app/src/pages/Dashboard.vue'

const routes = [
  { path: '/auth', component: AuthPage },
  { path: '/', component: Dashboard },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
