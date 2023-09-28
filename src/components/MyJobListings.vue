<script setup>
</script>
<template>
    <div>
      <!-- Flex container for header and button -->
      <div class="header-container">
        <!-- Header -->
        <div class="header">
          Manage your listings!
        </div>
        <!-- Apply Now button -->
        <button class="btn btn-secondary createButton">+ Apply Now</button>
      </div>
  
      <!-- Container for Cards -->
      <div class="container">
        <!-- Card 1 -->
        <div class="card" @click="handleCardClick(0)">
          <div class="border"></div>
          <div class="details">
            <div class="name">{{ applicants[0].name }}</div>
            <div class="position">{{ applicants[0].position }}</div>
          </div>
          <button class="edit-button">Edit</button>
        </div>
  
        <!-- Card 2 -->
        <div class="card" @click="handleCardClick(1)">
          <div class="border"></div>
          <div class="details">
            <div class="name">{{ applicants[1].name }}</div>
            <div class="position">{{ applicants[1].position }}</div>
          </div>
          <button class="edit-button">Edit</button>
        </div>
  
        <!-- Card 3 -->
        <div class="card" @click="handleCardClick(2)">
          <div class="border"></div>
          <div class="details">
            <div class="name">{{ applicants[2].name }}</div>
            <div class="position">{{ applicants[2].position }}</div>
          </div>
          <button class="edit-button">Edit</button>
        </div>
  
        <!-- Card 4 -->
        <div class="card" @click="handleCardClick(3)">
          <div class="border"></div>
          <div class="details">
            <div class="name">{{ applicants[3].name }}</div>
            <div class="position">{{ applicants[3].position }}</div>
          </div>
          <button class="edit-button">Edit</button>
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
            name: 'Sales Lead',
            position: 'Sales Dept.',
            applicantsCount: 5,
            dateDue: '15 Oct 2023',
          },
          {
            name: 'AI Specialist',
            position: 'Robotics Dept.',
            applicantsCount: 9,
            dateDue: '15 Oct 2023',
          },
          {
            name: 'UI/UX Expert',
            position: 'Design Dept.',
            applicantsCount: 0,
            dateDue: '29 Sep 2023',
          },
          {
            name: 'Lepak Lead',
            position: 'One Corner Dept.',
            applicantsCount: 4,
            dateDue: '29 Sep 2024',
          }
        ],
      };
    },
    methods: {
      handleCardClick(index) {
        // Handle card click event, e.g., navigate to applicant's details page
        console.log(`Clicked on card ${index}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 40px;
  }
  
  .header {
    font-family: 'montserrat-bold';
    font-size: 30px;
    padding: 10px;
  }
  
  .createButton {
    color: #ffffff;
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
    color: #FFFFFF;
  }
  
  .card:hover .position {
    color: #ffffffdc;
  }
  
  .border {
    width: 5px;
    height: 40px;
    border-radius: 5px;
    background-color: #6A44D4;
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
    color: #857F95;
  }
  
  .edit-button {
    margin-left: auto;
    background-color: #6A44D4;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  .edit-button:hover {
    background-color: #FFFFFF;
    color: #6A44D4;
  }
  </style>
  