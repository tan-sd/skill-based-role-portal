<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
    <div>
      <!-- Header -->
      <div class="header">
        Find your next opportunity!
      </div>
  
      <!-- Container for Cards -->
      <div class="container">
        <!-- Card 1 -->
        <div class="card" @click="handleCardClick(0)">
        <div class="border"></div>
          <div class="details">
            <div class="name">{{ job[0].name }}</div>
            <div class="position">{{ job[0].position }}</div>
          </div>
          <font-awesome-icon icon="fa-solid fa-calendar" size="7px" class="me-2"/><div class="dateDue">{{ job[0].dateDue }}</div>
          <div class="progress-bar" :style="getProgressBarStyle(job[0].matchPercentage)">
            <div class="progress-text">
              {{ job[0].matchPercentage }}%
              <span class="match-text">Match</span>
            </div>
          </div>
        </div>
  
        <!-- Card 2 -->
        <div class="card" @click="handleCardClick(1)">
            <div class="border"></div>
          <div class="details">
            <div class="name">{{ job[1].name }}</div>
            <div class="position">{{ job[1].position }}</div>
          </div>
          <font-awesome-icon icon="fa-solid fa-calendar" size="7px" class="me-2"/><div class="dateDue">{{ job[1].dateDue }}</div>
          <div class="progress-bar" :style="getProgressBarStyle(job[1].matchPercentage)">
            <div class="progress-text">
              {{ job[1].matchPercentage }}%
              <span class="match-text">Match</span>
            </div>
          </div>
        </div>
  
        <!-- Card 3 -->
        <div class="card" @click="handleCardClick(2)">
            <div class="border"></div>
          <div class="details">
            <div class="name">{{ job[2].name }}</div>
            <div class="position">{{ job[2].position }}</div>
          </div>
          <font-awesome-icon icon="fa-solid fa-calendar" size="7px" class="me-2"/><div class="dateDue">{{ job[2].dateDue }}</div>
          <div class="progress-bar" :style="getProgressBarStyle(job[2].matchPercentage)">
            <div class="progress-text">
              {{ job[2].matchPercentage }}%
              <span class="match-text">Match</span>
            </div>
          </div>
        </div>

        <!-- Card 4-->
        <div class="card" @click="handleCardClick(2)">
            <div class="border"></div>
          <div class="details">
            <div class="name">{{ job[3].name }}</div>
            <div class="position">{{ job[3].position }}</div>
          </div>
          <font-awesome-icon icon="fa-solid fa-calendar" size="7px" class="me-2"/><div class="dateDue">{{ job[3].dateDue }}</div>
          <div class="progress-bar" :style="getProgressBarStyle(job[3].matchPercentage)">
            <div class="progress-text">
              {{ job[3].matchPercentage }}%
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
        job: [
          {
            name: 'Sales Lead',
            position: 'Sales Dept.',
            matchPercentage: 67,
            dateDue: '15 Oct 2023',
          },
          {
            name: 'AI Specialist',
            position: 'Robotics Dept.',
            matchPercentage: 67,
            dateDue: '30 Sep 2023',
          },
          {
            name: 'UI/UX Expert',
            position: 'Design Dept.',
            matchPercentage: 70,
            dateDue: '29 Sep 2023',
          },
          {
            name: 'Lepak Lead',
            position: 'One Corner Dept.',
            matchPercentage: 68,
            dateDue: '29 Sep 2024',
          }
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
     height: 15%;
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
   
   
   .border {
    width: 5px;
    height: 40px;
    border-radius: 5px;
    background-color: #6A44D4;
  }
   
   .profile-picture img {
     width: 100%;
     height: 100%;
     object-fit: cover;
   }
   
   .details {
     flex: 1;
     margin-left: 10px;
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

   .dateDue {
    font-size: 20px;
    font-family: 'montserrat-bold';
    margin-right: 50%; 
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

     .me-2{
    color: #6A44D4;
  }
   </style>
   