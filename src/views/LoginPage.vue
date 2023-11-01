<template>
  <div class="d-flex flex-column flex-sm-row">
    <!-- left-hand side logo -->
    <div class="logo_container my-4 mt-5 mt-sm-4">
      <img id="logo" src="../assets/logo/sbrp_logo_default.png" />
      <div id="bar" class="my-2 my-sm-4"></div>
      <h6 class="fw-bold">Discover New Horizons</h6>
    </div>

    <!-- right-hand side login container -->
    <div class="login_container p-3">
      <div class="bg-primary rounded-4 login_holder">
        <h1 class="d-none d-sm-block text-white fw-bold text-center">Welcome Back!</h1>
        <h3 class="d-block d-sm-none text-white fw-bold text-center mb-4">Welcome Back!</h3>

        <div class="login_inputs text-white">
          <form>
            <h6>Email</h6>
            <input
              type="text"
              class="form-control rounded-3 border-0 w-100 mb-4"
              v-model="email"
              data-type="email"
              @keyup.enter="loginUser"
            />

            <h6>Password</h6>
            <input
              type="password"
              class="form-control rounded-3 border-0 w-100"
              v-model="password"
              data-type="password"
              @keyup.enter="loginUser"
            />
          </form>

          <div v-if="isIncorrect || isMissing" class="mt-3 text-warning">
            <small
              v-if="isIncorrect"
              class="text-truncate bg-warning d-inline p-1 px-3 rounded text-white warning-msg"
              ><font-awesome-icon icon="fa-solid fa-circle-exclamation" /> Incorrect Email or
              Password</small
            >
            <small
              v-if="isMissing"
              class="text-truncate bg-warning d-inline p-1 px-3 rounded text-white warning-msg"
              ><font-awesome-icon icon="fa-solid fa-circle-exclamation" /> Missing Email or
              Password</small
            >
          </div>
        </div>

        <div class="d-flex justify-content-center mt-4">
          <button id="loginButton" ref="loginButton" class="btn btn-secondary text-white px-5" data-type="login" @click="loginUser()">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import router from '../router'
import { useAuthStore } from '../stores/authStore.js'
import { staffData } from '../firebase/CRUD_database.js'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const isIncorrect = ref(false)
    const isMissing = ref(false)
    const auth = useAuthStore()

    if (auth.isLoggedIn) {
      // Redirect to home page if user is already logged in
      router.push('/discoverJobs')
    }

    const loginUser = async () => {
      if (!email.value || !password.value) {
        isMissing.value = true
        isIncorrect.value = false
      } else if (await validateLogin(email)) {
        auth.login()
        router.push('/discoverJobs')
      } else {
        isMissing.value = false
        isIncorrect.value = true
      }
    }

    const validateLogin = async (email) => {
      try {
        const data = await staffData()
        const objectData = Object.values(data)
        for (let i = 0; i < objectData.length; i++) {
          if (objectData[i].email.toLowerCase() === email.value.toLowerCase()) {
            localStorage.setItem('accessRights', objectData[i].accessrights)
            localStorage.setItem('id', Object.keys(data)[i])
            return true
          }
        }
        return false
      } catch (error) {
        // Adding error handling
        console.error('Error validating login: ', error)
        return false
      }
    }
    return { loginUser, email, password, isIncorrect, isMissing }
  }
}
</script>

<style scoped>
.logo_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 0px;
}

.login_container {
  flex: 1 0 0px;
}

.login_holder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem 4rem;
}

#logo {
  width: 70%;
}

#bar {
  width: 70%;
  height: 0.45rem;
  border-radius: 10px;
  background-color: #160b32;
}

.warning-msg {
  font-size: 0.65rem;
}

@media only screen and (max-width: 576px) {
  #logo {
    width: 35%;
  }

  #bar {
    width: 35%;
    height: 0.3rem;
  }

  .login_holder {
    padding: 1rem 1.5rem;
  }
}
</style>
