// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: "grocery-e8718.appspot.com",
  messagingSenderId: "965490387865",
  appId: "1:965490387865:web:5c85c58476e96eb9c6c108"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

