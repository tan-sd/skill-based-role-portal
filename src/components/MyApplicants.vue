<script setup>
import { getStaffObj } from '../firebase/staff_class'
import Listing from '../firebase/listing_class'
import TopNavBar from './TopNavBar.vue'
</script>
<template>
  <div>
    <TopNavBar />
    <div class="d-flex flex-column w-100">
      <!-- Listing Details Header -->
      <div class="header-container px-4 py-4">
        <!-- Header -->
        <h3 class="fw-bold">Listing Details</h3>
        <button
          v-if="isListingExpired(listingDetails.deadline)"
          class="btn btn-secondary text-white px-3"
          type="button"
          @click="edit_clicked()"
        >
          Reopen Listing
        </button>
        <button
          v-else
          class="btn btn-secondary text-white px-3"
          type="button"
          @click="edit_clicked()"
        >
          Edit Listing
        </button>
      </div>

      <!-- Listing Details -->
      <div class="bg-white rounded m-3 p-4">
        <div class="row">
          <div class="col-7">
            <!-- Job Description -->
            <h5 class="fw-bold">Job Description</h5>
            <p>{{ listingDetails.description }}</p>

            <!-- Job Requirements -->
            <h5 class="fw-bold mt-4">Job Requirements</h5>
            <ul>
              <li :key="index" v-for="(req, index) in listingDetails.responsibilities">
                {{ req }}
              </li>
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
          </div>
        </div>
      </div>

      <!-- My Applicants Header -->
      <div class="header-container px-4 py-4">
        <!-- Header -->
        <h3 class="fw-bold">My Applicants</h3>

        <!-- SORT & FILTER container -->
        <div class="d-flex">
          <!-- FILTER -->
          <div class="dropdown me-3">
            <button
              class="btn btn-primary"
              type="button"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              <font-awesome-icon icon="fa-solid fa-filter" />
            </button>

            <div class="dropdown-menu dropdown-menu-end p-3">
              <!-- Filter by Name -->
              <h6>Name</h6>

              <div class="input-group mb-2">
                <span class="input-group-text">
                  <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                </span>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Search..."
                  v-model="applicantsNameSearch"
                />
                <div
                  class="input-group-text btn btn-light"
                  @click="applicantsNameSearch = ''"
                  :class="{ disabled: applicantsNameSearch == '' }"
                >
                  <font-awesome-icon icon="fa-solid fa-xmark" size="xs" />
                </div>
              </div>

              <hr />

              <!-- Filter by Skills -->
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="m-0">Skills</h6>
                <div>
                  <button class="btn btn-light btn-sm me-2" @click="clearSkillsFilter()">
                    <small>Clear</small>
                  </button>
                  <button class="btn btn-light btn-sm" @click="selectAllSkillsFilter()">
                    <small>Select All</small>
                  </button>
                </div>
              </div>

              <div class="filter-skills-scrollable">
                <div v-for="(e_skill, index) in listingDetails.skills">
                  <div class="form-check mb-2 ms-1">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :value="e_skill"
                      :id="`skill_filter_checkbox_${index}`"
                      name="skill_filter_checkbox"
                      v-model="applicantsSkillsFilter"
                    />
                    <label class="form-check-label" :for="`skill_filter_checkbox_${index}`">
                      {{ e_skill }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- SORT -->
          <div class="dropdown">
            <button
              class="btn btn-primary"
              type="button"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              <font-awesome-icon icon="fa-solid fa-arrows-up-down" />
            </button>

            <div class="dropdown-menu dropdown-menu-end p-3">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  value="skillmatch"
                  id="sort_1"
                  name="sort_by"
                  checked
                  @click="sortMatchPercentage()"
                />
                <label class="form-check-label" for="sort_1">
                  Sort by skill match (high to low)
                </label>
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  value="name_a_z"
                  id="sort_2"
                  name="sort_by"
                  @click="sortApplicantNameDescending()"
                />
                <label class="form-check-label" for="sort_2"> Sort by name (A-Z) </label>
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  value="name_z_a"
                  id="sort_3"
                  name="sort_by"
                  @click="sortApplicantNameAcending()"
                />
                <label class="form-check-label" for="sort_3"> Sort by name (Z-A) </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- My Applicants -->
      <div class="body-container container-fluid px-4">
        <!-- Conditionally render loop if newAppList has data -->
        <div v-if="newAppList.length > 0">
          <div v-for="(applicant, index) in newAppList" :key="index">
            <div
              v-if="
                applicant.name.toLowerCase().includes(applicantsNameSearch.toLowerCase()) &&
                checkForAnySkillMatch(applicant.applicantSkills)
              "
            >
              <router-link
                :key="applicant.name"
                :to="`/${applicant.listingId}/individualApplicant/${applicant.staffId}`"
                class="card border-0 my-3 p-3 bg-white flex-col flex-row listing-card justify-content-start"
              >
                <div class="profile-picture">
                  <img :src="applicant.profilePic" alt="Profile Picture" />
                </div>
                <div class="details d-inline">
                  <div class="name">{{ applicant.name }}</div>
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
          </div>
          <div
            v-if="
              !newAppList.some(
                (applicant) =>
                  applicant.name.toLowerCase().includes(applicantsNameSearch.toLowerCase()) &&
                  checkForAnySkillMatch(applicant.applicantSkills)
              )
            "
            class="d-flex flex-column align-items-center justify-content-center h-100"
          >
            <p><font-awesome-icon icon="fa-solid fa-ghost" class="text-light2" size="5x" /></p>
            <h4 class="fw-bold">OOPS! No applicants match your current filter criteria...</h4>
          </div>
        </div>

        <!-- Display a loading message if newAppList is empty -->
        <div v-else class="d-flex flex-column align-items-center justify-content-center h-100">
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
      listingDetails: {},
      userSkills: [],
      newAppList: [],

      // Applicants: for filtering
      applicantsNameSearch: '',
      applicantsSkillsFilter: []
    }
  },
  async created() {
    const listing = await this.fetchIndividualListingData()
    await this.fetch_read_staff_data(listing)
    await this.getUserSkills()
  },
  methods: {
    async fetchIndividualListingData() {
      try {
        const listing = new Listing()
        await listing.loadListing(this.$route.params.listingid)
        this.listingDetails = listing.getAllAtrr()
        return listing
      } catch (error) {
        console.log('Error fetching data from Firebase:', error)
      }
    },
    async fetch_read_staff_data(listing) {
      for (let i = 0; i < listing.getApplicants().length; i++) {
        const response = await getStaffObj(listing.getApplicants()[i])
        const tempObj = {
          listingId: this.listingDetails.listingId,
          staffId: response.getID(),
          name: response.getFullName(),
          position: response.getPosition(),
          applicantSkills: response.getSkillset(),
          profilePic: response.getProfilePic(),
          matchPercentage: this.calculateMatchPercentage(
            listing.getSkills(),
            response.getSkillset()
          )
        }

        this.newAppList.push(tempObj) // Push data to newAppList
        this.sortMatchPercentage() // Sort newAppList by matchPercentage
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
      var listing_id = this.$router.currentRoute.value.params.listingid
      this.$router.push({ name: 'editListing', params: { listingid: listing_id } })
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
    toHumanReadbleDate(date) {
      const dateObj = new Date(date)
      const options = { day: '2-digit', month: 'short', year: 'numeric' }
      return dateObj.toLocaleDateString('en-US', options)
    },
    isListingExpired(deadline) {
      const currentDate = new Date()
      const listingDeadline = new Date(deadline)
      return currentDate > listingDeadline
    },
    sortMatchPercentage() {
      this.newAppList.sort((a, b) => {
        return b.matchPercentage - a.matchPercentage
      })
    },
    sortApplicantNameDescending() {
      this.newAppList.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    },
    sortApplicantNameAcending() {
      this.newAppList.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    },
    checkForAnySkillMatch(applicantSkills) {
      if (this.applicantsSkillsFilter.length === 0) {
        return true
      }

      const skillsSet = new Set(applicantSkills)

      // Loop through the `reqs` array and count common elements
      for (const req of this.applicantsSkillsFilter) {
        if (skillsSet.has(req)) {
          return true
        }
      }

      return false
    },
    clearSkillsFilter() {
      this.applicantsSkillsFilter = []
    },
    selectAllSkillsFilter() {
      this.applicantsSkillsFilter = this.listingDetails.skills
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
  transition:
    background-color 0.3s ease-in-out,
    color 0.3s ease-in-out;
}

.card:hover .progress-bar {
  box-shadow: 0 0 0 0.25rem #ffffff;
}

.add-border-left::before {
  content: '';
  border: solid 0.125rem #6a44d4;
  border-radius: 1rem;
  transition: color 0.3s ease-in-out;
}

.card:hover .position {
  color: #dcdcdc !important;
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
  transition: all 500ms ease-in-out;
}

.progress-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: 'montserrat-bold';
}

.dropdown-menu {
  min-width: 300px;
}
.filter-skills-scrollable {
  max-height: 100px;
  overflow-y: scroll;
}
.btn-remove-styling {
  all: unset;
}
</style>
