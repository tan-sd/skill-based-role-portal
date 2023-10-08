<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { allListingData } from '../firebase/CRUD_database'
</script>
<template>
  <div>
    <!-- Flex container for header and button -->
    <div class="header-container">
      <!-- Header -->
      <div class="header">Manage your listings!</div>
      <!-- Apply Now button => direct to list creating page -->
      <button @click="navigateToForm" class="btn btn-secondary createButton">+ Create Listing</button>
    </div>

    <!-- Container for Cards -->
    <div class="container">
      <!-- Card content here -->
      <div v-for="(list, index) in listing" :key="index" class="card" @click="navigateToApplicants(list.listingId)">
        <div class="border"></div>
        <div class="details">
          <div class="name">{{ list.title }}</div>
          <div class="position">{{ list.position }}</div>
        </div>
        <font-awesome-icon icon="fa-solid fa-user-group" size="7px" class="me-2" />
        <div class="applicantsCount">{{ list.applicants.length }} Applicants</div>
        <font-awesome-icon icon="fa-solid fa-calendar" size="7px" class="me-2" />
        <div class="dateDue">{{ list.deadline }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.filteredListingData()
  },
  data() {
    return {
      listing: []
    }
  },
  methods: {
    handleCardClick(index) {
      // Handle card click event, e.g., navigate to applicant's details page
      console.log(`Clicked on card ${index}`)
    },
    async filteredListingData() {
      try {
        const data = await allListingData()
        for (let i = 0; i < Object.values(data).length; i++) {
          // console.log(localStorage.getItem('id'))
          // console.log(Object.values(data)[i].createdby)
          if (Object.values(data)[i].createdby == localStorage.getItem('id')) {
            this.listing.push(Object.values(data)[i])
          }
        }
        // this.listing = Object.values(data)
      } catch (error) {
        console.log('Error fetching data from Firebase:', error)
      }
    },
    navigateToForm() {
      this.$router.push('/jobListingForm');
    },
    navigateToApplicants(id) {
      // this.$router.push({ name: 'listingDetails', params: { id: index } })
      this.$router.push(`${id}/myapplicants`);
    }
  }
}
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 40px;
}

.header {
  font-family: 'montserrat-bold';
  font-size: 30px;
  padding: 10px;
}

.createButton {
  color: #ffffff;
  font-family: 'montserrat-bold';
}

.container {
  position: relative;
  margin: 0 2vw 0 2vw;
  border-radius: 10px;
  width: 75vw;
  height: 85vh;
  flex-wrap: wrap; /* Allow cards to wrap when container width is reduced */
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
  height: 15%;
  transition:
    background-color 0.3s,
    color 0.3s;
  cursor: pointer;
  color: black;
  position: relative;
}

.card:hover {
  background-color: #6a44d4;
  color: #ffffff;
}

.card:hover .position {
  color: #ffffffdc;
}

.border {
  width: 5px;
  height: 40px;
  border-radius: 5px;
  background-color: #6a44d4;
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
  color: #857f95;
}

.applicantsCount {
  font-size: 20px;
  font-family: 'montserrat-bold';
  margin-right: 15%;
}

.dateDue {
  font-size: 20px;
  font-family: 'montserrat-bold';
  margin-right: 30%;
}

.edit-button {
  margin-left: auto;
  background-color: #6a44d4;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.me-2 {
  color: #6a44d4;
}

.card:hover .me-2 {
  color: #ffffff;
}
</style>
