<script setup>
import { read_staff_data, read_listing_data } from '../firebase/CRUD_database'
import { getStaffObj } from '../firebase/staff_class';
import Listing from '../firebase/listing_class';
import TopNavBar from './TopNavBar.vue'
import { faThinkPeaks } from '@fortawesome/free-brands-svg-icons';
</script>
<template>
  <div>
    <TopNavBar />
    <div class="d-flex flex-column h-100">
      <div class="header-container px-4 py-4">
        <!-- Header -->
        <h3 class="fw-bold">My Applicants</h3>
        <button class="btn btn-secondary text-white px-5" type="button" @click="edit_clicked()">
          Edit Listing
        </button>
      </div>

      <!-- Container for Cards -->
      <div class="body-container container-fluid px-4">
        <!-- Conditionally render loop if newAppList has data -->
        <div v-if="newAppList.length > 0">
          <router-link
            v-for="applicant in newAppList"
            :key="applicant.name"
            :to="`/individualApplicant/${applicant.id}`"
            class="card border-0 my-3 p-3 bg-white flex-col flex-row listing-card justify-content-start"
          >

            <div class="profile-picture">
              <img :src="applicant.profilePic" alt="Profile Picture" />
            </div>
            <div class="details d-inline">
              <div class="name">{{ applicant.name}}</div>
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
        <div
          v-else
          class="d-flex flex-column align-items-center justify-content-center h-100"
        >
          <p><font-awesome-icon icon="fa-solid fa-ghost" class="text-light2" size="5x" /></p>
          <h4 class="fw-bold">OOPS! Looks like you have no applicants yet...</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      job: {
        listingDetails: {

        },
        jobSkills: [],
        applicantsList: []
      },
      newAppList: [] // Initialize newAppList as an empty array
    }
  },
  async created() {
    
    const listing = await this.fetchIndividualListingData()
    console.log("applicants length")
    console.log(listing.getApplicants())
    await this.fetch_read_staff_data(listing)
    console.log(this.newAppList)
    


    // Populate newAppList
    
  },
  methods: {
    async fetchIndividualListingData() {
      try {
        const listing = await new Listing()
        await listing.loadListing(this.$route.params.id)
        console.log("Listing :")
        console.log(listing)
        return listing

      } catch (error) {
        console.log('Error fetching data from Firebase:', error)
      }
    },
    async fetch_read_staff_data(listing) {
      for (let i = 0; i < listing.getApplicants().length; i++) {
      const response = await getStaffObj(listing.getApplicants()[i])
      console.log("get Response!")
      console.log(response)
      const tempObj = {
        id: response.getID(),
        name: response.getFullName(),
        position: response.getPosition(),
        applicantSkills: response.getSkillset(),  
        profilePic: response.getProfilePic(),
        matchPercentage: this.calculateMatchPercentage(listing.getSkills(), response.getSkillset())
      }

      this.newAppList.push(tempObj) // Push data to newAppList
    }
    },
    calculateMatchPercentage(reqs, skills) {
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
    },
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
      this.$router.push({ name: 'editListing', params: { id: listing_id } })
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
