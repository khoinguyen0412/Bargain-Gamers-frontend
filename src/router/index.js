import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component:() => import('../views/HomeView.vue')
    },

    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: MainView,
      beforeEnter: (to,from) => {
        alert('Not authorized')
        return router.push('/')
      }
    },
    
    {
      path:  '/:catchAll(.*)',
      redirect: '404'
    },

    {
      path: '/404',
      name: '404',
      component: () => import('../views/404.vue')
    }
  ]
})

router.beforeEach(async(to,from) => {})

export default router
