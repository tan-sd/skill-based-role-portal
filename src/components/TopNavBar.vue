<script setup>
import Listing from '../firebase/listing_class.js'
</script>
<template>
  <div class="navBarContainer mb-2">
    <div class="backButtonContainer">
      <font-awesome-icon
        :icon="['fas', 'chevron-left']"
        size="2xl"
        @click="navigateBack"
        style="color: #ffffff"
      />
    </div>
    <div class="spacer"></div>
    <div class="titleContainer d-flex flex-col justify-content-center align-items-center">
      <div class="jobTitle">
        {{ this.jobTitle }}
      </div>
      <div class="add-border-left ms-3 me-3"></div>
      <div class="jobDepartment">
        {{ this.jobDepartment }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async created() {
    const listingObj = await new Listing().loadListing(this.$route.params.id)
    this.jobTitle = listingObj.title
    this.jobDepartment = listingObj.department
  },
  data() {
    return {
      jobTitle: '',
      jobDepartment: ''
    }
  },
  methods: {
    navigateBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.navBarContainer {
  width: 100%;
  height: 75px;
  background-color: #160b32;
  display: flex;
  align-items: center;
  color: #ffffff;
}

.backButtonContainer {
  margin-left: 2em;
  cursor: pointer;
}

.spacer {
  flex-grow: 0.5;
}

.add-border-left::before {
  content: '';
  border: solid 0.125rem #6a44d4;
  border-radius: 1rem;
  transition: color 0.3s ease-in-out;
}

.jobTitle {
  font-size: 18px;
  font-family: 'montserrat-bold';
}

.jobDepartment {
  font-size: 18px;
  color: #efe7ef;
}
</style>
