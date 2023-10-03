<template>
  <!-- Top NavBar for below MD -->
  <nav class="navbar navbar-expand-md bg-white d-flex d-md-none">
    <div class="container-fluid">
      <router-link to="/">
        <img alt="sbrp-logo" src="@/assets/logo/sbrp_logo_default.png" width="100" class="m-3" />
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse row m-0" id="navbarSupportedContent">
        <div class="col-12 col-sm">
          <ul class="navbar-nav ms-4 me-auto mt-4 mb-lg-0 navbarItems">
            <li v-for="(link, index) in navLinks" :key="index" class="nav-item mb-3">
              <router-link :class="navbarItemClass(link.to, link.views)" :to="link.to">{{
                link.text
              }}</router-link>
            </li>
          </ul>
        </div>

        <div class="col-12 col-sm d-flex justify-content-sm-end justify-content-center">
          <!-- Profile Btn -->
          <div
            class="profileContainer p-3 mb-3 bg-light rounded d-flex flex-row justify-content-center align-items-center"
          >
            <img :src="getImageUrl(imgSrc)" alt="user_image" id="userProfileIcon" class="d-block" />
            <p id="userProfileName" class="fw-bold m-0 ms-2 text-truncate">{{ username }}</p>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Left NavBar for MD and above -->
  <div class="navbarContainerLeft p-4 bg-white d-none d-md-flex">
    <!-- logo -->
    <router-link to="/">
      <img alt="sbrp-logo" src="@/assets/logo/sbrp_logo_default.png" width="125" />
    </router-link>

    <!-- Navbar Links -->
    <nav class="navbarItems">
      <router-link
        v-for="(link, index) in filteredNavLinks"
        :key="index"
        :to="link.to"
        :class="navbarItemClass(link.to, link.views)"
        @click="link.text === 'Log Out' ? logoutUser() : null"
      >
        {{ link.text }}
      </router-link>
    </nav>

    <!-- Profile Btn -->
    <div
      class="profileContainer p-3 bg-light rounded d-flex flex-row justify-content-center align-items-center"
    >
      <img :src="getImageUrl(imgSrc)" alt="user_image" id="userProfileIcon" class="d-block" />
      <p id="userProfileName" class="fw-bold m-0 ms-2 text-truncate">{{ username }}</p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/authStore.js'

export default {
  setup() {
    const auth = useAuthStore()
    const accessRights = ref(localStorage.getItem('accessRights'))
    const navLinks = ref([
      { text: 'Discover Jobs', to: '/styleGuide', views: ['styleGuide'] },
      {
        text: 'My Applications',
        to: '/myapplications',
        views: ['myapplications'],
        accessRights: ''
      },
      {
        text: 'My Listings',
        to: '/mylistings',
        views: ['mylistings']
      },
      { text: 'Log Out', to: '/', views: ['loginPage'] }
    ])

    const filteredNavLinks = computed(() => {
      return navLinks.value.filter(link => {
        if (link.text === 'My Listings') {
          return accessRights.value == '1'
        }
        return true
      })
    })

    const logoutUser = () => {
      auth.logout()
    }

    return { logoutUser, filteredNavLinks }
  },
  data() {
    return {
      // Titles & Links in navbar   note: views is a list of views names (copy directly from views folder but make first letter lowercase)
      // navLinks: [
      //   { text: 'Discover Jobs', to: '/styleGuide', views: ['styleGuide'] },
      //   {
      //     text: 'My Applications',
      //     to: '/myapplications',
      //     views: ['myapplications'],
      //     accessRights: ''
      //   },
      //   {
      //     text: 'My Listings',
      //     to: '/mylistings',
      //     views: ['mylistings']
      //   },
      //   { text: 'Log Out', to: '/', views: ['loginPage'] }
      // ],
      // For Profile Button
      username: 'Alice',
      imgSrc: '../assets/profile_pics/user1.png'
    }
  },
  methods: {
    // Methods go here
    navbarItemClass(path, views) {
      const currentRoute = this.$route
      const currentComponent = currentRoute.name

      console.log('currentcomponent: ' + currentComponent)

      if (currentRoute.path === path) {
        return 'active text-dark'
      }

      if (views.includes(currentComponent)) {
        return 'active text-dark'
      }

      return 'text-light2'
    },
    getImageUrl(name) {
      return new URL(name, import.meta.url).href
    }
  },

  mounted() {
    // Lifecycle hook: Code to run after the component is mounted
  }
}
</script>

<style scoped>
.navbarContainerLeft {
  height: 100vh;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.sbrpLogo {
  width: 125px;
}

.navbarItems {
  display: flex;
  flex-direction: column;
}

.navbarItems a {
  text-decoration: none;
  font-weight: 700;
  margin-bottom: 2.5rem;
  transition: all 500ms ease-in-out;
  position: relative;
}

.navbarItems a.active::before {
  content: '';
  display: block;
  background-color: #6a44d4;
  width: 4rem;
  height: 150%;
  position: absolute;
  left: 0;
  transform: translateX(-135%) translateY(-15%);
  top: 0;
  border-radius: 0 0.75rem 0.75rem 0;
}

.profileContainer {
  width: 150px;
}

#userProfileIcon {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
}

#userProfileName {
  overflow: hidden;
  display: inline-block;
}
</style>
