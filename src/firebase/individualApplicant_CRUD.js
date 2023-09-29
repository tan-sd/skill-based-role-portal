import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, ref, onValue, get, set } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

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

const db = getDatabase(sbrp)

export const read_staff_data= async(name) =>
{
    const data_to_be_read = ref(db, `/staff/${name}`);
    const snapshot = await get(data_to_be_read)
    return snapshot.val()

}

export const read_listing_data= async(id) =>
{
    const data_to_be_read1 = ref(db, `/listing/${id}`);
    const snapshot1 = await get(data_to_be_read1)
    return snapshot1.val()

}
