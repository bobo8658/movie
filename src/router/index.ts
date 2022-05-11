import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: { name: 'Home' } },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/movie',
    name: 'Movie',
    component: () => import('@/views/Movie.vue')
  },
  {
    path: '/Order',
    name: 'order',
    component: () => import('@/views/Order.vue')
  },
  {
    path: '/adminLogin',
    name: 'AdminLogin',
    component: () => import('@/views/admin/Login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/Home.vue'),
    redirect: { path: '/admin/user' },
    children: [
      { path: '/admin/user', component: () => import('@/views/admin/User.vue') },
      { path: '/admin/movie', component: () => import('@/views/admin/Movie.vue') },
      { path: '/admin/order', component: () => import('@/views/admin/Order.vue') }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
