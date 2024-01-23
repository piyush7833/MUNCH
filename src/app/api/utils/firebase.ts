// "use server"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyBNXQLb0QBa2bmmhPBQHhD2jLxAT_IExTA",
  authDomain: "munch-396608.firebaseapp.com",
  projectId: "munch-396608",
  storageBucket: "munch-396608.appspot.com",
  messagingSenderId: "689719876048",
  appId: "1:689719876048:web:98844cfb516eca5972c1d5",
  measurementId: "G-0CRWYJ2DTY"
};

const app = initializeApp(firebaseConfig);


export default app;