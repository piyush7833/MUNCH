import { initializeApp } from "firebase/app";
// import admin from 'firebase-admin';
// const serviceAccount = require('../munch-396608-firebase-adminsdk-jmmm1-95eec9c461.json');
const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTHDOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID,
	// credential: admin.credential.cert(serviceAccount)
};

const app = initializeApp(firebaseConfig);

export default app;
