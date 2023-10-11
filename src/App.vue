<script setup>
// The code is importing various components and objects from different files.
import { RouterLink, RouterView } from 'vue-router'
import router from './router'
import NavBar from './components/NavBar.vue'
import { useAuthStore } from './stores/authStore.js';

const auth = useAuthStore()

</script>

<template>
  <div class="app bg-light flex-column flex-md-row">
    <div id="appVueNavbar" v-if="auth.isLoggedIn">
      <NavBar />
    </div>
    <RouterView id="appVueRouter" />
  </div>
</template>

<script>

export default {
  created() {
    router.beforeEach((to, from) => {
      if (!useAuthStore().isLoggedIn && to.name != 'login') {
        return { name: 'login' }
      }
    })
  },
}
</script>

<style scoped>
.app {
  height: 100vh;
  width: 100vw;
  display: flex;
}

#appVueNavbar {
  flex: 0 0 0px;
}

#appVueRouter {
  flex: 1 0 0px;
  overflow: scroll;
}

::-webkit-scrollbar {
    width: 0.1rem;
}

::-webkit-scrollbar-thumb {
    background: transparent;
}
</style>
