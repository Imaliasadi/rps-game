// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJXTRyVu7DHpTQy2BphjoQPnKgvrq3Ox8",
  authDomain: "rps-game-cb331.firebaseapp.com",
  projectId: "rps-game-cb331",
  storageBucket: "rps-game-cb331.firebasestorage.app",
  messagingSenderId: "701738097770",
  appId: "1:701738097770:web:6a6125fcbce2a8e937fe13",
  measurementId: "G-N2FC6KPCFZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
