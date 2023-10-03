import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',

  state: () => ({
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn') || 'false')
  }),

  actions: {
    login() {
      this.isLoggedIn = true
      localStorage.setItem('isLoggedIn', 'true')
    },
    logout() {
      this.isLoggedIn = false
      localStorage.setItem('isLoggedIn', 'false')
    }
  }
})
