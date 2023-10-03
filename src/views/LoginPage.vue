<template>
  <!-- left-hand side logo -->
  <div class="container">
    <div class="logo_container">
      <img id="logo" src="../assets/logo/sbrp_logo_default.png" />
      <div id="bar" class="mt-4 mb-4"></div>
      <div id="slogan">Discover New Horizons</div>
    </div>

    <!-- right-hand side login container -->
    <div class="login_container">
      <div class="welcome_msg">Welcome Back!</div>

      <div class="login_inputs">
        <form class="login_form">
          <div>Email</div>
          <input type="text" class="login_input mb-4" v-model="email" />
          <div>Password</div>
          <input type="password" class="login_input" v-model="password" />
        </form>
      </div>

      <div class="button_container">
        <button id="login_button" class="btn btn-secondary applyButton" @click="loginUser">
          Login
        </button>
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
    const auth = useAuthStore()

    const loginUser = async () => {
      if (await validateLogin(email)) {
        console.log('Valid login')
        auth.login()
        router.push('/StyleGuide')
      } else {
        console.log('Invalid login')
      }
    }

    const validateLogin = async (email) => {
      try {
        const data = await staffData()
        const objectData = Object.values(data)
        for (let i = 0; i < objectData.length; i++) {
          if (objectData[i].email === email.value) {
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
    return { loginUser, email, password }
  }
}
</script>

<style scoped>
.container {
  display: flex;
}
.login_container {
  position: relative;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  padding: 10px;
  background-color: #6a44d4;
  border-radius: 10px;
  width: 100%;
  height: 600px;
}
.login_inputs {
  display: flex;
  flex-direction: column;
  color: white;
  font-family: 'montserrat-bold';
  justify-content: center;
  align-items: center;
}

.login_form input {
  position: relative;
  padding: 10px;
  border-radius: 10px;
  width: 300px;
}

.welcome_msg {
  color: white;
  font-family: 'montserrat-bold';
  font-size: 3em;
  margin: auto;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
}

.button_container {
  margin: auto;
  text-align: center;
}

.logo_container {
  position: relative;
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'montserrat-bold';
  font-size: 1em;
  width: 100%;
  margin-right: 10px;
}

#logo {
  width: 70%;
  height: auto;
}

#bar {
  width: 70%;
  height: 7.5px;
  border-radius: 10px;
  background-color: #000000;
}

#slogan {
  font-size: 20px;
}

#login_button {
  color: white;
  padding-left: 2em;
  padding-right: 2em;
  margin-top: 2em;
}

@media only screen and (max-width: 992px) {
  .container {
    display: block;
  }

  .logo_container {
    margin: 50px 0 50px 0;
  }

  .login_container {
    height: 500px;
  }

  #logo {
    width: 50%;
    height: auto;
  }

  #bar {
    width: 50%;
  }
}
</style>
