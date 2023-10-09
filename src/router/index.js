import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

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
      component: () => import('../views/AuthView.vue'),
      meta: {auth:false}
    },

    {
      path: '/main',
      name: 'main',
      component: ()=> import('../views/MainView.vue')
    },

    {
      path: '/profile/:username'      
    },


    {
      path: '/profile/:username/edit',
      meta: {auth: true},
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

router.beforeEach(async(to,from,next) => {
  if (to.meta.auth && !store.getters.getAuth){
      next("/auth")
  }
  if(!to.meta.auth && store.getters.getAuth){
    next("/404")
  }
  else{
    next()
  }
})

export default router
