<template>
  <div>
    <!-- Header -->
    <div class="header">
      My Applicants
    </div>

    <!-- Container for Cards -->
    <div class="container">
      <!-- Card 1 -->
      <div class="card" @click="handleCardClick(0)">
        <div class="profile-picture">
          <img :src="applicants[0].profilePicture" alt="Profile Picture">
        </div>
        <div class="details">
          <div class="name">{{ applicants[0].name }}</div>
          <div class="position">{{ applicants[0].position }}</div>
        </div>
        <div class="progress-bar" :style="getProgressBarStyle(applicants[0].matchPercentage)">
          <div class="progress-text">
            {{ applicants[0].matchPercentage }}%
            <span class="match-text">Match</span>
          </div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="card" @click="handleCardClick(1)">
        <div class="profile-picture">
          <img :src="applicants[1].profilePicture" alt="Profile Picture">
        </div>
        <div class="details">
          <div class="name">{{ applicants[1].name }}</div>
          <div class="position">{{ applicants[1].position }}</div>
        </div>
        <div class="progress-bar" :style="getProgressBarStyle(applicants[1].matchPercentage)">
          <div class="progress-text">
            {{ applicants[1].matchPercentage }}%
            <span class="match-text">Match</span>
          </div>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="card" @click="handleCardClick(2)">
        <div class="profile-picture">
          <img :src="applicants[2].profilePicture" alt="Profile Picture">
        </div>
        <div class="details">
          <div class="name">{{ applicants[2].name }}</div>
          <div class="position">{{ applicants[2].position }}</div>
        </div>
        <div class="progress-bar" :style="getProgressBarStyle(applicants[2].matchPercentage)">
          <div class="progress-text">
            {{ applicants[2].matchPercentage }}%
            <span class="match-text">Match</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      applicants: [
        {
          name: 'Seth Yap',
          position: 'Lead Product Designer',
          profilePicture: 'profile.jpg',
          matchPercentage: 68,
        },
        {
          name: 'John Doe',
          position: 'Web Developer',
          profilePicture: 'profile2.jpg',
          matchPercentage: 75,
        },
        {
          name: 'Alice Smith',
          position: 'Graphic Designer',
          profilePicture: 'profile3.jpg',
          matchPercentage: 20,
        },
      ],
    };
  },
  methods: {
    handleCardClick(index) {
      // Handle card click event, e.g., navigate to the applicant's details page
      console.log(`Clicked on card ${index}`);
    },
    getProgressBarStyle(matchPercentage) {
      // Determine the color of the progress bar based on matchPercentage
        return {
          
          background: `
          radial-gradient(closest-side, white 79%, transparent 80% 100%),
          conic-gradient(#6A44D4 ${matchPercentage}% , #b3b3b3 0)`,
        };
      }
    },
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
 