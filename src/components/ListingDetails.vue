<script setup>
import Listing from '../firebase/listing_class'
import ResumeDropOffButton from './ResumeDropOffButton.vue'
import '../main.js'
import TopNavBar from './TopNavBar.vue'
import { getStaffObj } from '../firebase/staff_class'
</script>

<template>
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
            v-for="(e_skill, index) in listingDetails.skills"
            :key="index"
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

          <div v-if="!applied.includes(parseInt(this.$route.params.id))">
            <ResumeDropOffButton
              :job="listingDetails.title"
              :listing="listingDetails.listingId"
              :key="listingDetails.title"
            ></ResumeDropOffButton>
          </div>
          <div v-else>
            <button type="button" class="btn btn-secondary applyButton" disabled>Applied</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.fetchIndividualListingData(), this.fetch_read_staff_data()
  },
  data() {
    return {
      listingDetails: {
        title: '',
        description: '',
        skills: [],
        responsibilities: [],
        createdate: '',
        deadline: ''
      },
      userSkills: [],
      applied: [],
    }
  },
  methods: {
    async fetchIndividualListingData() {
      try {
        const newListing = new Listing()
        await newListing.loadListing(this.$route.params.id)
        this.listingDetails = newListing.getAllAtrr()
        const user_id = localStorage.getItem('id')
        const staff = await getStaffObj(user_id)
        const user_skills = staff.getSkillset()
        this.listingDetails.skills.sort((a, b) => {
          if (user_skills.includes(a)) {
            return -1
          } else if (user_skills.includes(b)) {
            return 1
          } else {
            return 0
          }
        })
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
        const staff = await getStaffObj(user_id)
        const user_skills = staff.getSkillset()

        this.userSkills = user_skills
      } catch (error) {
        console.log('Error fetching data from Firebase:', error)
      }
    },
    async fetch_read_staff_data() {
      const staff = await getStaffObj(localStorage.getItem('id'))
      this.applied = staff.getListingsApplied()
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
