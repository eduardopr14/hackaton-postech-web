// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import About from '@/components/About.vue';
import LoginView from '@/views/LoginView.vue';
import QuizView from '@/views/QuizView.vue';
import Professor from '@/components/Professor/Professor.vue';
import Student from '@/components/Student/Student.vue';
import NotFound from '@/views/NotFound.vue';
import { useAuthStore } from '@/stores/auth';

const routes = [
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  { path: '/', name: 'Home', component: LoginView },
  { path: '/about', name: 'About', component: About },
  { path: '/login', name: 'Login', redirect: { name: 'Home' } },
  {
    path: '/quiz',
    name: 'Quiz',
    component: QuizView,
    beforeEnter: (_to: any, _from: any, next: Function) => {
      const auth = useAuthStore();
      if (auth.isLoggedIn && auth.userType === 'S') next();
      else next('/login');
    },
  },
  {
    path: '/professor',
    name: 'Professor',
    component: Professor,
    beforeEnter: (_to: any, _from: any, next: Function) => {
      const auth = useAuthStore();
      if (auth.isLoggedIn && auth.userType === 'P') next();
      else next('/login');
    },
  },
  {
    path: '/student',
    name: 'Student',
    component: Student,
    beforeEnter: (_to: any, _from: any, next: Function) => {
      const auth = useAuthStore();
      if (auth.isLoggedIn && auth.userType === 'S') next();
      else next('/login');
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
