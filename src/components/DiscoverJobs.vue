<script setup>
import { allListingData } from '../firebase/CRUD_database'
import { getStaffObj } from '../firebase/staff_class'
</script>
<template>
  <div class="d-flex flex-column">
    <div>
      <div class="header-container px-4 py-4">
        <!-- Header -->
        <h3 class="fw-bold">Find your next opportunity!</h3>
      </div>

      <!-- Container for Cards -->
      <div class="body-container container-fluid px-4">
        <div
          v-for="(list, index) in listing"
          :key="index"
          class="card border-0 my-3 p-3 flex-col flex-sm-row listing-card justify-content-start"
          @click="navigateToDetails(index)"
        >
          <!-- Card content here -->
          <div class="add-border-left me-3 d-none d-sm-block"></div>

          <!-- <div class="details d-inline"> -->
          <div class="me-sm-5 constrain-width w-100">
            <div class="add-border-left me-2 d-inline d-sm-none"></div>
            <p class="name m-0 text-truncate d-inline d-sm-block">{{ list.title }}</p>
            <p class="department m-0 text-truncate d-inline d-sm-block ms-3 ms-sm-0">
              {{ list.department }}
            </p>
          </div>

          <div class="d-none d-sm-block me-sm-5 constrain-width">
            <h5 class="fw-bold text-truncate">
              <font-awesome-icon
                icon="fa-solid fa-calendar"
                class="me-2 text-primary card-icon"
              />
              {{ toHumanReadbleDate(list.deadline) }}
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
              />{{ toHumanReadbleDate(list.deadline) }}
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
  </div>
</template>

<script>
export default {
  created() {
    this.fetchAllListingData()
  },
  data() {
    return {
      listing: [],
      job: [
        {
          matchPercentage: 67
        },
        {
          matchPercentage: 67
        },
        {
          matchPercentage: 70
        },
        {
          matchPercentage: 68
        }
      ]
    }
  },
  methods: {
    getProgressBarStyle(matchPercentage) {
      // Determine the color of the progress bar based on matchPercentage
      return {
        background: `
            radial-gradient(closest-side, white 79%, transparent 80% 100%),
            conic-gradient(#6A44D4 ${matchPercentage}% , #b3b3b3 0)`
      }
    },
    async fetchAllListingData() {
      try {
        const data = await allListingData()
        this.listing = Object.values(data)
        this.getMatchPercentage()
      } catch (error) {
        console.error('Error fetching data from Firebase:', error)
      }
    },
    navigateToDetails(index) {
      this.$router.push({ name: 'listingDetails', params: { id: index } })
    },
    async getMatchPercentage() {
      try {
        const data = this.listing
        const staff = await getStaffObj(localStorage.getItem('id'))
        const staffSkillset = await staff.getSkillset()
        var skillMatch = 0

        for (let index = 0; index < data.length; index++) {
          const listingSkills = data[index].skills
          for (const skill of listingSkills) {
            if (staffSkillset.includes(skill)) {
              skillMatch++
            }
          }
          data[index].matchPercentage = Math.round((skillMatch / listingSkills.length) * 100)
        }
      } catch (error) {
        console.error('Error fetching data from Firebase:', error)
      }
    },
    toHumanReadbleDate(date) {
      const dateObj = new Date(date)
      const options = { day: '2-digit', month: 'short', year: 'numeric' }
      return dateObj.toLocaleDateString('en-US', options)
    },
  },
}
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
  border: 2px solid #ffffff !important;
}

.add-border-left::before {
  content: '';
  border: solid 0.125rem #6a44d4 !important;
  border-radius: 1rem;
  transition: color 0.3s ease-in-out;
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
</style>
