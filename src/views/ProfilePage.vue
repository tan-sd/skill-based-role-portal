<script setup>
import { getStaffObj } from '../firebase/staff_class'
</script>

<template>
  <div class="py-3">
    <div class="mx-5">
      <font-awesome-icon
        :icon="['fas', 'chevron-left']"
        size="2xl"
        @click="navigateBack"
        class="btn-back"
      />
    </div>
    <div class="px-3 px-md-5 pb-3 my-3">
      <div class="card m-0 py-5">
        <div class="card-body pb-5">
          <div class="row pb-5 align-items-center">
            <div class="col-12 col-md-auto row p-0 m-0 mb-3">
              <div class="col-auto">
                <img class="profilePic" :src="getImageUrl(applicant.profilepic)" />
              </div>

              <div class="col d-flex align-items-center">
                <div>
                  <h3 class="card-title m-0 text-truncate fw-bold">{{ applicant.fullName }}</h3>
                  <p class="m-0 text-truncate">{{ applicant.email }}</p>
                </div>
              </div>
            </div>

            <div class="col-12 col-lg-6 row p-0 m-0">
              <div class="col-auto">
                <div>
                  <div
                    class="bg-secondary opacity-100"
                    style="width: 5px; height: 60px; border-radius: 3px"
                  ></div>
                </div>
              </div>

              <div class="col">
                <h5 class="card-title">{{ applicant.position }}</h5>
                <p class="card-title">
                  {{ applicant.department }} department, {{ applicant.country }}
                </p>
              </div>
            </div>
          </div>

          <div class="row pb-3">
            <div class="col">
              <div class="pb-4">
                <h4>Current Skills</h4>
                <div v-for="(e_skill, index) in applicant.skillsets" :key="index" class="d-inline">
                  <span
                    class="mb-1 me-2 p-1 px-2 text-white rounded d-inline-block bg-primary"
                    data-bs-toggle="popover"
                    data-bs-trigger="hover"
                    :data-bs-content="allSkills[e_skill]"
                    >{{ e_skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { allSkillsData } from '../firebase/CRUD_database.js'

export default {
  data() {
    return {
      applicant: {
        fullName: 'Perry the Platypus',
        email: 'agentp@secretagency.gov',
        position: 'Agent P',
        department: 'O.W.C.A (The Agency)',
        country: 'Tri-State Area',
        profilepic: '../assets/profile_pics/user1.png',
        id: '',
        skillsets: [
          "He's a semiaquatic",
          'Egg laying mammal of action',
          "He's a furry little flatfoot",
          "Who'll never flinch from a fray",
          "He's got more than just mad skill",
          "He's got a beaver tail and bill",
          'And the women swoon',
          'Whenever they hear him say -',
          "He's Perry, Perry the Platypus",
          '(You can call him Agent P)',
          'Perry (I said you can call him Agent P)',
          'Agent P'
        ]
      },

      allSkills: []
    }
  },
  async mounted() {
    this.applicant.id = localStorage.getItem('id')

    await this.getStaffData(this.applicant.id)

    await this.fetchSkillsFromDB()
    this.globalMethodEnablePopovers()
  },

  methods: {
    async fetchSkillsFromDB() {
      this.allSkills = await allSkillsData()
    },

    navigateBack() {
      this.$router.push('/discoverJobs')
    },

    getImageUrl(name) {
      return new URL(name, import.meta.url).href
    },

    async getStaffData() {
      var staff = await getStaffObj(this.applicant.id)
      this.applicant.fullName = staff.getFirstName() + ' ' + staff.getLastName()
      this.applicant.email = staff.getEmail()
      this.applicant.department = staff.getDepartment()
      this.applicant.position = staff.getPosition()
      this.applicant.skillsets = staff.getSkillset()
      this.applicant.profilepic = staff.getProfilePic()
      this.applicant.country = staff.getCountry()
    }
  }
}
</script>

<style scoped>
* {
  text-decoration: none;
}
.header {
  font-family: 'montserrat';
  font-size: 30px;
  padding: 10px;
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
  color: black;
}

.profilePic {
  border-radius: 50%;
  height: 80px;
  width: 80px;
  float: center;
}

.progress-bar {
  width: 160px;
  height: 160px;
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

.btn-back {
  cursor: pointer;
}
</style>
