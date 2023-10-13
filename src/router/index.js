import { createRouter, createWebHistory } from 'vue-router'
import StyleGuide from '../views/StyleGuide.vue'
import IndividualApplicant from '../components/IndividualApplicant.vue'
import MyApplicants from '../components/MyApplicants.vue'
import LoginPage from '../views/LoginPage.vue'
import MyListings from '../components/MyListings.vue'
import MyApplications from '../components/MyApplications.vue'
import DiscoverJobs from '../components/DiscoverJobs.vue'
import ListingDetails from '../components/ListingDetails.vue'
import jobListingForm from '../views/joblistingform.vue'
import JobEditingForm from '../views/JobEditingForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage
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
      path: '/mylistings',
      name: 'myListings',
      component: MyListings
    },
    {
      path: '/editListing/:id',
      name: 'editListing',
      component: JobEditingForm,
      props: true, // Pass route params as props
    },
    {
      path: '/myapplications',
      name: 'myApplications',
      component: MyApplications
    },
    {
      path: '/styleGuide',
      name: 'styleGuide',
      component: StyleGuide
    },
    {
      path: '/jobListingForm',
      name: 'jobListingForm',
      component: jobListingForm
    },

    //Test if the data is received after HR submit the job listing form

    {
      path: '/listingdetails/:id',
      name: 'listingDetails',
      component: ListingDetails,
      props: (route) => ({details: route.params.details})
    },
    {
      path: '/individualApplicant/:id',
      name: 'individualApplicant',
      component: IndividualApplicant
    },
    {
      path: '/:id/myApplicants/',
      name: 'myApplicants',
      component: MyApplicants
    },
    {
      path: '/discoverJobs',
      name: 'discoverJobs',
      component: DiscoverJobs
    }
  ]
})

export default router
