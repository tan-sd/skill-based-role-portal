import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import StyleGuide from '../views/StyleGuide.vue'
import EditView from '../views/EditView.vue'
import individualApplicant from '../views/individualApplicant.vue'
import myApplicants from '../views/myApplicants.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: HomePage
    },
    {
      // path: '/about',
      // name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    },
    {
      path: '/styleGuide',
      name: 'styleGuide',
      component: StyleGuide
    },

    //Test if the data is received after HR submit the job listing form
    {
      path: '/editView',
      name: 'editView',
      component: EditView
    },

    {
      path: '/individualApplicant/:name/:id',
      name: 'individualApplicant',
      component: individualApplicant
    },

    {
      path: '/:id/myApplicants/',
      name: 'myApplicants',
      component: myApplicants
    }
  ]
})

export default router
