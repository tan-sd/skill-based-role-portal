<!-- For testing the job listing edit function -->
<script setup>
import JobListingForm from "../components/JobListingForm.vue";
</script>

<template>
  <div>
    <JobListingForm @create-listing="createPost"/>
  </div>
</template>

<style scoped>
</style>
