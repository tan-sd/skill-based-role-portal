<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import ListingDetails from './components/ListingDetails.vue'
import MyApplicants from './components/MyApplicants.vue';
import IndividualApplicant from './views/IndividualApplicant.vue';
import MyJobListings from './components/MyJobListings.vue';

</script>

<template>
  <div class="app">
    <NavBar />
    <RouterView />
  </div>
</template>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  background-color: #efe7ef;
  display: flex;
  flex-direction: row;
}
</style>
