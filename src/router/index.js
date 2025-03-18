import { createRouter, createWebHistory } from 'vue-router'
import Search from '../components/Search.vue'

// 路由
const routes = [
  {
    path: '/',
    redirect: '/search'
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
