<script setup>
import { individualListingData } from '../firebase/CRUD_database'
import ResumeDropOffButton from './ResumeDropOffButton.vue'
import '../main.js'
import TopNavBar from './TopNavBar.vue'
import { read_staff_data } from '../firebase/CRUD_database'
</script>

<template>
  <!--
  listingDetails.description ,
  <li :key="index" v-for="(req, index) in listingDetails.responsibilities"> {{ req }}</li>
-->
  <div class="w-100">
    <TopNavBar />

    <div class="bg-white rounded m-3 p-4">
      <div class="row">
        <div class="col-7">
          <!-- Job Description -->
          <h5 class="fw-bold">Job Description</h5>
          <p>{{ listingDetails.description }}</p>

          <!-- Job Requirements -->
          <h5 class="fw-bold mt-4">Job Requirements</h5>
          <ul>
            <li :key="index" v-for="(req, index) in listingDetails.responsibilities">{{ req }}</li>
          </ul>

          <!-- Required Skills -->
          <h5 class="fw-bold">Required Skills</h5>
          <div
            v-for="e_skill in listingDetails.skills"
            class="mb-1 me-2 p-1 px-2 text-white rounded d-inline-block"
            :class="userSkills.includes(e_skill) ? 'bg-primary' : 'bg-light2'"
          >
            {{ e_skill }}
          </div>
        </div>

        <div class="col-5 position-relative">
          <!-- Application Period -->
          <p>
            <span class="fw-bold add-border-right">Application Period</span>
            {{ toHumanReadbleDate(listingDetails.createdate) }} to
            {{ toHumanReadbleDate(listingDetails.deadline) }}
          </p>

          <!-- here need to change xx to however we retrieve listing title -->
          <ResumeDropOffButton
            :job="listingDetails.title"
            :key="listingDetails.title"
          ></ResumeDropOffButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.fetchIndividualListingData()
  },
  data() {
    return {
      listingDetails: [],
      userSkills: []
    }
  },
  methods: {
    async fetchIndividualListingData() {
      try {
        const data = await individualListingData(this.$route.params.id)
        this.listingDetails = data
      } catch (error) {
        console.log('Error fetching data from Firebase:', error)
      }
    },

    toHumanReadbleDate(date) {
      const dateObj = new Date(date)
      const options = { day: '2-digit', month: 'short', year: 'numeric' }
      return dateObj.toLocaleDateString('en-US', options)
    },

    async getUserSkills() {
      const user_id = localStorage.getItem('id')

      try {
        const user_data = await read_staff_data(user_id)
        const user_skills = user_data.skillsets

        this.userSkills = user_skills
      } catch (error) {
        console.log('Error fetching data from Firebase:', error)
      }
    }
  },
  mounted() {
    this.getUserSkills()
  }
}
</script>

<style>
.add-border-right::after {
  content: '';
  border: solid 0.125rem #6a44d4;
  border-radius: 1rem;
  margin-left: 0.35rem;
}
</style>
