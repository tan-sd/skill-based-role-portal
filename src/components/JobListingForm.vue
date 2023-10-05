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

<template>

  <div class="container">
      <div class="card">
        <div class="card-body">
                <h2 class="card-title">
                  Form
                </h2>
                    <form @submit.prevent="submitForm">
                      <div class="form-group">
                        <label for="jobTitle">Job Title</label>
                        <input type="text" class="form-control" id="jobTitle" v-model="jobListing.title" required>
                      </div>
  
                      <div class="form-group">
                        <label for="createdDate">Created Date</label>
                        <input type="date" class="form-control" id="createdDate" v-model="jobListing.createdate" required>
                      </div>
  
                      <div class="form-group">
                        <label for="deadline">Deadline</label>
                        <input type="date" class="form-control" id="deadline" v-model="jobListing.deadline" required>
                      </div>
  
                      <div class="form-group">
                        <label for="department">Department</label>
                        <input type="text" class="form-control" id="department" v-model="jobListing.department" required>
                      </div>
  
                      <div class="form-group">
                        <label for="description">Description</label>
                        <textarea class="form-control" id="description" v-model="jobListing.description" required></textarea>
                      </div>
  
                      <div class="form-group">
                        <label for="responsibilities">Responsibilities</label>
                        <div v-for="(responsibility, index) in jobListing.responsibilities" :key="index">
                          <input type="text" class="form-control" v-model="jobListing.responsibilities[index]" required>
                          <button @click="removeResponsibility(index)" class="btn btn-danger btn-sm">Remove</button>
                        </div>
                        <button @click="addResponsibility" class="btn btn-primary btn-sm">Add Responsibility</button>
                      </div>
  
                      <div class="form-group">
                        <label for="skills">Skills</label>
                        <div v-for="(skill, index) in jobListing.skills" :key="index">
                          <input type="text" class="form-control" v-model="jobListing.skills[index]" required>
                          <button @click="removeSkill(index)" class="btn btn-danger btn-sm">Remove</button>
                        </div>
                        <button @click="addSkill" class="btn btn-primary btn-sm">Add Skill</button>
                      </div>
  
                      <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
          </div>
      </div>
  </div>           
  
  </template>
  
  <script>
  import { addNewListing } from '../firebase/CRUD_database.js';
  
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
          skills: [''], // Initialize with one empty item
        },
      };
    },
    methods: {
      addResponsibility() {
        this.jobListing.responsibilities.push('');
      },
      removeResponsibility(index) {
        this.jobListing.responsibilities.splice(index, 1);
      },
      addSkill() {
        this.jobListing.skills.push('');
      },
      removeSkill(index) {
        this.jobListing.skills.splice(index, 1);
      },
      submitForm() {
        // Call the Firebase function to write data
        console.log('Form Data:', this.jobListing);
        addNewListing(this.jobListing);
      },
  
      clearForm() {
      // Clear the form fields
        this.jobListing = {
          title: '',
          createdate: '',
          deadline: '',
          department: '',
          description: '',
          responsibilities: [''],
          skills: [''],
        };
      },
    },
  };
  </script>