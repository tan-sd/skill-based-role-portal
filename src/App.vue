<script setup>
// The code is importing various components and objects from different files.
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import ListingDetails from './components/ListingDetails.vue'
import MyApplicants from './views/MyApplicants.vue';
import IndividualApplicant from './views/IndividualApplicant.vue';
import Login from './components/Login.vue'
import MyJobListings from './components/MyJobListings.vue';

</script>

<template>
  <div class="app bg-light flex-column flex-md-row">
    <div id="appVueNavbar">
      <NavBar />
    </div>
    <RouterView id="appVueRouter" />
  </div>
</template>

<style scoped>
.app {
  height: 100vh;
  width: 100vw;
  display: flex;
}

#appVueNavbar {
  flex: 0 0 0px;
}

#appVueRouter {
  flex: 1 0 0px;
  overflow: scroll;
}
</style>
