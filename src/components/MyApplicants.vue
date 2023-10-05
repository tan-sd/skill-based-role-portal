<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { read_staff_data, read_listing_data } from '../firebase/CRUD_database'
</script>

<template>
  <div>
    <!-- Header -->
    <div class="header">
      My Applicants
    </div>

    <!-- Container for Cards -->
    <div class="container">
      <!-- Conditionally render loop if newAppList has data -->
      <div v-if="newAppList.length > 0">
        <router-link
          v-for="applicant in newAppList"
          :key="applicant.firstname"
          :to="`/individualApplicant/${applicant.name}/${$route.params.id}`"
          class="card"
        >
          <div class="profile-picture">
            <img :src="applicant.profilePicture" alt="Profile Picture">
          </div>
          <div class="details">
            <div class="name">{{ applicant.firstname }} {{ applicant.lastname }}</div>
            <div class="position">{{ applicant.position }}</div>
          </div>
          <!-- Only display the progress-bar when matchPercentage is defined -->
          <div class="progress-bar" v-if="typeof applicant.matchPercentage === 'number'" :style="getProgressBarStyle(applicant.matchPercentage)">
            <div class="progress-text">
              {{ Math.round(applicant.matchPercentage) }}%
              <span class="match-text">Match</span>
            </div>
          </div>
        </router-link>
      </div>
      <!-- Display a loading message if newAppList is empty -->
      <div v-else>
        Loading...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      job: {
        jobSkills:[],
        applicantsList:[]
      },
      newAppList: [] // Initialize newAppList as an empty array
    };
  },
  async created() {
    const response1 = await read_listing_data(this.$route.params.id)
    this.job.jobSkills = response1.skills
    this.job.applicantsList = response1.applicants

    function calculateMatchPercentage(reqs, skills) {
  // Ensure both input arrays are non-empty
  if (reqs.length === 0 || skills.length === 0) {
    return 0; // No match if either array is empty
  }

  // Initialize a counter for common elements
  let commonCount = 0;

  // Create a Set from the `skills` array for faster lookup
  const skillsSet = new Set(skills);

  // Loop through the `reqs` array and count common elements
  for (const req of reqs) {
    if (skillsSet.has(req)) {
      commonCount++;
    }
  }

  // Calculate the match percentage
  const matchPercentage = (commonCount / reqs.length) * 100;

  return matchPercentage;
}

    // Populate newAppList
    for (let i = 0; i < this.job.applicantsList.length; i++) {
      const response = await read_staff_data(this.job.applicantsList[i])
      const tempObj = {
        name: this.job.applicantsList[i],
        firstname: response.firstname,
        lastname: response.lastname,
        position: response.position,
        applicantSkills: response.skillsets,
        matchPercentage: calculateMatchPercentage(this.job.jobSkills, response.skillsets)
      }

      this.newAppList.push(tempObj); // Push data to newAppList
    }
  }
  ,
  methods: {
  
    getProgressBarStyle(matchPercentage) {
      // Determine the color of the progress bar based on matchPercentage
        return {
          
          background: `
          radial-gradient(closest-side, white 79%, transparent 80% 100%),
          conic-gradient(#6A44D4 ${matchPercentage}% , #b3b3b3 0)`,
        };
      },

    },
    computed:{
      getMatchPercentage(){
        let skillsApplicantMatchcount =0 
        for(let i=0; i<this.job.jobSkills.length; i++){
          if(this.job.applicantSkills.includes(this.job.jobSkills[i])){
            skillsApplicantMatchcount++
          }
        }
        const matchPercentage= Math.round((skillsApplicantMatchcount/this.job.jobSkills.length)*100)
        return matchPercentage         
      }
    }
  };

  
</script>


<style scoped>


.header {
  font-family: 'montserrat-bold';
  font-size: 30px;
  margin-left: 40px;
  padding: 10px;
}

.container {
  position: relative;
  margin: 0 2vw 0 2vw;
  border-radius: 10px;
  width: 75vw;
  height: 85vh;
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
  cursor: pointer;
  color: black;
  text-decoration: none;
}

.card:hover {
  background-color: #6A44D4;
  color: #FFFFFF; /* Text color on hover */
}

.card:hover .progress-bar {
  border: 2px solid #FFFFFF; /* Progress bar border color on hover */
}


.profile-picture {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.details {
  flex: 1;
  margin-left: 30px;
  margin-right: 10px;
}

.name {
  font-size: 18px;
  font-family: 'montserrat-bold';
}

.position {
  font-size: 14px;
  color: #b3b3b3;
}

.progress-bar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: black;
  position: relative;
  margin-bottom: 5px;
}

.progress-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: 'montserrat-bold';
}
</style>