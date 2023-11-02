import { Popover } from 'bootstrap'

export default {
  install: (app) => {
    app.mixin({
      mounted() {
        this.globalMethodEnablePopovers()
      }
    })

    // Add a method
    app.config.globalProperties.globalMethodEnablePopovers = () => {
      // Allows bootstrap popovers in all files
      const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
      const popoverList = [...popoverTriggerList].map(
        (popoverTriggerEl) => new Popover(popoverTriggerEl)
      )
    }
  }
}
