<!-- For testing the job listing edit function -->
<script setup>
import { ref } from "vue";
import { uid } from "uid";
import EditTest from "../components/EditTest.vue";
import PostItemTest from "../components/PostItemTest.vue";
const newPost = ref([]);

//this is the place to store the newPost(a list of post)
//Connect to database
//END

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
  <div>
    <EditTest @create-listing="createPost"/>

    <PostItemTest v-for="post in newPost" v-bind:key="post.id" :post="post"/>
  </div>
</template>

<style scoped>
</style>