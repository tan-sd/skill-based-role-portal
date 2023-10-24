<script setup>
import { getStaffObj } from '../firebase/staff_class'
import Listing from '../firebase/listing_class'
</script>
<template>
  <div class="d-flex flex-column">
    <div class="header-container px-4 py-4">
      <!-- Header -->
      <h3 class="fw-bold">Find your next opportunity!</h3>

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
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="m-0">Job Title</h6>
                <div>
                  <button class="btn btn-light btn-sm me-2" @click="clearJobTitleFilter()"><small>Clear</small></button>
                  <button class="btn btn-light btn-sm" @click="selectAllJobTitleFilter()"><small>Select All</small></button>
                </div>
              </div>

              <input class="form-control mb-2" id="jobTitleSearchBar" type="text" placeholder="Search.." v-model="searchBarValTitle">

              <div class="dropdown_search_menu">
                <div v-for="(e_title, index) in Object.keys(allRoles)">
                  <div v-if="checkJobTitleSearchBar(e_title)" class="form-check ms-2 list-elem-hover my-2">
                    <input class="form-check-input" type="checkbox" :id="`jobTitleRadioBtn${index}`" v-model="jobTitleFilterList" name="jobTitleRadioBtn" :value="e_title">
    
                    <label class="form-check-label no_wrap w-100 pe-4" :for="`jobTitleRadioBtn${index}`">
                      {{ e_title }}
                    </label>
                  </div>
                </div>
              </div>

              <!-- <div class="input-group mb-2">
                <span class="input-group-text">
                  <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                </span>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Search..."
                  v-model="applicantsNameSearch"
                />
                <div class="input-group-text btn btn-light" @click="applicantsNameSearch = ''" :class="{disabled: applicantsNameSearch == ''}">
                  <font-awesome-icon icon="fa-solid fa-xmark" size="xs" />
                </div>
              </div> -->

              <hr />

              <!-- Filter by Skills -->
              <!-- <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="m-0">Skills</h6>
                <div>
                  <button class="btn btn-light btn-sm me-2" @click="clearSkillsFilter()"><small>Clear</small></button>
                  <button class="btn btn-light btn-sm" @click="selectAllSkillsFilter()"><small>Select All</small></button>
                </div>
              </div>

              <div class="filter-skills-scrollable">
                <div v-for="(e_skill, index) in listingDetails.skills">
                  <div class="form-check mb-2 ms-1">
                    <input class="form-check-input" type="checkbox" :value="e_skill" :id=" `skill_filter_checkbox_${index}` " name="skill_filter_checkbox" v-model="applicantsSkillsFilter">
                    <label class="form-check-label" :for=" `skill_filter_checkbox_${index}` ">
                      {{ e_skill }}
                    </label>
                  </div>
                </div>
              </div> -->
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
                <input class="form-check-input" type="radio" value="skillmatch" id="sort_1" name="sort_by" @click="sortMatchPercentage()" checked />
                <label class="form-check-label" for="sort_1"> Sort by skill match (high to low) </label>
              </div>

              <div class="form-check">
                <input class="form-check-input" type="radio" value="name_a_z" id="sort_2" name="sort_by" @click="sortDeadlineEarly()" />
                <label class="form-check-label" for="sort_2"> Sort by deadline (earliest to latest) </label>
              </div>

              <div class="form-check">
                <input class="form-check-input" type="radio" value="name_z_a" id="sort_3" name="sort_by" @click="sortDeadlineLatest()" />
                <label class="form-check-label" for="sort_3"> Sort by deadline (latest to earliest) </label>
              </div>
            </div>
          </div>
        </div>
    </div>

    <!-- Container for Cards -->
    <div class="body-container container-fluid px-4">
      <div v-for="list in activeListings">
        <div v-if="checkTitleInFilter(list.title)">
          <div
            :key="list.id"
            class="card border-0 my-3 p-3 flex-col flex-sm-row listing-card justify-content-start"
            @click="navigateToDetails(list.listingId)"
          >
            <!-- Card content here -->
            <div class="add-border-left me-3 d-none d-sm-block"></div>
    
            <div class="me-sm-5 constrain-width w-100">
              <div class="add-border-left me-2 d-inline d-sm-none"></div>
              <p class="name m-0 text-truncate d-inline d-sm-block">{{ list.title }}</p>
              <p class="department m-0 text-truncate d-inline d-sm-block ms-3 ms-sm-0">
                {{ list.department }}
              </p>
            </div>
    
            <div class="d-none d-sm-block me-sm-5 constrain-width">
              <h5 class="fw-bold text-truncate">
                <font-awesome-icon icon="fa-solid fa-calendar" class="me-2 text-primary card-icon" />
                {{ toHumanReadableDate(list.deadline) }}
              </h5>
            </div>
    
            <div
              class="d-none d-sm-block progress-bar"
              v-if="typeof list.matchPercentage === 'number'"
              :style="getProgressBarStyle(list.matchPercentage)"
            >
              <div class="progress-text">
                <div>{{ Math.round(list.matchPercentage) }}%</div>
                <div>Match</div>
              </div>
            </div>
    
            <div class="d-flex d-sm-none justify-content-start w-100 px-3 mt-4">
              <h6 class="fw-bold text-truncate">
                <font-awesome-icon
                  icon="fa-solid fa-calendar"
                  class="me-2 text-primary card-icon"
                />{{ toHumanReadableDate(list.deadline) }}
              </h6>
            </div>
            <div
              class="d-flex flex-column d-sm-none progress-bar"
              v-if="typeof list.matchPercentage === 'number'"
              :style="getProgressBarStyle(list.matchPercentage)"
            >
              <div class="progress-text">
                <div>{{ Math.round(list.matchPercentage) }}%</div>
                <div>Match</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="activeListings.length === 0"
        class="d-flex flex-column align-items-center justify-content-center h-100"
      >
        <p><font-awesome-icon icon="fa-solid fa-ghost" class="text-light2" size="5x" /></p>
        <h4 class="fw-bold text-center">OOPS! Looks like there aren't any active listings available at the moment...</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { allRoleData } from '../firebase/CRUD_database.js'

export default {
  async created() {
    await this.fetchAllListingData();
    await this.fetchRolesFromDB();
    this.sortMatchPercentage();
  },
  data() {
    return {
      listings: [],

      allRoles: {},

      searchBarValTitle: '',
      jobTitleFilterList: [],
    };
  },
  computed: {
    activeListings() {
      const currentDate = new Date().getTime();
      return this.listings.filter(listing => new Date(listing.deadline).getTime() > currentDate);
    },
  },
  methods: {
    getProgressBarStyle(matchPercentage) {
      // Determine the color of the progress bar based on matchPercentage
      return {
        background: `
          radial-gradient(closest-side, white 79%, transparent 80% 100%),
          conic-gradient(#6A44D4 ${matchPercentage}% , #b3b3b3 0)`
      };
    },
    async fetchAllListingData() {
      try {
        const listing = new Listing();
        const allListings = await listing.getAllListings();
        this.listings = Object.values(allListings);
        // You should call getMatchPercentage here to calculate match percentages
        await this.getMatchPercentage(this.listings);
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    },
    navigateToDetails(listingId) {
      // Use the provided listingId for navigation
      this.$router.push({ name: 'listingDetails', params: { listingid: listingId } });
    },
    async getMatchPercentage(allListings) {
      try {
        const staff = await getStaffObj(localStorage.getItem('id'));
        const staffSkillset = await staff.getSkillset();

        for (let index = 0; index < allListings.length; index++) {
          const listingSkills = allListings[index].skills;
          let skillMatch = 0;
          for (const skill of listingSkills) {
            if (staffSkillset.includes(skill)) {
              skillMatch++;
            }
          }
          allListings[index].matchPercentage = Math.round((skillMatch / listingSkills.length) * 100);
        }
        // You should update the computed property directly
        this.listings = allListings;
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    },
    toHumanReadableDate(date) {
      const dateObj = new Date(date);
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      return dateObj.toLocaleDateString('en-US', options);
    },
    sortMatchPercentage() {
      this.listings.sort((a, b) => b.matchPercentage - a.matchPercentage);
    },
    sortDeadlineEarly() {
      this.listings.sort((a, b) => {
        const dateA = new Date(a.deadline);
        const dateB = new Date(b.deadline);

        return dateA - dateB;
      })
    },
    sortDeadlineLatest() {
      this.listings.sort((a, b) => {
        const dateA = new Date(a.deadline);
        const dateB = new Date(b.deadline);

        return dateB - dateA;
      })
    },
    checkJobTitleSearchBar(my_job_title) {
      if (my_job_title.toLowerCase().indexOf(this.searchBarValTitle.toLowerCase()) > -1) {
        return true
      } else {
        return false
      }
    },
    async fetchRolesFromDB() {
      this.allRoles = await allRoleData()
    },
    checkTitleInFilter(listingTitle) {
      if (this.jobTitleFilterList.length === 0) {
        return true
      }

      const filterList = new Set(this.jobTitleFilterList)

      if (filterList.has(listingTitle)) {
        return true
      }

      return false
    },
    clearJobTitleFilter () {
      this.jobTitleFilterList = []
    },
    selectAllJobTitleFilter () {
      this.jobTitleFilterList = Object.keys(this.allRoles)
    },
  },
};
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 0 0 0px;
}

.body-container {
  flex: 1 0 0px;
}

.listing-card {
  align-items: center;
  transition:
    background-color 0.3s ease-in-out,
    color 0.3s ease-in-out;
  cursor: pointer;
  width: 100%;
}

.constrain-width {
  min-width: 0;
  flex: 1 0 0px;
}

.card:hover {
  background-color: #6a44d4 !important;
  color: #ffffff;
}

.card:hover .progress-bar {
  box-shadow: 0 0 0 0.25rem #ffffff;
}

.add-border-left::before {
  content: '';
  border: solid 0.125rem #6a44d4 !important;
  border-radius: 1rem;
  transition: color 0.3s ease-in-out;
}

.card:hover .department {
  color: #dcdcdc !important;
}

.card:hover .add-border-left::before {
  border: solid 0.125rem #ffffff !important;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.details {
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
}

.name {
  font-size: 18px;
  font-family: 'montserrat-bold';
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
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  font-family: 'montserrat-bold';
}

.department {
  font-size: 14px;
  color: #857f95;
}

.card:hover .me-2 {
  color: #ffffff !important;
}

.dropdown-menu {
  min-width: 300px;
}
.dropdown_search_menu {
  max-height: 150px;
  overflow-y: scroll;
}
</style>
