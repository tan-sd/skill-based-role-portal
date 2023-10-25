<script setup>
import { getStaffObj } from '../firebase/staff_class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
    <div class="d-flex flex-column">
      <div class="header-container px-4 py-4">
        <!-- Header -->
        <h3 class="fw-bold">Profile Page</h3>
      </div>

    <div class="body-container container-fluid px-4">
      <!-- this portion controls the personal details -->
      <div class="row" id="profileHeaderHeader">
        <div class="col">
          Profile
        </div>
      </div>
      <div class="row" id="profileHeader">
        <div class="col-4 text-center position-relative" id="imageContainer">
          <img :src="getImageUrl(imgSrc)" id="profilePicture" >
          <div class="middle">
            <div class="text"><font-awesome-icon icon="fa-solid fa-camera-rotate" /></div>
          </div>
        </div>
        <div class="col-8" id="headerText">
          <div id="fullName">
            {{ firstName }} {{ lastName }}
          </div>
          
          <div class="blackDivider">
          </div>

          <div id="positionDepartmentCountry">
            {{ position }} <font-awesome-icon icon="fa-solid fa-grip-lines-vertical" /> {{ department }} <font-awesome-icon icon="fa-solid fa-grip-lines-vertical" /> {{ country }}
          </div>

          <div id="email">
            {{ email }}
          </div>
        </div>
      </div>

      <!-- this portion controls the skillsets -->
      <div class="row" id="skillsetsHeader">
        <div class="col">
          Skillsets
        </div>
      </div>
      <div class="row" id="skillsets">
        <!-- ADAM! paste your code for skills here -->
      </div>

    </div>


    </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      firstName: "Seth",
      lastName: "Yap",
      email: "your@mother.fly.sg",
      department: "IT",
      position: "Sales",
      country: "Singapore",
      skillsets: ["live","laugh","SOP Development and Implementation"],
      skillDesc: {"live":"Well, donkey, the meaning of life is like an onion. It's got layers, you see. Sometimes, it's about finding love, friendships, and maybe a cozy swamp to call your own. But it's different for everyone, and you have to figure it out on your own journey. Just don't let Lord Farquaad tell you what it should be!","laugh":"Well, donkey, the meaning of life is like an onion. It's got layers, you see. Sometimes, it's about finding love, friendships, and maybe a cozy swamp to call your own. But it's different for everyone, and you have to figure it out on your own journey. Just don't let Lord Farquaad tell you what it should be!","SOP Development and Implementation":"Well, donkey, the meaning of life is like an onion. It's got layers, you see. Sometimes, it's about finding love, friendships, and maybe a cozy swamp to call your own. But it's different for everyone, and you have to figure it out on your own journey. Just don't let Lord Farquaad tell you what it should be!"},
      imgSrc: "../assets/profile_pics/user1.png"
    }
  },
  
  async created() {
    this.id = localStorage.getItem('id');
    
    await this.getStaffData()
  },

  methods: {
    getImageUrl(name) {
        return new URL(name, import.meta.url).href
      },
    
    async getStaffData() {
      console.log("========= getStaffData =========")
      var staff = await getStaffObj(this.id)
      this.firstName = staff.getFirstName()
      this.lastName = staff.getLastName()
      this.email = staff.getEmail()
      this.department = staff.getDepartment()
      this.position = staff.getPosition()
      this.skillsets = staff.getSkillset()
      this.imgSrc = staff.getProfilePic()
      this.country = staff.getCountry()
    }

  }
}
  

</script>


<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 0 0 0px;
}

.body-container {
  flex: 1 0 0px;
}

.listing-card {
  align-items: center;
  transition:
    background-color 0.3s ease-in-out,
    color 0.3s ease-in-out;
  cursor: pointer;
  width: 100%;
}

#profileHeaderHeader {
  background-color: #6a44d4;
  color: #ffffff;
  font-family: 'montserrat-bold';
  padding: 10px 10px 10px 25px;
  border-radius: 25px 25px 0px 0px;
  letter-spacing: 10px;
  font-size: 30px;
}

#profileHeader {
  background-color: #ffffff;
  border: 0px;
  border-radius: 0px 0px 25px 25px;
  padding: 20px 10px 20px 10px;
  font-family: 'montserrat-bold';
}

#headerText {
  padding: 50px 0px 50px 0px;
}

#fullName {
  font-size: 50px;
  letter-spacing: 5px;
  text-align: center;
}
.blackDivider {
  border: solid 0.125rem black;
  border-radius: 1rem;
  margin:5px 20px 5px 20px;
}

#positionDepartmentCountry {
  text-align: center;
  font-size: 25px;
}

#email {
  text-align: center;
}

.imageContainer {
  margin: 10px 20px;
  padding-top: 25px;
}

#profilePicture {
  width: 100%;
  border-radius: 50%;
  object-fit: cover;
  aspect-ratio: 1/1;
  transition: .5s ease;
  backface-visibility: hidden;
  opacity: 1;
  display: block;
}

.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 45%;
  left: 42%;
  /* transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%); */
  text-align: center;
}

.text {
  background-color: rgb(95, 95, 95);
  color: black;
  /* font-size: 16px; */
  padding: 8px 16px;
  border-radius: 15%;
}

#imageContainer:hover #profilePicture{
  opacity: 0.3;
}

#imageContainer:hover .middle{
  opacity: 1;
}

#skillsetsHeader {
  background-color: #6a44d4;
  color: #ffffff;
  font-family: 'montserrat-bold';
  padding: 10px 10px 10px 25px;
  border-radius: 25px 25px 0px 0px;
  letter-spacing: 10px;
  font-size: 30px;
  margin-top:3rem;
}

#skillsets {
background-color: #ffffff;
border: 0px;
border-radius: 0px 0px 25px 25px;
padding: 20px 10px 20px 10px;
font-family: 'montserrat-bold';
}

#skillset {
  margin: auto;
  margin-bottom:20px;
}

#skill {
  font-size: 25px;
}

#desc {
  font-size: 15px;
  /* background-color: #b8acb4; */
  border-radius: 10px;
  padding: 10px 20px 10px 20px;
  /* color: rgb(72, 72, 72); */
}

.divider {
  border: solid 0.125rem #6a44d4;
  border-radius: 1rem;
  margin:5px 0px 0px 0px;
}

</style>
