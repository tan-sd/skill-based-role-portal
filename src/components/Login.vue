<template>
    <!-- left-hand side logo -->
    <div class="logo_container">
      <!-- <img id="logo" src="https://i.imgflip.com/69n9jm.jpg"> -->
      <img id="logo" src="../assets/logo/sbrp_logo_default.png">
      <text id="bar">___________</text> <br>
      Discover New Horizons
    </div>

    <!-- right-hand side login container -->
    <div class="login_container">
      <div class="welcome_msg">
        Welcome Back!
      </div>

      <div class="login_inputs">
        <form class="login_form">
          Email <br>
          <input type="text" id="email" v-model="email"><br><br>
          Password <br>
          <input type="password" id="password" v-model="password">
        </form>
      </div>
      
      <div class="button_container">
        <button id="login_button" class="btn btn-secondary applyButton">Login</button>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    }
  },

  methods: {
    login_redirect() {
      // assume the Azure SSO always authenticates successfully and returns the user's 
    }
  }
}
</script>

<style scoped>
.login_container {
  position: relative;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: 30px;
  padding: 10px;
  background-color: #3a1e85;
  border-radius: 10px;
  width: 40%;
  height: 550px;
  
}
.login_inputs {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding: auto;
}

.login_form {
  position: relative;
  left: 50%;
  transform: translate(-50%);
  display:inline-block;
  color: white;
  font-family: 'montserrat-bold';
}

.welcome_msg{
  color: white;
  font-family:'montserrat-bold';
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
  text-align: center;
  width: 50%;
  font-family: 'montserrat-bold';
  font-size: 1em;
}

#logo {
  margin: auto;
  display: block;
  width: 70%;
  margin-top: 150px;
  height: auto;
}

#bar {
  font-size: 5em;
}

#email {
  border-radius: 5px;
}

#password {
  border-radius: 5px;
}

#login_button {
  color: white;
  padding-left:2em;
  padding-right:2em;
  margin-top:2em;
}

</style>
