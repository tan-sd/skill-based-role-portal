<template>
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

    <div class="p-3">
      <font-awesome-icon
        :icon="['fas', 'chevron-left']"
        size="2xl"
        @click="navigateBack"
        class="btn-back"
      />
    </div>

    <div class="card card_sp border-0 rounded-3">
      <div class="card-body">
        <h2 class="card-title title">Job Listing Form</h2>
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
              v-model="createdate"
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
                pattern=".*\S+.*"
                title="Please enter at least one non-whitespace character"
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
                pattern=".*\S+.*"
                title="Please enter at least one non-whitespace character"
              />
              <button @click="removeSkill(index)" class="btn btn-danger btn-sm ms-1" type="button">Remove</button>
            </div>
            <button @click="addSkill" class="btn btn-primary btn-sm mt-1" type="button">Add Skill</button>
          </div>
          <div style="margin-top: 1em"></div>
          <button @click="navigateBack" class="btn btn-dark" type="button">Cancel</button>
          <button type="submit" class="btn btn-primary ms-2">Create Job Listing</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Listing from '../firebase/listing_class.js'

export default {
  data() {
    return {
      createdate: new Date().toISOString().substr(0, 10),

      jobListing: {
        title: '',
        deadline: '',
        department: '',
        description: '',
        responsibilities: [''], // Initialize with one empty item
        skills: [''] // Initialize with one empty item
      },
      successMessage: '',
      failureMessage: ''
    }
  },
  methods: {
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
      console.log('Form Data:', this.jobListing)
      
      var curr = this.jobListing
      var new_listing = new Listing(curr.title, curr.department, curr.deadline, curr.description, curr.responsibilities, curr.skills)
      console.log("new listing", new_listing)
      await new_listing.saveNewListingToDB()
    },
    clearForm() {
      // Clear the form fields
      this.jobListing = {
        title: '',
        deadline: '',
        department: '',
        description: '',
        responsibilities: [''], // Initialize with one empty item
        skills: [''] // Initialize with one empty item
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
.btn-back {
  cursor: pointer;
}
</style>
