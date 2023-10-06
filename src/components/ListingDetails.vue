<script setup>
import { individualListingData } from '../firebase/CRUD_database'
import ResumeDropOffButton from './ResumeDropOffButton.vue'
import '../main.js'
import TopNavBar from './TopNavBar.vue'
</script>

<template>
  <!--
  listingDetails.description ,
  <li :key="index" v-for="(req, index) in listingDetails.responsibilities"> {{ req }}</li>
-->
  <div class="w-100">
    <TopNavBar />

    <div class="bg-white rounded m-3 p-4">
      <div class="row">
        <div class="col-7">
          <!-- Job Description -->
          <h5 class="fw-bold">Job Description</h5>
          <p>{{ listingDetails.description }}</p>

          <!-- Job Requirements -->
          <h5 class="fw-bold mt-4">Job Requirements</h5>
          <ul>
            <li :key="index" v-for="(req, index) in listingDetails.responsibilities">{{ req }}</li>
          </ul>

          <!-- Required Skills -->
          <h5 class="fw-bold">Required Skills</h5>
          <div
            v-for="e_skill in listingDetails.skills"
            class="bg-primary mb-1 me-2 p-1 px-2 text-white rounded d-inline-block"
          >
            {{ e_skill }}
          </div>
        </div>

        <div class="col-5 position-relative">
          <!-- Application Period -->
          <p>
            <span class="fw-bold add-border-right">Application Period</span>
            {{ toHumanReadbleDate(listingDetails.createdate) }} to
            {{ toHumanReadbleDate(listingDetails.deadline) }}
          </p>

          <!-- here need to change xx to however we retrieve listing title -->
          <ResumeDropOffButton
            :job="listingDetails.title"
            :key="listingDetails.title"
          ></ResumeDropOffButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.fetchIndividualListingData()
  },
  data() {
    return {
      listingDetails: []

      // jobDescription:
      //   'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi ab odio incidunt omnis rerum architecto, id quo voluptatum repellendus, suscipit nisi aut beatae temporibus, labore maiores provident ipsum quasi quia! Repellendus placeat quibusdam architecto debitis veritatis ducimus sed. Excepturi, sed eligendi! Rem ducimus suscipit iste dolores animi eveniet tempora earum ut quod quas ratione architecto, vero illum doloribus neque, delectus deleniti aut. Veritatis sapiente quo minus, repellendus aspernatur nemo laborum ducimus accusamus eaque natus mollitia in explicabo deserunt animi placeat voluptate impedit repudiandae quibusdam obcaecati eius. Laboriosam consectetur incidunt praesentium dolores sapiente adipisci, harum eligendi ipsam ut expedita tempora eos.',
      // jobRequirements: [
      //   'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, earum?',
      //   'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, earum?',
      //   'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, earum?',
      //   'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, earum?'
      // ],
      // roleSkillSets: ['Figma', 'Wireframing', 'HTML', 'CSS', 'JavaScript', 'React'],
      // applicantSkillSets: ['Figma', 'Wireframing', 'HTML', 'CSS']
    }
  },
  methods: {
    async fetchIndividualListingData() {
      try {
        const data = await individualListingData(this.$route.params.id)
        this.listingDetails = data
      } catch (error) {
        console.log('Error fetching data from Firebase:', error)
      }
    },

    toHumanReadbleDate(date) {
      const dateObj = new Date(date)
      const options = { day: '2-digit', month: 'short', year: 'numeric' }
      return dateObj.toLocaleDateString('en-US', options)
    }
  }
}
</script>

<style>
.add-border-right::after {
  content: '';
  border: solid 0.125rem #6a44d4;
  border-radius: 1rem;
  margin-left: 0.35rem;
}
</style>
