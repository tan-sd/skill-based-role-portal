import {initializeApp} from 'firebase/app'
export const sbrp = initializeApp({
    apiKey: import.meta.env.VITE_DATABASE_KEY,
    authDomain: import.meta.env.VITE_DATABASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_DATABASE_URL,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_DATABASE_APP_ID,
    measurementId: import.meta.env.VITE_APP_DATABASE_MEASUREMENT_ID
  })