// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: `AIzaSyAcgx66wsd3DO1vMJ-t80grvWitFA6m7Vk`,
  authDomain: `studkz-app.firebaseapp.com`,
  projectId: `studkz-app`,
  storageBucket: "studkz-app.appspot.com",
  messagingSenderId: "941336602312",
  appId: "1:941336602312:web:cd9c6566097d14ad3967fd",
  measurementId: "G-ZMYCJ94RNK",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();
const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
