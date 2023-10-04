<script setup>
import { individualListingData } from '../firebase/CRUD_database'
</script>

<template>
  <div class="listingContainer">
    <div class="listingInnerContainer">
      <div class="listingHeader">Job Description</div>
      <div class="listingText">{{ listingDetails.description }}</div>

      <div class="listingHeader">Job Requirements</div>
      <div class="listingText">
        <ul>
          <li :key="index" v-for="(req, index) in listingDetails.responsibilities">
            {{ req }}
          </li>
        </ul>
      </div>

      <div class="listingHeader">Required Skills</div>
      <div class="skillSetsContainer">
        <div
          class="skillSet"
          v-for="(skill, index) in roleSkillSets"
          :key="index"
          :class="{
            active: applicantSkillSets.includes(skill)
          }"
        >
          {{ skill }}
        </div>
      </div>
      <button class="btn btn-secondary applyButton">Apply Now</button>
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
    }
  }
}
</script>

<style scoped>
.listingContainer {
  position: relative;
  margin: 0 5vw 0 5vw;
  background-color: #ffffff;
  border-radius: 10px;
  width: 75vw;
  height: 85vh;
}

.listingInnerContainer {
  margin: 25px 25px 25px 25px;
}

.listingHeader {
  font-family: 'montserrat-bold';
  font-size: 20px;
}

.listingText {
  margin-bottom: 25px;
  width: 600px;
  font-size: 15px;
}

.applyButton {
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 0 50px 50px 0;
  color: #ffffff;
}

.skillSetsContainer {
  display: flex;
  flex-wrap: wrap;
  width: 600px;
}

.skillSet {
  display: inline;
  padding: 2px 20px 2px 20px;
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: #b3b3b3;
  color: #ffffff;
  font-family: 'montserrat-bold';
}

.skillSet.active {
  background-color: #6a44d4;
}
</style>
