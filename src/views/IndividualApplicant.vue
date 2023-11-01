<script setup>
import TopNavBar from '../components/TopNavBar.vue'
import Listing from '../firebase/listing_class'
import { getStaffObj } from '../firebase/staff_class'
import { getFile } from '../firebase/storage'
</script>

<template>
  <div>
    <TopNavBar />

    <div class="px-3 px-md-5 pb-3">
      <div class="card m-0">
        <div class="card-body">
          <div class="row pb-5 align-items-center">
            <div class="col-2">
              <img class="profilePic" :src="applicant.profilepic" />
            </div>

            <div class="col-3">
              <h3 class="card-title m-0" style="font-family: montserrat-bold; text-align: left">
                {{ applicant.fullname }}
              </h3>
              <p class="m-0">{{ applicant.email }}</p>
            </div>

            <div class="col-1 d-flex justify-content-end">
              <div
                class="vr bg-secondary opacity-100"
                style="width: 5px; height: 60px; border-radius: 3px"
              ></div>
            </div>

            <div class="col-6">
              <h5 class="card-title">{{ applicant.position }}</h5>
              <div class="row">
                <p class="card-title">
                  {{ applicant.department }} department, {{ applicant.country }}
                </p>
              </div>
            </div>
          </div>

          <div class="row pb-3">
            <div class="col-6">
              <div class="pb-4">
                <h4>Current Skills</h4>
                <div v-for="(e_skill, index) in job.applicantSkills" :key="index" class="d-inline">
                  <span 
                    class="mb-1 me-2 p-1 px-2 text-white rounded d-inline-block bg-primary"
                    data-bs-toggle="popover"
                    data-bs-trigger="hover"
                    :data-bs-content="allSkills[e_skill]"
                    >{{ e_skill }}
                  </span>
                </div>
              </div>
              <div>
                <h4>Required Skills</h4>
                <div
                  v-for="(e_skill, index) in job.jobSkills"
                  :key="index"
                  class="mb-1 me-2 p-1 px-2 text-white rounded d-inline-block"
                  :class="job.applicantSkills.includes(e_skill) ? 'bg-primary' : 'bg-light2'"
                  data-bs-toggle="popover"
                  data-bs-trigger="hover"
                  :data-bs-content="allSkills[e_skill]"
                >
                  {{ e_skill }}
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="progress-bar" :style="getProgressBarStyle(getMatchPercentage)">
                <div class="progress-text" style="font-size: x-large">
                  {{ getMatchPercentage }}%
                  <span class="match-text" style="font-size: small">Match</span>
                </div>
              </div>
            </div>
          </div>

          <div class="row pt-5 mb-5">
            <div class="col">
              <button type="button" class="btn btn-secondary w-50 text-light">
                <span class="text-light" style="font-weight: bold">
                  <font-awesome-icon icon="fa-solid fa-download" class="me-2" />
                  <a style="color: white" target="__blank" :href="applicant.resumeDLlink"
                    >Download Resume</a
                  >
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { allSkillsData } from '../firebase/CRUD_database.js'

export default {
  data() {
    return {
      applicant: {
        fullname: '',
        email: '',
        position: '',
        department: '',
        country: '',
        resumeDLlink: '',
        profilepic: null
      },

      job: {
        applicantSkills: [],
        jobSkills: []
      },

      allSkills: [],
    }
  },
  async mounted() {
    var staff1 = await getStaffObj(this.$route.params.applicantid)

    this.applicant.fullname = staff1.getFullName()
    this.applicant.email = staff1.getEmail()
    this.applicant.profilepic = staff1.getProfilePic()
    this.applicant.department = staff1.getDepartment()
    this.applicant.position = staff1.getPosition()
    this.applicant.country = staff1.getCountry()
    this.job.applicantSkills = staff1.getSkillset()

    await this.getListingSkills()

    await this.fetchSkillsFromDB()
    this.globalMethodEnablePopovers()

    this.applicant.resumeDLlink = await getFile(
      `resumes/${this.$route.params.listingid}/${this.$route.params.applicantid}/resume.pdf`
    )
  },
  methods: {
    async getListingSkills() {
      try {
        const newListing = new Listing()
        await newListing.loadListing(this.$route.params.listingid)
        const staff = await getStaffObj(this.$route.params.applicantid)
        this.job.jobSkills = newListing.getSkills()
        this.job.jobSkills.sort((a, b) => {
          if (this.job.applicantSkills.includes(a)) {
            return -1
          } else if (this.job.applicantSkills.includes(b)) {
            return 1
          } else {
            return 0
          }
        })
      } catch (error) {
        console.log('Error fetching data from Firebase:', error)
      }
    },
    getProgressBarStyle(matchPercentage) {
      // Determine the color of the progress bar based on matchPercentage
      return {
        background: `
            radial-gradient(closest-side, white 79%, transparent 80% 100%),
            conic-gradient(#6A44D4 ${matchPercentage}% , #b3b3b3 0)`
      }
    },
    async fetchSkillsFromDB() {
      this.allSkills = await allSkillsData()
    },
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
* {
  text-decoration: none;
}
.header {
  font-family: 'montserrat';
  font-size: 30px;
  padding: 10px;
}

.card {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #ffffff;
  border-radius: 5px;
  flex: 1;
  width: 100%;
  transition:
    background-color 0.3s,
    color 0.3s;
  color: black;
}

.profilePic {
  border-radius: 50%;
  height: 80px;
  width: 80px;
  float: center;
}

.progress-bar {
  width: 160px;
  height: 160px;
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
