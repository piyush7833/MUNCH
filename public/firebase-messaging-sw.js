importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyBNXQLb0QBa2bmmhPBQHhD2jLxAT_IExTA",
    authDomain: "munch-396608.firebaseapp.com",
    projectId: "munch-396608",
    storageBucket: "munch-396608.appspot.com",
    messagingSenderId: "689719876048",
    appId: "1:689719876048:web:98844cfb516eca5972c1d5",
    measurementId: "G-0CRWYJ2DTY"
  };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  try {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );
    console.log("Notification received");
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image,
      name: payload?.notification?.name,
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  } catch (error) {
    console.log(error, "error")
  }
});