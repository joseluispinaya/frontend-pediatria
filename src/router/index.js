import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/doctors',
    name: 'doctors',
    component: () => import('@/views/DoctorView.vue'),
  },
  {
    path: '/patients',
    name: 'patients',
    component: () => import('@/views/PatientView.vue'),
  },
  {
    path: '/appointments',
    name: 'appointments',
    component: () => import('@/views/AppointmentView.vue'),
  },
  {
    path: '/consultations',
    name: 'consultations',
    component: () => import('@/views/ConsultationView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;