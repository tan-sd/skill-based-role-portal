<!-- For testing the job listing edit function -->
<script setup>
  import {ref} from "vue"

  const emit = defineEmits(["create-listing"])

  const jobTitle = ref("")

  const createListing = () => {
    emit("create-listing", jobTitle.value)
  }
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
              <h2 class="card-title">
                Form
              </h2>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Title of the Job</label>
                <input v-model="jobTitle" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
              </div>

              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
              </div>

              <button @click="createListing" type="submit" class="btn btn-primary">Create</button>

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    margin: 0 5vw 0 5vw;
    background-color: #ffffff;
    border-radius: 10px;
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
     transition: background-color 0.3s, color 0.3s;
     color: black;
     border-color: #ffffff;
   }
</style>