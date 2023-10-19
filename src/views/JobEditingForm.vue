<script setup>
import TopNavBar from '../components/TopNavBar.vue'
import FormSuccessModal from '../components/FormSuccessModal.vue';
</script>

<template>
  <div>
    <TopNavBar />
    
    <div class="container mt-4">

      <FormSuccessModal id="formSuccessModal" ref="formSucModal" />
  
      <div class="card card_sp">
        <div class="card-body">
          <h4 class="card-title text-center">Edit Listing</h4>
          <form @submit.prevent="submitForm" class="general">
            <div class="form-group">
              <label for="jobTitle">Job Title</label>

              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  id="jobTitle"
                  v-model="jobListing.title"
                  disabled
                />
      
                <div class="dropdown">
                  <button class="btn btn-primary btn-input-group" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                  </button>
      
                  <ul class="dropdown-menu dropdown-menu-end px-3">
                    <input class="form-control mb-2" id="jobTitleSearchBar" type="text" placeholder="Search.." v-model="searchBarVal">
      
                    <div class="job_title_search_menu">
                      <div v-for="(e_title, index) in Object.keys(allRoles)">
                        <div v-if="checkJobTitleSearchBar(e_title)" class="form-check mb-3 ms-2 me-4">
                          <input class="form-check-input" type="radio" :id="`jobTitleRadioBtn${index}`" v-model="jobListing.title" name="jobTitleRadioBtn" :value="e_title">
          
                          <label class="form-check-label job_title_radio_text" :for="`jobTitleRadioBtn${index}`">
                            {{ e_title }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
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
                class="input-group mb-2"
              >
                <input
                  type="text"
                  class="form-control"
                  v-model="jobListing.responsibilities[index]"
                  required
                  pattern=".*\S+.*"
                  title="Please enter at least one non-whitespace character"
                />
                <div class="input-group-text btn btn-light2" v-if="jobListing.responsibilities.length > 1" @click="removeResponsibility(index)">
                  <button type="button" class="btn-remove-styling">
                    <font-awesome-icon icon="fa-solid fa-trash" />
                  </button>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <button @click="addResponsibility" class="btn btn-primary btn-sm mt-1 rounded-circle" type="button">
                  <font-awesome-icon icon="fa-solid fa-plus" />
                </button>
              </div>
            </div>
  
            <div class="form-group" style="margin-top: 1em">
              <label for="skills">Skills</label>
              <div
                v-for="(skill, index) in jobListing.skills"
                :key="index"
                class="input-group mb-2"
              >
                <input
                  type="text"
                  class="form-control"
                  v-model="jobListing.skills[index]"
                  required
                  pattern=".*\S+.*"
                  title="Please enter at least one non-whitespace character"
                />
                <div class="input-group-text btn btn-light2" v-if="jobListing.skills.length > 1" @click="removeSkill(index)">
                  <button type="button" class="btn-remove-styling">
                    <font-awesome-icon icon="fa-solid fa-trash" />
                  </button>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <button @click="addSkill" class="btn btn-primary btn-sm mt-1 rounded-circle" type="button">
                  <font-awesome-icon icon="fa-solid fa-plus" />
                </button>
              </div>
            </div>
            <div style="margin-top: 1em"></div>
            <button @click="navigateBack" class="btn btn-dark" type="button">Cancel</button>
            <button type="submit" class="btn btn-primary ms-2">Update Job Listing</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Listing from '../firebase/listing_class'
import { allRoleData } from '../firebase/CRUD_database.js'

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
      
      allRoles: {},
      searchBarVal: '',
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
      await listing.pushUpdatedListingToDB()

      try {
        this.$refs.formSucModal.showSuccessModal('Listing Successfully Updated!')
      } catch (error) {
        this.$refs.formSucModal.showErrorModal(error)
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
    async fetchRolesFromDB() {
      this.allRoles = await allRoleData()
    },
    checkJobTitleSearchBar(my_job_title) {
      if (my_job_title.toLowerCase().indexOf(this.searchBarVal.toLowerCase()) > -1) {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {
    this.fetchRolesFromDB()
  },
}
</script>

<style scoped>
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
.btn-remove-styling {
  all: unset;
}
.btn-input-group, .btn-input-group:hover {
  transition: none;
  border-radius: 0 0.5rem 0.5rem 0;
}

.job_title_radio_text {
  white-space: nowrap;
}

.job_title_search_menu {
  max-height: 200px;
  overflow-y: scroll;
}
</style>
