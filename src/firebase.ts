// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
import { connectDatabaseEmulator, getDatabase } from "firebase/database";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBEu0V5jU7vl34YOm49r3IdxNFLbOujLXw",
  authDomain: "tides-voyage.firebaseapp.com",
  databaseURL: "https://tides-voyage-default-rtdb.firebaseio.com",
  projectId: "tides-voyage",
  storageBucket: "tides-voyage.appspot.com",
  messagingSenderId: "637935232177",
  appId: "1:637935232177:web:cd2b8d7e50334d990fae90",
  measurementId: "G-M3NG09XV7E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const database = getDatabase(app);
if (window.location.hostname === "localhost") {
  // Point to the RTDB emulator running on localhost.
  connectDatabaseEmulator(database, "localhost", 9000);
  console.log("Connected to RTDB");
}
