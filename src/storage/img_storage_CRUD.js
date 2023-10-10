// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";
import { getStorage, ref, getDownloadURL, uploadBytes, listAll } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const sbrp = initializeApp({
    apiKey: import.meta.env.VITE_DATABASE_KEY,
    authDomain: import.meta.env.VITE_DATABASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_DATABASE_URL,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_DATABASE_APP_ID,
    measurementId: import.meta.env.VITE_APP_DATABASE_MEASUREMENT_ID
})

// Initialize Firebase
const analytics = getAnalytics(sbrp);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(sbrp);

// add a reference pointer to the particular file you want in the storage by using
// this syntax, ref(storage, "file_name")
const storageRef = ref(storage);


const root = Vue.createApp({
    data() {
        return{
            img_name: ""
        }
    },
    
    methods: {
// For images only, refer to these methods:
        retrieve_img(){
            // retrieve an img from firebase storage

            // replace "tuk_tuk.jpg" with the name of the image you wish to retrieve, otherwise you get a photo of me in a tuktuk.
            // you have to include the ".jpg" or file extension of the file you are referencing
            const testphoto = ref(storage, "tuk_tuk.jpg")

            // Get the URL for the image you wish to retrieve from the database
            // The URL refers to the one used in <img src="url">
            getDownloadURL(testphoto)
            .then((url) => {
                // `url` is the download URL for testphoto
                
                // this part depends on your page; which element you want to insert the img into
                const img = document.getElementById('myimg');
                img.setAttribute('src', url);
            })
            .catch((error) => {
                // Handle any errors
                console.log(error)
                console.log("you've got an error")
            });
        },

        retrieve_list(){
            // retrieve a list of imges from firebase storage

            // test reference to the folder
            const list_ref = ref(storage, "cambodia/")

            listAll(list_ref)
            .then((res) => {
              res.items.forEach((itemRef) => {
                // All the items under listRef.
                console.log(res.items.length) 
                getDownloadURL(itemRef)
                .then((url) => {
                    // `url` is the download URL for testphoto
                    // e.g. <img src=url>
                    
                    // this code needs to be edited depending on your page
                    // i'm just editing an img element to have its src attribute to point to my url
                    const img = document.getElementById('listimg');
                    img.innerHTML += "<img src='" + url + "' class='img-fluid'>"
                    
                })
                .catch((error) => {
                    // Handle any errors
                    console.log(error)
                    console.log("you got an error")
                });
              });
            }).catch((error) => {
              // Uh-oh, an error occurred!
              console.log(error)
            });
        },

        upload_img(){
            // on my webpage, i have an input element that looks like this:
            // <input type="file" id="img_input" accept="image/*" multiple>
            // this allows user to upload multiple images to the input, i then use DOM handling to retrieve the images.
            // the "accept" attribute only allows for images to be uploaded, either remove it or change the value to allow other file types.

            console.log(document.getElementById("img_input").files[0])
            var img_files = document.getElementById("img_input").files
            
            // for loop to upload each file selected
            for(let i = 0; i< img_files.length; i++){
                // upload img to firebase storage
                // the input "img_file" takes in a "File" object data type
                var img_file = img_files[i]

                // step 1: define what file you want to label this image as
                // you have to rename the file_name to what you want (e.g. the UserID for each profile photo)
                var file_name = "file_" + i

                // step 2: nothing, the code will take care of the rest
                var uploadRef = ref(storage, file_name)
                uploadBytes(uploadRef, img_file).then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                    console.log('this is file number ' + i)
                })
            }
        }
    }


})


//Mount
root.mount('#mount')
