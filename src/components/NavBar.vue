<template>
  <div class="navbarContainer">
    <router-link to="/">
      <img alt="sbrp-logo" class="sbrpLogo" src="@/assets/logo/sbrp_logo_default.png" width="125" />
    </router-link>

    <nav class="navbarItems">
      <router-link to="/">Discover Jobs</router-link>
      <router-link to="/">My Listings</router-link>
      <router-link to="/">Log Out</router-link>
    </nav>

    <div class="profileContainer">
      <div class="profileItems">
        <div class="profilePicture"></div>
        <div>Alice</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbarContainer {
  width: 225px;
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
}

.sbrpLogo {
  margin-bottom: 60px;
}

.navbarItems {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.navbarItems a {
  margin-bottom: 40px;
}

a {
  text-decoration: none;
  color: #160b32;
  font-family: montserrat-bold;
}

.profileContainer {
  position: relative;
  width: 175px;
  height: 75px;
  background-color: #efe7ef;
  bottom: 0;
  font-family: 'montserrat-bold';
  border-radius: 10px;
}

.profileItems {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  top: 15px;
}

.profilePicture {
  position: relative;
  width: 40px;
  height: 40px;
  border: 1px solid black;
  border-radius: 50%;
  margin-right: 20px;
}
</style>
