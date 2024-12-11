import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/modules/auth';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import BooksView from '../views/BooksView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/books',
    },
    {
      path: '/login',
      component: LoginView,
      meta: { requiresGuest: true },
    },
    {
      path: '/register',
      component: RegisterView,
      meta: { requiresGuest: true },
    },
    {
      path: '/books',
      component: BooksView,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/books');
  } else {
    next();
  }
});

export default router; 