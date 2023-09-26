<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import ListingDetails from './components/ListingDetails.vue'
</script>

<template>
  <div class="app">
    <NavBar />
    <ListingDetails />
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
