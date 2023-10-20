// Use this file to Create/Update, Read, Delete data from the database.

// In the HTML file, copy and paste the code below,
// <script type="module" src="CRUD_database.js"></script>

// Also remember to mount the Vue.js instance!

// Only adjust the input fields below!

// Importing Firebase API
// DO NOT EDIT
import { sbrp } from './init'
import {
  getDatabase,
  ref,
  onValue,
  set,
  get,
} from 'firebase/database'

// Our Firebase Project Configuration

// const auth = getAuth(sbrp)
const db = getDatabase(sbrp)

export const staffData = async () => {
  const data = ref(db, `/staff`)
  const snapshot = await get(data)
  return snapshot.val()
}

export const allListingData = async () => {
  const data = ref(db, '/listing')
  const snapshot = await get(data)
  return snapshot.val()
}

export const listingDataByCreator = async (id) => {
  const listingData = await allListingData()
  var res = []

  for (let i=0; i<listingData.length; i++) {
    var listing = listingData[i]

    if (listing.createdby == id) {
      res.push(listing)
    }
  }

  return res
}

export const individualListingData = async(index) => {
  const data = ref(db, `/listing/${index}`);
  const snapshot = await get(data);
  return snapshot.val();
}

export const read_staff_data= async(name) => {
    const data_to_be_read = ref(db, `/staff/${name}`);
    const snapshot = await get(data_to_be_read)
    return snapshot.val()

}

export const read_listing_data= async(id) => {
    const data_to_be_read1 = ref(db, `/listing/${id}`);
    const snapshot1 = await get(data_to_be_read1)
    return snapshot1.val()

}

export const addNewListing = async (formData) => {
  const jobListingsRef = ref(db, '/listing');
  
  try {
    // Calculate the next index
    const snapshot = await get(jobListingsRef);
    const allIds = Object.keys(snapshot.val())
    const newIndex = Math.max(...allIds) + 1

    // Path to new index
    const newPath = `/listing/${newIndex}`;

    const createdBy = localStorage.getItem('id')

    // Transform
    const newListingData = {
      createdate: formData.createdate,
      createdby: createdBy,
      deadline: formData.deadline,
      department: formData.department,
      description: formData.description,
      responsibilities: formData.responsibilities.length == 0 ? "" : formData.responsibilities || "",
      skills: formData.skills.length == 0 ? "" : formData.skills || "",
      applicants: formData.applicants.length == 0 ? "" : formData.applicants || "",
      title: formData.title,
      listingId: newIndex
    };

    await set(ref(db, newPath), newListingData);
    console.log('New listing added successfully');
    return newIndex
  } catch (error) {
    console.error('Error adding new listing:', error);
    return false
  }
};

export const updateJobListing = async (id, formData) => {
  const jobListingsRef = ref(db, `/listing/${id}`);
  
  try {
    const newListingData = {
      createdate: formData.createdate,
      createdby: formData.createdby,
      deadline: formData.deadline,
      department: formData.department,
      description: formData.description,
      responsibilities: formData.responsibilities.length == 0 ? "" : formData.responsibilities || "",
      skills: formData.skills.length == 0 ? "" : formData.skills || "",
      applicants: formData.applicants.length == 0 ? "" : formData.applicants || "",
      title: formData.title,
      listingId: id
    };
    //set new dataset
    await set(jobListingsRef, newListingData);
    console.log('New listing added successfully');
    return true

  } catch (error) {
    console.error('Error adding new listing:', error);
  }
};

export const allRoleData = async () => {
  const data = ref(db, '/role')
  const snapshot = await get(data)
  return snapshot.val()
}

export const allDepartmentData = async () => {
  const data = ref(db, '/department')
  const snapshot = await get(data)
  return snapshot.val()
}

export const addListingApplied = async (staff_id, listing_id) => {
  // 1) Get the current listings applied and current listings
  const staffRef = ref(db, `/staff/${staff_id}`)
  const snapshot = await get(staffRef)
  const staffObj = snapshot.val()

  const listingsApplied = staffObj.listingsapplied
  const accessRights = staffObj.accessrights

  const allListings = await allListingData()

  // 2) Add the new listing to listings applied & push
  if (accessRights == '1') {
    var error = 'Admin user cannot apply for listings'
    console.log(`Error in addListingApplied: ${error}`)
    throw error
  }

  if (listingsApplied.includes(listing_id)) {
    // If staff alr applied for this listing
    return listingsApplied
  } else if (!Object.keys(allListings).includes(String(listing_id))) {
    // If listing does not exist
    var error = 'Listing ID does not exist'
    console.log(`Error in addListingApplied: ${error}`)
    throw error
  }

  if (listingsApplied[0] == 'No listings applied yet') {
    // If no listings applied yet
    listingsApplied[0] = listing_id
  } else {
    listingsApplied.push(listing_id)
  }

  try {
    const staffLARef = ref(db, `/staff/${staff_id}/listingsapplied`)
    await set(staffLARef, listingsApplied)
    return listingsApplied
  } catch (error) {
    console.error('Error in addListingApplied:', error);
  }
};

// EDIT HERE
// Vue.js data variables
// Input whatever data variables you need, and edit the HTML file to have a v-model, etc.
// const root = Vue.createApp({
//   data() {
//     return {
//       // Enter your code here,
//       // example
//       // email: "seth@gmail.com"
//       // activity: "hong deh street"
//       // ...
//     }
//   },

//   methods: {
//     create_update_data() {
//       console.log('Writing data into database...')
//       // the console can be open,

//       // Database path must be set by you
//       // e.g. users/seth/friends

//       // EDIT HERE
//       set(ref(db /* PATH GOES HERE */), {
//         // DATA YOU WANT TO WRITE GOES HERE,
//         // example
//         // email: this.email
//         // ...
//       })
//         .then(function write_success() {
//           // display "Success" message
//           alert('Write Operation Successful')
//           console.log('Entry Created')
//         })
//         .catch((error) => {
//           // for us to debug, tells us what error there is,
//           const errorCode = error.code
//           const errorMessage = error.message

//           // display "Error" message
//           var failed_message = `Write Operation Unsuccessful. Error Code ${errorCode}: ${errorMessage}`
//           alert(failed_message)
//           console.log(failed_message)
//         })
//     },

//     read_data() {
//       const data_to_be_read = ref(db /* PATH LOCATION GOES HERE */)
//       onValue(data_to_be_read, (snapshot) => {
//         const data = snapshot.val()
//         console.log(data)
//       })
//     },

//     delete_data() {
//       remove(/* path location goes here*/)
//         .then(function delete_success() {
//           alert('Delete operation is a success!')
//           console.log('Delete operation is a success!')
//         })
//         .catch((error) => {
//           // for admin, tells you what error there is
//           const errorCode = error.code
//           const errorMessage = error.message
//           console.log(errorMessage)
//           console.log(errorCode)

//           // display "Error" message
//           // stays on the same page
//           var failed_message = `Delete Operation Unsuccessful. Error: ${errorMessage}`
//           alert(failed_message)
//           console.log('Delete Unsuccessful')
//         })
//     }
//   }
// })

// Mount your HTML document
// root.mount(/* Insert your ID here */)
