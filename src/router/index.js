import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store';


const routes = [
  {
    path: '/',
    component: () => import ('@/views/Main')
  },
  {
    path: '/AddCategory',
    component: () => import ('@/views/Category')
  },
  {
    path: '/EditCategories',
    component: () => import ('@/views/CategoryManagement')
  },
  {
    path: '/AddOperation',
    component: () => import ('@/views/AddOperation')
  },
  {
    path: '/AddWallet',
    component: () => import ('@/views/AddWallet')
  },
  {
    path: '/Login',
    component: () => import ('@/views/Login'),
    meta: {
      withoutPermission: true
    },
  },
  {
    path: '/Registration',
    component: () => import ('@/views/Registration'),
    meta: {
      withoutPermission: true
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.getters.getIsAuth && !to.meta.withoutPermission){
    console.log(store.getters.getIsAuth);
    next(false)
  } else {
    next()
  }
})

export default router
