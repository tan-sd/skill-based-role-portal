<script setup>
import { getStaffObj } from '../firebase/staff_class'
import Listing from '../firebase/listing_class'
</script>

<template>
  <div class="d-flex flex-column">
    <div class="header-container px-4 py-4">
      <!-- Header -->
      <h3 class="fw-bold">My Applications!</h3>
    </div>

    <!-- Container for Cards -->
    <div class="body-container container-fluid px-4">
      <div v-for="(list, index) in listing" :key="index">
        <div
          :key="list.id"
          class="card border-0 my-3 p-3 flex-row listing-card justify-content-start align-items-start align-items-sm-center"
        >
          <!-- Card content here -->
          <div class="add-border-left me-3 d-none d-sm-block"></div>
  
          <div class="d-flex flex-column flex-sm-row constrain-width w-50 align-items-sm-center">
            <!-- Title & Dept -->
            <div class="d-flex align-items-center constrain-width">
              <div class="add-border-left me-3 d-block d-sm-none"></div>
              <div class="me-sm-5 constrain-width w-100">
                <p class="name m-0 text-truncate d-block">{{ list.title }}</p>
                <p class="department m-0 text-truncate d-block">
                  {{ list.department }}
                </p>
              </div>
            </div>
    
            <!-- Deadline (md & above) -->
            <div class="d-block me-sm-5 constrain-width">
              <h5 class="fw-bold text-truncate d-none d-sm-block">
                <font-awesome-icon icon="fa-solid fa-calendar" class="me-2 text-primary card-icon" />
                {{ toHumanReadableDate(list.deadline) }}
              </h5>

              <h6 class="fw-bold text-truncate d-block d-sm-none mt-3">
                <font-awesome-icon icon="fa-solid fa-calendar" class="me-2 text-primary card-icon" />
                {{ toHumanReadableDate(list.deadline) }}
              </h6>
            </div>
          </div>
  
          <!-- Skill match -->
          <div
            class="d-block progress-bar"
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

      <div
        v-if="listing.length == 0"
        class="d-flex flex-column align-items-center justify-content-center h-100"
      >
        <p><font-awesome-icon icon="fa-solid fa-ghost" class="text-light2" size="5x" /></p>
        <h4 class="fw-bold text-center">OOPS! Looks like you have not applied to any listing...</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async created() {
    await this.fetchMyApplicationData();
  },
  data() {
    return {
      listing: [],
    };
  },
  methods: {
    getProgressBarStyle(matchPercentage) {
      return {
        background: `
            radial-gradient(closest-side, white 79%, transparent 80% 100%),
            conic-gradient(#6A44D4 ${matchPercentage}% , #b3b3b3 0)`,
      };
    },
    async fetchMyApplicationData() {
      try {
        const user_id = localStorage.getItem('id');
        const staff = await getStaffObj(user_id);
        const appliedListingIds = staff.getListingsApplied();

        for (const listingId of appliedListingIds) {
          const listing = new Listing();
          await listing.loadListing(listingId);
          const listingData = listing.getAllAtrr();

          listingData.matchPercentage = this.calculateMatchPercentage(
            listingData.skills,
            staff.getSkillset()
          );

          this.listing.push(listingData);
        }
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    },
    calculateMatchPercentage(reqs, skills) {
      if (reqs.length === 0 || skills.length === 0) {
        return 0;
      }

      let commonCount = 0;
      const skillsSet = new Set(skills);

      for (const req of reqs) {
        if (skillsSet.has(req)) {
          commonCount++;
        }
      }

      return (commonCount / reqs.length) * 100;
    },
    toHumanReadableDate(date) {
      const dateObj = new Date(date);
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      return dateObj.toLocaleDateString('en-US', options);
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
  width: 100%;
}

.constrain-width {
  min-width: 0;
  flex: 1 0 0px;
}

.add-border-left::before {
  content: '';
  border: solid 0.125rem #6a44d4 !important;
  border-radius: 1rem;
  transition: color 0.3s ease-in-out;
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

</style>
