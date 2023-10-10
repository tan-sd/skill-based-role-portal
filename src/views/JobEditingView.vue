<!-- For testing the job listing edit function -->
<script setup>
import JobEditingForm from "../components/JobEditingForm.vue";
</script>

<template>
  <div>
    <JobEditingForm @create-listing="createPost"/>
  </div>
</template>

<style scoped>
</style>
