<script setup>
import { getStaffObj } from '../firebase/staff_class'
import Listing from '../firebase/listing_class'
</script>
<template>
  <div class="d-flex flex-column">
    <div class="header-container px-4 py-4">
      <!-- Header -->
      <h3 class="fw-bold">Find your next opportunity!</h3>
    </div>

    <!-- Container for Cards -->
    <div class="body-container container-fluid px-4">
      <div
        v-for="(list, index) in activeListings"
        :key="index"
        class="card border-0 my-3 p-3 flex-col flex-sm-row listing-card justify-content-start"
        @click="navigateToDetails(index)"
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
export default {
  created() {
    this.fetchAllListingData();
  },
  data() {
    return {
      listings: [],
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
        this.getMatchPercentage(this.listings);
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    },
    navigateToDetails(index) {
      // Assuming 'index' is the listing ID, you can pass it as a parameter to the details route
      this.$router.push({ name: 'listingDetails', params: { listingid: index } });
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
</style>
