import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '../components/Home.vue';
import LoginComponent from '../components/Login.vue';
import RegisterComponent from '../components/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeComponent
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterComponent
    },
    {
      path: '/login',
      name: 'login',
      component: LoginComponent
    },
  ]
})

export default router
