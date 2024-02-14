import admin from 'firebase-admin';
// import '../munch-396608-firebase-adminsdk-jmmm1-95eec9c461.json'
// Initialize Firebase Admin SDK with service account credentials
const serviceAccount = require('../munch-396608-firebase-adminsdk-jmmm1-95eec9c461.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Get a reference to the messaging service
export const messaging = admin.messaging();
