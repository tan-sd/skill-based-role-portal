<script setup>
import { allListingData } from '../firebase/CRUD_database'
import Listing from '../firebase/listing_class'
</script>
<template>
  <div class="d-flex flex-column">
    <!-- Flex container for header and button -->
    <div class="header-container px-4 py-4">
      <!-- Header -->
      <h3 class="fw-bold">Manage your listings!</h3>
      <!-- Apply Now button => direct to list creating page -->
      <button @click="navigateToForm" class="btn btn-secondary text-white"><font-awesome-icon icon="fa-solid fa-plus" /> Create Listing</button>
    </div>

    <!-- Container for Cards -->
    <div class="body-container container-fluid px-4">
      <!-- Card content here -->
      <div v-for="(list, index) in listing" :key="index" class="card border-0 my-3 p-3 bg-white flex-col flex-sm-row listing-card justify-content-start" @click="navigateToApplicants(list.listingId)">
        <div class="add-border-left me-3 d-none d-sm-block"></div>
        
        <div class="me-sm-5 constrain-width w-100">
          <div class="add-border-left me-2 d-inline d-sm-none"></div>
          <p class="name m-0 text-truncate d-inline d-sm-block">{{ list.title }}</p>
          <p class="department m-0 text-truncate d-inline d-sm-block ms-3 ms-sm-0">{{ list.department }}</p>
        </div>

        <div class="d-none d-sm-block me-sm-5 constrain-width">
            <h5 class="fw-bold text-truncate"><font-awesome-icon icon="fa-solid fa-user-group" class="me-2 text-primary card-icon" />{{ list.applicants.length }} Applicant{{ list.applicants.length > 1 ? 's' : '' }}</h5>
        </div>

        <div class="d-none d-sm-block constrain-width">
          <h5 class="fw-bold text-truncate"><font-awesome-icon icon="fa-solid fa-calendar" class="me-2 text-primary card-icon" />{{ toHumanReadbleDate(list.deadline) }}</h5>
        </div>

        <div class="d-flex d-sm-none justify-content-start w-100 px-3 mt-4">
          <h6 class="fw-bold text-truncate d-inline me-4"><font-awesome-icon icon="fa-solid fa-user-group" class="me-2 text-primary card-icon" />{{ list.applicants.length }} Applicants</h6>
          <h6 class="fw-bold text-truncate d-inline"><font-awesome-icon icon="fa-solid fa-calendar" class="me-2 text-primary card-icon" />{{ toHumanReadbleDate(list.deadline) }}</h6>
        </div>

        <div v-if="isListingExpired(list.deadline)" class="job-expired-label">Listing Expired</div>

      </div>


      <div v-if="listing.length == 0" class="d-flex flex-column align-items-center justify-content-center h-100">
        <p><font-awesome-icon icon="fa-solid fa-ghost" class="text-light2" size="5x" /></p>
        <h4 class="fw-bold">OOPS! Looks like you haven't made any listings yet...</h4>
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
        const listing = new Listing();
        const allListings = await listing.getAllListings();
        
        for (let i = 0; i < Object.values(allListings).length; i++) {
          // console.log(localStorage.getItem('id'))
          // console.log(Object.values(data)[i].createdby)
          if (Object.values(allListings)[i].createdby == localStorage.getItem('id')) {
            this.listing.push(Object.values(allListings)[i])
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
      this.$router.push(`${id}/mylistingdetails`);
    },
    toHumanReadbleDate(date) {
      const dateObj = new Date(date)
      const options = { day: '2-digit', month: 'short', year: 'numeric' }
      return dateObj.toLocaleDateString('en-US', options)
    },
    isListingExpired(deadline) {
    const currentDate = new Date();
    const listingDeadline = new Date(deadline);
    console.log(listingDeadline)
    return currentDate > listingDeadline;
    },
  }
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
  background-color: #6A44D4 !important;
  color: #ffffff;
}

.department, .card-icon {
  transition: color 0.3s ease-in-out;
}

.card:hover .department {
  color: #dcdcdc !important;
}

.card:hover .card-icon {
  color: #ffffff !important;
}

.name {
  font-size: 18px;
  font-family: 'montserrat-bold';
}

.department {
  font-size: 14px;
  color: #857f95;
}

.add-border-left::before {
  content: '';
  border: solid 0.125rem #6a44d4;
  border-radius: 1rem;
  transition: color 0.3s ease-in-out;
}

.card:hover .add-border-left::before {
  border: solid 0.125rem #ffffff;
}

.job-expired-label {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #E03800;
  color: white;
  padding: 4px 10px;
  border-radius: 0.25rem 0 0.25rem 0 ;
  font-size: 0.7rem;
  font-family: 'montserrat-bold';
}
.card:hover .job-expired-label {
  background-color: #A32900 !important;
}
</style>
