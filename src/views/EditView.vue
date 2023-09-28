<!-- For testing the job listing edit function -->
<script setup>
import { ref } from "vue";
import { uid } from "uid";
import EditTest from "../components/EditTest.vue";
const newPost = ref([]);

const createPost = (jobTitle) => {
  newPost.value.push({
    id: uid(),
    jobTitle,
    isCompleted: null,
    isEditing: null,
  })
}
</script>

<template>
  <main>
    <h1>Form</h1>
    <EditTest @create-listing="createPost"/>
  </main>
</template>

<style scoped>
</style>