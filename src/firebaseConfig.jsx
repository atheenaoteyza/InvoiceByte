// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDF0qYAUzOYhEUMZNSGPGcCC_I7-NqQ8hs",
  authDomain: "deploy-test-4.firebaseapp.com",
  databaseURL:
    "https://deploy-test-4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "deploy-test-4",
  storageBucket: "deploy-test-4.firebasestorage.app",
  messagingSenderId: "366365472874",
  appId: "1:366365472874:web:f40bbb7ca0c91b098c3213",
  measurementId: "G-7WJP7CW14N",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
