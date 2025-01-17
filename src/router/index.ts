// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import LoginView from '@/views/LoginView.vue';
import QuizView from '@/views/QuizView.vue';
import ProfessorView from '@/views/ProfessorView.vue';
import StudentView from '@/views/StudentView.vue';
import { useAuthStore } from '@/stores/auth';

const routes = [
  { path: '/', name: 'Home', component: LoginView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/login', name: 'Login', redirect: { name: 'Home' } },
  {
    path: '/quiz',
    name: 'Quiz',
    component: QuizView,
    beforeEnter: (_to: any, _from: any, next: Function) => {
      const auth = useAuthStore();
      if (auth.isLoggedIn) next();
      else next('/login');
    },
  },
  {
    path: '/professor',
    name: 'Professor',
    component: ProfessorView,
    beforeEnter: (_to: any, _from: any, next: Function) => {
      const auth = useAuthStore();
      if (auth.isLoggedIn && auth.userType === 'P') next();
      else next('/login');
    },
  },
  {
    path: '/student',
    name: 'Student',
    component: StudentView,
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
