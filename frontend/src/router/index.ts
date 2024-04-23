import { createRouter, createWebHistory } from 'vue-router'
import BlinkGone from '../views/BlinkGone.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BlinkGone
    },
    {
      path: '/receive/:id',
      name: 'messages',
      component: () => import('../views/ShowMessage.vue')
    }
  ]
})

export default router
