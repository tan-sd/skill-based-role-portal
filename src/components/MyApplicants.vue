<script setup>
import { read_staff_data, read_listing_data } from '../firebase/CRUD_database'
import TopNavBar from './TopNavBar.vue'
</script>
<template>
  <div>
    <TopNavBar />
    <div class="d-flex flex-column">
      <div class="header-container px-4 py-4">
        <!-- Header -->
        <h3 class="fw-bold">My Applicants</h3>
        <button class="btn btn-secondary text-white px-5" type="button" @click="edit_clicked()">
          Edit
        </button>
      </div>

      <!-- Container for Cards -->
      <div class="body-container container-fluid px-4">
        <!-- Conditionally render loop if newAppList has data -->
        <div v-if="newAppList.length > 0">
          <router-link
            v-for="applicant in newAppList"
            :key="applicant.firstname"
            :to="`/individualApplicant/${applicant.name}/${$route.params.id}`"
            class="card border-0 my-3 p-3 bg-white flex-col flex-row listing-card justify-content-start"
          >
            <div class="add-border-left me-3 d-none d-sm-block"></div>

            <div class="profile-picture">
              <img :src="applicant.profilePicture" alt="Profile Picture" />
            </div>
            <div class="details d-inline">
              <div class="name">{{ applicant.firstname }} {{ applicant.lastname }}</div>
              <div class="position">{{ applicant.position }}</div>
            </div>
            <!-- Only display the progress-bar when matchPercentage is defined -->
            <div
              class="progress-bar"
              v-if="typeof applicant.matchPercentage === 'number'"
              :style="getProgressBarStyle(applicant.matchPercentage)"
            >
              <div class="progress-text">
                {{ Math.round(applicant.matchPercentage) }}%
                <span class="match-text">Match</span>
              </div>
            </div>
          </router-link>
        </div>
        <!-- Display a loading message if newAppList is empty -->
        <div v-else>There is no such listing available</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      job: {
        jobSkills: [],
        applicantsList: []
      },
      newAppList: [] // Initialize newAppList as an empty array
    }
  },
  async created() {
    const response1 = await read_listing_data(this.$route.params.id)
    this.job.jobSkills = response1.skills
    this.job.applicantsList = response1.applicants

    function calculateMatchPercentage(reqs, skills) {
      // Ensure both input arrays are non-empty
      if (reqs.length === 0 || skills.length === 0) {
        return 0 // No match if either array is empty
      }

      // Initialize a counter for common elements
      let commonCount = 0

      // Create a Set from the `skills` array for faster lookup
      const skillsSet = new Set(skills)

      // Loop through the `reqs` array and count common elements
      for (const req of reqs) {
        if (skillsSet.has(req)) {
          commonCount++
        }
      }

      // Calculate the match percentage
      const matchPercentage = (commonCount / reqs.length) * 100

      return matchPercentage
    }

    // Populate newAppList
    for (let i = 0; i < this.job.applicantsList.length; i++) {
      const response = await read_staff_data(this.job.applicantsList[i])
      const tempObj = {
        name: this.job.applicantsList[i],
        firstname: response.firstname,
        lastname: response.lastname,
        position: response.position,
        applicantSkills: response.skillsets,
        matchPercentage: calculateMatchPercentage(this.job.jobSkills, response.skillsets)
      }

      this.newAppList.push(tempObj) // Push data to newAppList
    }
  },
  methods: {
    getProgressBarStyle(matchPercentage) {
      // Determine the color of the progress bar based on matchPercentage
      return {
        background: `
          radial-gradient(closest-side, white 79%, transparent 80% 100%),
          conic-gradient(#6A44D4 ${matchPercentage}% , #b3b3b3 0)`
      }
    },

    edit_clicked() {
      var listing_id = this.$router.currentRoute.value.params.id
      this.$router.push(`/jobListingForm`) // Note to Ling Xiao from Adam: U can find a way to pass the listing id to the form page
    }
  },
  computed: {
    getMatchPercentage() {
      let skillsApplicantMatchcount = 0
      for (let i = 0; i < this.job.jobSkills.length; i++) {
        if (this.job.applicantSkills.includes(this.job.jobSkills[i])) {
          skillsApplicantMatchcount++
        }
      }
      const matchPercentage = Math.round(
        (skillsApplicantMatchcount / this.job.jobSkills.length) * 100
      )
      return matchPercentage
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 0 0 0px;
}

.body-container {
  flex: 1 0 0px;
}

.card:hover {
  background-color: #6a44d4 !important;
  color: #ffffff;
}

.listing-card {
  align-items: center;
}

.card:hover .progress-bar {
  border: 2px solid #ffffff;
}

.add-border-left::before {
  content: '';
  border: solid 0.125rem #6a44d4;
  border-radius: 1rem;
  transition: color 0.3s ease-in-out;
}

.card:hover .add-border-left::before {
  border: solid 0.125rem #ffffff;
}

.profile-picture {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.details {
  flex: 1;
  margin-left: 30px;
  margin-right: 10px;
}

.name {
  font-size: 18px;
  font-family: 'montserrat-bold';
}

.position {
  font-size: 14px;
  color: #b3b3b3;
}

.progress-bar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: black;
  position: relative;
  margin-bottom: 5px;
}

.progress-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: 'montserrat-bold';
}
</style>
