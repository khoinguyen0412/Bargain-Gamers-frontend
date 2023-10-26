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
      path: '/profile/:username',
      name: 'profile',
      component: () => import('../views/UserProfileView.vue'),
    },


    {
      path: '/profile',
      name: 'profile-redirect',
      beforeEnter:(async(to,from,next)=>{
          if(store.state.authenticated){
              next(`/profile/${store.state.curr_user}`)
          }
          else{
              next('/auth')
          }
      })
    },

    {
      path:  '/:catchAll(.*)',
      redirect: '404',
    },

   
    {
      path: '/404',
      name: '404',
      component: () => import('../views/404.vue')
    }
  ]
})

router.beforeEach(async(to,from,next) => {
  if (to.matched.some(record => record.meta.auth === false)){
    if(store.getters.getAuth){
        next('/main')  
    }
    else{
      next()
    }
  }
  else{
    next()
  }
})

export default router
