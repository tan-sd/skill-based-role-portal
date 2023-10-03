<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>
<template>
  <div>
    <!-- Flex container for header and button -->
    <div class="header-container">
      <!-- Header -->
      <div class="header">Manage your listings!</div>
      <!-- Apply Now button -->
      <button class="btn btn-secondary createButton">+ Create Listing</button>
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
        <font-awesome-icon icon="fa-solid fa-user-group" size="7px" class="me-2" />
        <div class="applicantsCount">{{ job[0].applicantsCount }} Applicants</div>
        <font-awesome-icon icon="fa-solid fa-calendar" size="7px" class="me-2" />
        <div class="dateDue">{{ job[0].dateDue }}</div>
        <button class="edit-button">Edit</button>
      </div>

      <!-- Card 2 -->
      <div class="card" @click="handleCardClick(1)">
        <div class="border"></div>
        <div class="details">
          <div class="name">{{ job[1].name }}</div>
          <div class="position">{{ job[1].position }}</div>
        </div>
        <font-awesome-icon icon="fa-solid fa-user-group" size="7px" class="me-2" />
        <div class="applicantsCount">{{ job[1].applicantsCount }} Applicants</div>
        <font-awesome-icon icon="fa-solid fa-calendar" size="7px" class="me-2" />
        <div class="dateDue">{{ job[1].dateDue }}</div>
        <button class="edit-button">Edit</button>
      </div>

      <!-- Card 3 -->
      <div class="card" @click="handleCardClick(2)">
        <div class="border"></div>
        <div class="details">
          <div class="name">{{ job[2].name }}</div>
          <div class="position">{{ job[2].position }}</div>
        </div>
        <font-awesome-icon icon="fa-solid fa-user-group" size="7px" class="me-2" />
        <div class="applicantsCount">{{ job[2].applicantsCount }} Applicants</div>
        <font-awesome-icon icon="fa-solid fa-calendar" size="7px" class="me-2" />
        <div class="dateDue">{{ job[2].dateDue }}</div>
        <button class="edit-button">Edit</button>
      </div>

      <!-- Card 4 -->
      <div class="card" @click="handleCardClick(3)">
        <div class="border"></div>
        <div class="details">
          <div class="name">{{ job[3].name }}</div>
          <div class="position">{{ job[3].position }}</div>
        </div>
        <font-awesome-icon icon="fa-solid fa-user-group" size="7px" class="me-2" />
        <div class="applicantsCount">{{ job[3].applicantsCount }} Applicants</div>
        <font-awesome-icon icon="fa-solid fa-calendar" size="7px" class="me-2" />
        <div class="dateDue">{{ job[3].dateDue }}</div>
        <button class="edit-button">Edit</button>
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
          applicantsCount: 5,
          dateDue: '15 Oct 2023'
        },
        {
          name: 'AI Specialist',
          position: 'Robotics Dept.',
          applicantsCount: 9,
          dateDue: '15 Oct 2023'
        },
        {
          name: 'UI/UX Expert',
          position: 'Design Dept.',
          applicantsCount: 0,
          dateDue: '29 Sep 2023'
        },
        {
          name: 'Lepak Lead',
          position: 'One Corner Dept.',
          applicantsCount: 4,
          dateDue: '29 Sep 2024'
        }
      ]
    }
  },
  methods: {
    handleCardClick(index) {
      // Handle card click event, e.g., navigate to applicant's details page
      console.log(`Clicked on card ${index}`)
    }
  }
}
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
  font-family: 'montserrat-bold';
}

.container {
  position: relative;
  margin: 0 2vw 0 2vw;
  border-radius: 10px;
  width: 75vw;
  height: 85vh;
  flex-wrap: wrap; /* Allow cards to wrap when container width is reduced */
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
  transition:
    background-color 0.3s,
    color 0.3s;
  cursor: pointer;
  color: black;
  position: relative;
}

.card:hover {
  background-color: #6a44d4;
  color: #ffffff;
}

.card:hover .position {
  color: #ffffffdc;
}

.card:hover .edit-button {
  background-color: #ffffff;
  color: #6a44d4;
}

.border {
  width: 5px;
  height: 40px;
  border-radius: 5px;
  background-color: #6a44d4;
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
  color: #857f95;
}

.applicantsCount {
  font-size: 20px;
  font-family: 'montserrat-bold';
  margin-right: 15%;
}

.dateDue {
  font-size: 20px;
  font-family: 'montserrat-bold';
  margin-right: 30%;
}

.edit-button {
  margin-left: auto;
  background-color: #6a44d4;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.me-2 {
  color: #6a44d4;
}

.card:hover .me-2 {
  color: #ffffff;
}
</style>
