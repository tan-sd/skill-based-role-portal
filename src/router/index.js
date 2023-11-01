import { createRouter, createWebHistory } from 'vue-router'
import StyleGuide from '../utils/StyleGuide.vue'
import IndividualApplicant from '../views/IndividualApplicant.vue'
import MyListingDetails from '../views/MyListingDetails.vue'
import LoginPage from '../views/LoginPage.vue'
import MyListings from '../views/MyListings.vue'
import MyApplications from '../views/MyApplications.vue'
import DiscoverJobs from '../views/DiscoverJobs.vue'
import ListingDetails from '../views/ListingDetails.vue'
import jobListingForm from '../views/JobListingForm.vue'
import JobEditingForm from '../views/JobEditingForm.vue'
import ProfilePage from '../views/ProfilePage.vue'

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
      path: '/editListing/:listingid',
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
    {
      path: '/profilepage',
      name: 'ProfilePage',
      component: ProfilePage
    },

    //Test if the data is received after HR submit the job listing form

    {
      path: '/listingdetails/:listingid',
      name: 'listingDetails',
      component: ListingDetails,
      props: (route) => ({details: route.params.details})
    },
    {
      path: '/:listingid/individualApplicant/:applicantid',
      name: 'individualApplicant',
      component: IndividualApplicant
    },
    {
      path: '/:listingid/myListingDetails/',
      name: 'myListingDetails',
      component: MyListingDetails
    },
    {
      path: '/discoverJobs',
      name: 'discoverJobs',
      component: DiscoverJobs
    }
  ]
})

export default router
