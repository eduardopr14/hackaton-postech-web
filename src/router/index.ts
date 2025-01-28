import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const checkAuth = (expectedUserType: string) => {
  return (_to: any, _from: any, next: Function) => {
    const auth = useAuthStore();
    if (auth.isLoggedIn && auth.userType === expectedUserType) {
      next();
    } else {
      next('/login');
    }
  };
};

const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/components/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    redirect: { name: 'Home' }
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: () => import('@/views/QuizView.vue'),
    beforeEnter: checkAuth('S'),
  },
  {
    path: '/professor',
    name: 'Professor',
    component: () => import('@/components/Professor/Professor.vue'),
    beforeEnter: checkAuth('P'),
    children: [
      {
        path: 'create-professor',
        name: 'CreateProfessor',
        component: () => import('@/components/Crud/CreateProfessor.vue'),
      },
      {
        path: 'create-student',
        name: 'CreateStudent',
        component: () => import('@/components/Crud/CreateStudent.vue'),
      },
      {
        path: 'create-school',
        name: 'CreateSchool',
        component: () => import('@/components/Crud/CreateSchool.vue'),
      },
    ]
  },
  {
    path: '/student',
    name: 'Student',
    component: () => import('@/components/Student/Student.vue'),
    beforeEnter: checkAuth('S'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;