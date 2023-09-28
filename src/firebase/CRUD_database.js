// Use this file to Create/Update, Read, Delete data from the database.

// In the HTML file, copy and paste the code below,
// <script type="module" src="CRUD_database.js"></script>

// Also remember to mount the Vue.js instance!

// Only adjust the input fields below!

// Importing Firebase API
// DO NOT EDIT
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

// Our Firebase Project Configuration
const sbrp = initializeApp({
    apiKey: process.env.VUE_APP_DATABASE_KEY,
    authDomain: process.env.VUE_APP_DATABASE_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_DATABASE_URL,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_DATABASE_APP_ID,
    measurementId: process.env.VUE_APP_DATABASE_MEASUREMENT_ID
})
const auth = getAuth(sbrp)
const db = getDatabase(sbrp)

// EDIT HERE
// Vue.js data variables
// Input whatever data variables you need, and edit the HTML file to have a v-model, etc.
const root = Vue.createApp({
    data() {
        return{
            // Enter your code here,

            // example
            // email: "seth@gmail.com"

            // activity: "hong deh street"

            // ...
        }
    },

    methods: {
        create_update_data() {
            console.log("Writing data into database...")
            // the console can be open, 

            // Database path must be set by you
            // e.g. users/seth/friends

            // EDIT HERE
            set(ref(db, /* PATH GOES HERE */), {
                // DATA YOU WANT TO WRITE GOES HERE,

                // example
                // email: this.email
                // ...

              })
            .then(
                function write_success() {
                    // display "Success" message
                    alert("Write Operation Successful")
                    console.log("Entry Created")
            })
            .catch((error) => {
                // for us to debug, tells us what error there is,
                const errorCode = error.code;
                const errorMessage = error.message;

                // display "Error" message
                var failed_message = `Write Operation Unsuccessful. Error Code ${errorCode}: ${errorMessage}`
                alert(failed_message)
                console.log(failed_message);
            })
        },

        read_data() {
            const data_to_be_read = ref(db, /* PATH LOCATION GOES HERE */);
            onValue(data_to_be_read, (snapshot) => {
                const data = snapshot.val();
                console.log(data)
            });
        },

        delete_data() {
            remove(/* path location goes here*/)
            .then(
                function delete_success() {
                    alert("Delete operation is a success!")
                    console.log("Delete operation is a success!")
                }
            )
            .catch((error) => {
                // for admin, tells you what error there is
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                console.log(errorCode)

                // display "Error" message
                // stays on the same page
                var failed_message = `Delete Operation Unsuccessful. Error: ${errorMessage}`
                alert(failed_message)
                console.log("Delete Unsuccessful");
            })

        }
    }
})


// Mount your HTML document
root.mount(/* Insert your ID here */)

