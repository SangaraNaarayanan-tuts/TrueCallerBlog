import BlogDetailsPage from '@/pages/blogDetailsPage/BlogDetailsPage.vue'
import HomePage from '../pages/homePage/HomePage.vue'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/blog/:blogslug',
    name: 'blogdetails',
    component: BlogDetailsPage
  },
  { 
    path: '/:catchAll(.*)', 
    component: NotFoundPage,
    name: 'NotFound'
  }

]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
