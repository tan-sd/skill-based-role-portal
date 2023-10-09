<script setup>
import { allListingData } from '../firebase/CRUD_database'
</script>

<template>
  <div>
    <!-- Header -->
    <div class="header">Find your next opportunity!</div>

    <!-- Container for Cards -->
    <div class="container">
      <div v-for="(list, index) in listing" :key="index" class="card" @click="navigateToDetails(index)">
        <!-- Card content here -->
        <div class="border"></div>
        <div class="details">
          <div class="name">{{ list.title }}</div>
          <div class="position">{{ list.position }}</div>
        </div>
        <font-awesome-icon icon="fa-solid fa-calendar" size="7px" class="me-2" />
        <div class="dateDue">{{ list.deadline }}</div>
        <div class="progress-bar" :style="getProgressBarStyle(job[0].matchPercentage)">
          <div class="progress-text">
            {{ job[0].matchPercentage }}%
            <span class="match-text">Match</span>
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
    handleCardClick(index) {
      // Handle card click event, e.g., navigate to the applicant's details page
      console.log(`Clicked on card ${index}`)
    },
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
        console.log(data)
        this.listing = Object.values(data)
      } catch (error) {
        console.log('Error fetching data from Firebase:', error)
      }
    },
    navigateToDetails(index) {
      this.$router.push({ name: 'listingDetails', params: { id: index } })
    }
  }
}
</script>

<style scoped>
.header {
  font-family: 'montserrat-bold';
  font-size: 30px;
  margin-left: 40px;
  padding: 10px;
}

.container {
  position: relative;
  margin: 0 2vw 0 2vw;
  border-radius: 10px;
  width: 75vw;
  height: 85vh;
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
  height: 15%;
  width: 100%;
  transition:
    background-color 0.3s,
    color 0.3s;
  cursor: pointer;
  color: black;
}

.card:hover {
  background-color: #6a44d4;
  color: #ffffff; /* Text color on hover */
}

.card:hover .progress-bar {
  border: 2px solid #ffffff; /* Progress bar border color on hover */
}

.border {
  width: 5px;
  height: 40px;
  border-radius: 5px;
  background-color: #6a44d4;
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

.position {
  font-size: 14px;
  color: #b3b3b3;
}

.dateDue {
  font-size: 20px;
  font-family: 'montserrat-bold';
  margin-right: 50%;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: 'montserrat-bold';
}

.me-2 {
  color: #6a44d4;
}
</style>
