<!-- For testing the job listing edit function
<script setup>
  import {ref} from "vue"

  const emit = defineEmits(["create-listing"])

  const jobTitle = ref("")

  const createListing = () => {
    emit("create-listing", jobTitle.value)
  }
</script> -->

<!-- <template>
  <div class="container">
    <div class="card">
      <div class="card-body">
              <h2 class="card-title">
                Form
              </h2>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Title of the Job</label>
                <input v-model="jobTitle" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
              </div>

              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
              </div>

              <button @click="createListing" type="submit" class="btn btn-primary">Create</button>

      </div>
    </div>
  </div>
</template> -->

<!-- <style lang="scss" scoped>
  .container {
    margin: 0 5vw 0 5vw;
    background-color: #ffffff;
    border-radius: 10px;
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
     transition: background-color 0.3s, color 0.3s;
     color: black;
     border-color: #ffffff;
   }
</style> -->

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
              v-model="jobListing.createdate"
              required
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
              <button @click="removeResponsibility(index)" class="btn btn-danger btn-sm ms-1">
                Remove
              </button>
            </div>
            <button @click="addResponsibility" class="btn btn-primary btn-sm mt-1">
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
              <button @click="removeSkill(index)" class="btn btn-danger btn-sm ms-1">Remove</button>
            </div>
            <button @click="addSkill" class="btn btn-primary btn-sm mt-1">Add Skill</button>
          </div>
          <div style="margin-top: 1em"></div>
          <button @click="navigateBack" class="btn btn-dark">Cancel</button>
          <button type="submit" class="btn btn-primary ms-2">Create Job Listing</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { addNewListing } from '../firebase/CRUD_database.js'

export default {
  data() {
    return {
      jobListing: {
        title: '',
        createdate: '',
        deadline: '',
        department: '',
        description: '',
        applicants: [''],
        createdby: '',
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
    submitForm() {
      // Call the Firebase function to write data
      console.log('Form Data:', this.jobListing)
      const status = addNewListing(this.jobListing)
      if (status) {
        this.failureMessage = '';
        this.successMessage = 'Listing has been successfully added!';
        this.clearForm()
      } else {
        this.failureMessage = 'Failed to add the listing. Please try again.'
      }
    },
    clearForm() {
      // Clear the form fields
      this.jobListing = {
        title: '',
        createdate: '',
        deadline: '',
        department: '',
        description: '',
        applicants: [''],
        createdby: '',
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
    }
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
