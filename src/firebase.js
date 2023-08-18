// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3wF2ootocEhjx41aXaVl5Qpp_v2wMwLc",
  authDomain: "pcweb6-ad6c3.firebaseapp.com",
  projectId: "pcweb6-ad6c3",
  storageBucket: "pcweb6-ad6c3.appspot.com",
  messagingSenderId: "981830732148",
  appId: "1:981830732148:web:ed9fa107dc1d33f8230421"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);