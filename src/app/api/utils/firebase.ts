import { initializeApp } from "firebase/app";
// import admin from 'firebase-admin';
// const serviceAccount = require('../munch-396608-firebase-adminsdk-jmmm1-95eec9c461.json');
const firebaseConfig = {
  apiKey: "AIzaSyBNXQLb0QBa2bmmhPBQHhD2jLxAT_IExTA",
  authDomain: "munch-396608.firebaseapp.com",
  projectId: "munch-396608",
  storageBucket: "munch-396608.appspot.com",
  messagingSenderId: "689719876048",
  appId: "1:689719876048:web:98844cfb516eca5972c1d5",
  measurementId: "G-0CRWYJ2DTY",
  // credential: admin.credential.cert(serviceAccount)
};

const app = initializeApp(firebaseConfig);

export default app;