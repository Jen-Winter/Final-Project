import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '../pages/HomePage.vue';
import AuthPage from '../pages/AuthPage.vue';
import Dashboard from '../pages/UserDashboard.vue';
import { useUserStore } from '../stores/user.js'

const routes = [
  { path: '/', component: Homepage },
  { path: '/auth', component: AuthPage },
  { path: '/dashboard', component: Dashboard , meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const userStore = useUserStore()
  await userStore.fetchUser()

  const isAuth = !!userStore.user

  // redirecionar para /auth se tentar acessar uma rota que requer autenticação e o usuário não estiver autenticado
  if (to.meta.requiresAuth && !isAuth) {
    return '/auth'
  }

  // redirecionar para /dashboard se o usuário já estiver autenticado e tentar acessar a página de autenticação
  if (to.path === '/auth' && isAuth) {
    return '/dashboard'
  }
})

export default router
