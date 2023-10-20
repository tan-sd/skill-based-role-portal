import './assets/main.css'
import "../styling/sass/main.min.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import customPlugin from './custom_plugin'


import App from './App.vue'
import router from './router'


// FONT AWESOME [START] =============================================================

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons [autofill] */
import { faCircleUser, faEarthAfrica, faHamsa, faHouseChimney, faShrimp, faWheatAwn, faDownload, faCalendar, faUserGroup, faChevronLeft, faXmark, faPlus, faGhost, faCircleExclamation, faTrash, faCircleCheck, faCircleXmark, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

library.add(faCircleUser, faHouseChimney, faEarthAfrica, faShrimp, faHamsa, faWheatAwn, faDownload, faCalendar, faUserGroup, faChevronLeft, faXmark, faPlus, faGhost, faCircleExclamation, faTrash, faCircleCheck, faCircleXmark, faMagnifyingGlass) // <== Import your FontAwesome icons here and it should auto-populate at [autofill] above

// FONT AWESOME [END] =============================================================


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(customPlugin)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
