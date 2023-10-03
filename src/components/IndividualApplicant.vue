<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRoute } from 'vue-router'
import { read_staff_data, read_listing_data } from '../firebase/individualApplicant_CRUD'
</script>

<template>
  <div class="d-flex flex-column align-items-center w-100">
    <div class="header w-100">Future header up here</div>
    <div style="width: 85%">
      <!-- Header -->

      <div class="card">
        <div class="card-body">
          <div class="row pb-5 align-items-center">
            <div class="col-2">
              <img class="profilePic" src="applicant.profilePicture" />
            </div>

            <div class="col-3">
              <h3 class="card-title m-0" style="font-family: montserrat-bold; text-align: left">
                {{ applicant.firstname }} {{ applicant.lastname }}
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
                <div v-for="skill in job.applicantSkills" :key="skill" class="d-inline">
                  <span
                    class="badge bg-primary me-2 p-2 ps-3 pe-3 mb-3"
                    style="font-size: small; font-weight: 400"
                    >{{ skill }}
                  </span>
                </div>
              </div>
              <div>
                <h4>Required Skills</h4>
                <div v-for="skill in job.jobSkills" :key="skill" class="d-inline">
                  <span v-if="job.applicantSkills.includes(skill)">
                    <span
                      class="badge bg-primary me-2 p-2 ps-3 pe-3 mb-3"
                      style="font-size: small; font-weight: 400"
                      >{{ skill }}
                    </span>
                  </span>
                  <span v-else>
                    <span
                      class="badge bg-light me-2 p-2 ps-3 pe-3 mb-3"
                      style="font-size: small; font-weight: 400"
                      >{{ skill }}
                    </span>
                  </span>
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
                  <font-awesome-icon icon="fa-solid fa-download" size="7px" class="me-2" /> Download
                  Resume
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
export default {
  data() {
    return {
      applicant: {
        firstname: '',
        lastname: '',
        email: '',
        position: '',
        profilePicture: 'profile.jpg',
        department: '',
        country: ''
      },

      job: {
        applicantSkills: [],
        jobSkills: []
      }
    }
  },
  async created() {
    const response = await read_staff_data(this.$route.params.name)
    this.applicant.firstname = response.firstname
    this.applicant.lastname = response.lastname
    this.applicant.email = response.email
    this.applicant.position = response.position
    this.applicant.department = response.department
    this.applicant.country = response.country
    this.job.applicantSkills = response.skillsets

    const response1 = await read_listing_data(this.$route.params.id)
    this.job.jobSkills = response1.skills
  },
  methods: {
    getProgressBarStyle(matchPercentage) {
      // Determine the color of the progress bar based on matchPercentage
      return {
        background: `
            radial-gradient(closest-side, white 79%, transparent 80% 100%),
            conic-gradient(#6A44D4 ${matchPercentage}% , #b3b3b3 0)`
      }
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
.header {
  font-family: 'montserrat';
  font-size: 30px;
  margin-left: 40px;
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
