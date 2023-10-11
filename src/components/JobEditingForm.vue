<script setup>
import TopNavBar from './TopNavBar.vue'
</script>

<template>
  <TopNavBar />
  <div class="container">

    <div
      class="alert alert-success alert-dismissible fade show general mb-3"
      v-if="successMessage"
      >
      {{ successMessage }}
      <font-awesome-icon :icon="['fas', 'xmark']" size="xl" class="close float-end" data-dismiss="alert" @click="clearSuccessMessage"/>
    </div>

    <div
    class="alert alert-danger alert-dismissible fade show general mb-3"
    v-if="failureMessage"
  >
    {{ failureMessage }}
    <font-awesome-icon :icon="['fas', 'xmark']" size="xl" class="close float-end" data-dismiss="alert" @click="clearFailureMessage"/>
    </div>

    <div class="card card_sp">
      <div class="card-body">
        <h2 class="card-title title">Current Listing Details</h2>
        <form @submit.prevent="submitForm" class="general">
          <div class="form-group">
            <label for="jobTitle">Job Title</label>
            <input
              type="text"
              class="form-control"
              id="jobTitle"
              v-model="jobListing.title"
              required
            />
          </div>

          <div class="form-group" style="margin-top: 1em">
            <label for="createdDate">Created Date</label>
            <input
              type="date"
              class="form-control"
              id="createdDate"
              v-model="jobListing.createdate"
              required
              disabled 
            />
          </div>

          <div class="form-group" style="margin-top: 1em">
            <label for="deadline">Deadline</label>
            <input
              type="date"
              class="form-control"
              id="deadline"
              v-model="jobListing.deadline"
              required
              :min="getMinDate()"
            />
          </div>

          <div class="form-group" style="margin-top: 1em">
            <label for="department">Department</label>
            <input
              type="text"
              class="form-control"
              id="department"
              v-model="jobListing.department"
              required
            />
          </div>

          <div class="form-group" style="margin-top: 1em">
            <label for="description">Description</label>
            <textarea
              class="form-control"
              id="description"
              v-model="jobListing.description"
              required
            ></textarea>
          </div>

          <div class="form-group" style="margin-top: 1em">
            <label for="responsibilities">Responsibilities</label>
            <div
              v-for="(responsibility, index) in jobListing.responsibilities"
              :key="index"
              class="d-flex align-items-center"
            >
              <input
                type="text"
                class="form-control mb-1"
                v-model="jobListing.responsibilities[index]"
                required
              />
              <button @click="removeResponsibility(index)" class="btn btn-danger btn-sm ms-1" type="button">
                Remove
              </button>
            </div>
            <button @click="addResponsibility" class="btn btn-primary btn-sm mt-1" type="button">
              Add Responsibility
            </button>
          </div>

          <div class="form-group" style="margin-top: 1em">
            <label for="skills">Skills</label>
            <div
              v-for="(skill, index) in jobListing.skills"
              :key="index"
              class="d-flex align-items-center"
            >
              <input
                type="text"
                class="form-control mb-1"
                v-model="jobListing.skills[index]"
                required
              />
              <button @click="removeSkill(index)" class="btn btn-danger btn-sm ms-1" type="button">Remove</button>
            </div>
            <button @click="addSkill" class="btn btn-primary btn-sm mt-1" type="button">Add Skill</button>
          </div>
          <div style="margin-top: 1em"></div>
          <button @click="navigateBack" class="btn btn-dark" type="button">Cancel</button>
          <button type="submit" class="btn btn-primary ms-2">Update Job Listing</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Listing from '../firebase/listing_class'

export default {
  created() {
    this.fetchIndividualListingData()
  },
  data() {
    return {
      jobListing: {
        title: '',
        createdate: '',
        deadline: '',
        department: '',
        description: '',
        applicants: [''],
        responsibilities: [''], // Initialize with one empty item
        skills: [''] // Initialize with one empty item
      },
      successMessage: '',
      failureMessage: ''
    }
  },

  methods: {
    async fetchIndividualListingData() {
      try {
        var listing = new Listing()
        await listing.loadListing(this.$route.params.id)

        this.jobListing.title = listing.getTitle()
        this.jobListing.createdate = listing.getCreateDate()
        this.jobListing.deadline = listing.getDeadline()
        this.jobListing.department = listing.getDepartment()
        this.jobListing.description = listing.getDescription()
        this.jobListing.applicants = listing.getApplicants()
        this.jobListing.responsibilities = listing.getResponsibilities()
        this.jobListing.skills = listing.getSkills()
      } catch (error) {
        console.log('Error fetching data from Firebase:', error)
      }
    },
    addResponsibility() {
      this.jobListing.responsibilities.push('')
    },
    removeResponsibility(index) {
      this.jobListing.responsibilities.splice(index, 1)
    },
    addSkill() {
      this.jobListing.skills.push('')
    },
    removeSkill(index) {
      this.jobListing.skills.splice(index, 1)
    },
    async submitForm() {
      // Call the Firebase function to write data
      var listing = new Listing()
      await listing.loadListing(this.$route.params.id)
      listing.updateListing(this.jobListing)
      var status = await listing.pushUpdatedListingToDB()

      if (status) {
        this.failureMessage = '';
        this.successMessage = 'Listing has been successfully updated!';
      } else {
        this.failureMessage = 'Failed to update the listing. Please try again!'
      }
    },
    navigateBack() {
      this.$router.go(-1)
    },
    clearSuccessMessage() {
      // Clear the success message
      this.successMessage = '';
    },
    clearFailureMessage() {
      // Clear the failure message
      this.failureMessage = '';
    },
    getMinDate() {
      const today = new Date(); // Get the current date and time

      return today.toISOString().split('T')[0]
    },
  }
}
</script>

<style>
.title {
  font-family: 'montserrat-bold';
  font-size: 2em;
  margin: auto;
  text-align: center;
}
.general {
  font-family: 'montserrat-bold';
  font-size: 1em;
  margin: auto;
  margin-top: 1em;
}
.card_sp {
  margin-bottom: 2em;
  margin-left: 1em;
  margin-right: 1em;
}
</style>
