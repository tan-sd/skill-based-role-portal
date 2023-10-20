<script setup>
  import FormSuccessModal from '../components/FormSuccessModal.vue';
</script>

<template>
  <div class="container">

    <FormSuccessModal ref="formSucModal" />

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
        <h4 class="card-title text-center">Create a New Listing</h4>

        <form @submit.prevent="submitForm" class="general">
          <div class="form-group">
            <label for="jobTitle">Job Title</label>

            <div class="input-group">
              <input
                type="text"
                class="form-control"
                id="jobTitle"
                v-model="jobListing.title"
                placeholder="Click search button to select a job title"
                disabled
              />
    
              <div class="dropdown">
                <button class="btn btn-primary btn-input-group" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                  <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                </button>
    
                <ul class="dropdown-menu dropdown-menu-end px-3">
                  <input class="form-control mb-2" id="jobTitleSearchBar" type="text" placeholder="Search.." v-model="searchBarValTitle">
    
                  <div class="dropdown_search_menu">
                    <div v-for="(e_title, index) in Object.keys(allRoles)">
                      <div v-if="checkJobTitleSearchBar(e_title)" class="form-check ms-2 list-elem-hover">
                        <input class="form-check-input" type="radio" :id="`jobTitleRadioBtn${index}`" v-model="jobListing.title" name="jobTitleRadioBtn" :value="e_title" @change="this.globalMethodEnablePopovers()">
        
                        <label class="form-check-label no_wrap w-100 pb-3 pe-4" :for="`jobTitleRadioBtn${index}`">
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
            <p class="mb-1">Skills</p>
            <div v-if="jobListing.skills[0] !== ''">
              <div v-for="(e_skill, index) in jobListing.skills" class="d-inline-block">
                <div class="mb-1 me-2 p-1 px-2 text-white rounded d-inline-block bg-primary fw-normal-custom" data-bs-toggle="popover" data-bs-trigger="hover" :data-bs-content="allSkills[e_skill]">
                  {{ e_skill }}
                </div>
              </div>
            </div>
            <div v-else>
              <p class="fw-normal-custom text-light2"><font-awesome-icon icon="fa-solid fa-ghost" class="me-2" />No skills yet</p>
            </div>
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
            <label for="jobTitle">Department</label>

            <div class="input-group">
              <input
                type="text"
                class="form-control"
                id="department"
                v-model="jobListing.department"
                placeholder="Click search button to select a department"
                disabled
              />
    
              <div class="dropdown">
                <button class="btn btn-primary btn-input-group" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                  <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                </button>
    
                <ul class="dropdown-menu dropdown-menu-end px-3">
                  <input class="form-control mb-2" id="deptDropdownSearch" type="text" placeholder="Search.." v-model="searchBarValDept">

                  <div class="dropdown_search_menu">
                    <div v-for="(e_title, index) in allDept">
                      <div v-if="checkDeptSearchBar(e_title)" class="form-check ms-2 list-elem-hover">
                        <input class="form-check-input" type="radio" :id="`deptRadioBtn${index}`" v-model="jobListing.department" name="deptRadioBtn" :value="e_title">
        
                        <label class="form-check-label no_wrap w-100 pb-3 pe-4" :for="`deptRadioBtn${index}`">
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
import { allRoleData, allDepartmentData, allSkillsData } from '../firebase/CRUD_database.js'

export default {
  data() {
    return {
      createdate: new Date().toISOString().substr(0, 10),

      jobListing: {
        title: '',
        deadline: '',
        department: '',
        description: '',
        responsibilities: [''],
        skills: ['']
      },

      allRoles: {},
      allDept: [],
      allSkills: {},
      searchBarValTitle: '',
      searchBarValDept: '',
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
      var curr = this.jobListing
      var new_listing = new Listing(curr.title, curr.department, curr.deadline, curr.description, curr.responsibilities, curr.skills)
      console.log("new listing", new_listing)

      try {
        await new_listing.saveNewListingToDB()
        this.$refs.formSucModal.showSuccessModal('Listing Successfully Added!')
      } catch (error) {
        this.$refs.formSucModal.showErrorModal(error)
      }
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
    async fetchRolesFromDB() {
      this.allRoles = await allRoleData()
    },
    async fetchDeptFromDB() {
      this.allDept = await allDepartmentData()
    },
    async fetchSkillsFromDB() {
      this.allSkills = await allSkillsData()
    },
    checkJobTitleSearchBar(my_job_title) {
      if (my_job_title.toLowerCase().indexOf(this.searchBarValTitle.toLowerCase()) > -1) {
        return true
      } else {
        return false
      }
    },
    checkDeptSearchBar(my_dept) {
      if (my_dept.toLowerCase().indexOf(this.searchBarValDept.toLowerCase()) > -1) {
        return true
      } else {
        return false
      }
    },
  },
  watch: {
    jobListing: {
      handler(val) {
        if (Object.keys(this.allRoles).length > 0 && val.title !== '') {
          this.jobListing.skills = this.allRoles[val.title]['skillsets']
        }
      },
      deep: true
    }
  },
  mounted() {
    this.fetchRolesFromDB()
    this.fetchDeptFromDB()
    this.fetchSkillsFromDB()
  }
}
</script>

<style scoped>
.general {
  font-family: 'montserrat-bold';
  font-size: 1em;
  margin: auto;
  margin-top: 1em;
}
.fw-normal-custom {
  font-family: 'montserrat';
}
.card_sp {
  margin-bottom: 2em;
  margin-left: 1em;
  margin-right: 1em;
}
.btn-back {
  cursor: pointer;
}
.btn-remove-styling {
  all: unset;
}

.btn-input-group, .btn-input-group:hover {
  transition: none;
  border-radius: 0 0.5rem 0.5rem 0;
}

.no_wrap {
  white-space: nowrap;
}

.dropdown_search_menu {
  max-height: 200px;
  overflow-y: scroll;
}
.dropdown-menu {
  z-index: 1071;
}
.list-elem-hover {
  transition: all 200ms ease-in-out;
}
.list-elem-hover:hover {
  color: #FF7649;
}
.form-control::placeholder {
  color: #B5A8B5;
  font-family: montserrat;
  font-style: italic;
}
</style>
