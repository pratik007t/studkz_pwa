import firebase from "firebase/compat/app";
import "firebase/compat/auth"; // for authentication
import "firebase/compat/firestore"; // for cloud firestore
import "firebase/compat/messaging";
import "firebase/storage"; // for storage
import "firebase/database"; // for realtime database
import "firebase/functions"; // for cloud functions

const WebsitePushID = "web.pro.studkz";
const APNsKey =
  "MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgU9AA3d9QLzSB4h9Ja83CtFeYPhlMRCULTwGoKFXyk/egCgYIKoZIzj0DAQehRANCAARdWL7FmaBkeJyPBZlcX6HXE9od1GsQcNjbInhEAtomR9tqyDkouSftAvz1nzPD5f4r3Tlfst0m7g9vnA21rF/8";

const VAPID_KEY = process.env.REACT_APP_FB_VAPID_KEY;
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGIN_SENDER_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
  measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var provider = new firebase.auth.OAuthProvider("google.com"); //new firebase.auth.GoogleAuthProvider();
var appleProvider = new firebase.auth.OAuthProvider("apple.com");
var staticToken = "demo";

// export const requestPermission = async () => {
//   try {
//     const UserData = localStorage.getItem("userId")
//       ? localStorage.getItem("userId")
//       : null;
//     if (UserData) {
//       const messaging = await firebase.messaging();
//       Notification.requestPermission().then((permission) => {
//         if (permission === "granted") {
//           messaging
//             .getToken({
//               vapidKey: VAPID_KEY,
//             })
//             .then((currentToken) => {
//               localStorage.setItem("deviceToken", currentToken);
//             });
//         } else if (permission === "denied") {
//           // alert("You denied for the notification");
//           return true;
//         }
//       });
//     } else {
//       return true;
//     }
//   } catch (error) {
//     return error;
//   }
// };

export const requestPermissionWihtoutLogin = async () => {
  try {

// Check if the browser is Safari
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if (isSafari) {
  // Define your WebsitePushID
  const WebsitePushID = "web.pro.studkz";
  // Function to check and request push notification permission
  const checkRemotePermission = function(permissionData) {
    if (permissionData.permission === 'default') {
      console.log("The user is making a decision");
      // Request permission
      window.safari.pushNotification.requestPermission(
        'http://localhost:3000', // Replace with your website URL
        WebsitePushID,
        {}, // Additional data (if needed)
        checkRemotePermission
      );  
    } else if (permissionData.permission === 'denied') {
      console.log("The user denied push notification permission.");
      console.dir(permissionData); // Log permission data for debugging
    } else if (permissionData.permission === 'granted') {
      console.log("Device Token: " + permissionData.deviceToken);
    }
  };
  // Function to initiate the push notification permission process
  const pushNotification = function() {
    if ('safari' in window && 'pushNotification' in window.safari) {
      // Check permission and start the process
      var permissionData = window.safari.pushNotification.permission(WebsitePushID);
      checkRemotePermission(permissionData);
    } else {
      alert("Push notifications not supported.");
    }
  };
  // Call the pushNotification function to start the process
  pushNotification();
}
else {
  //  FCM.
  const messaging = await firebase.messaging();
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      messaging.getToken({
          vapidKey: VAPID_KEY,
        })
        .then((currentToken) => {
          localStorage.setItem("deviceToken", currentToken);
        }).catch(error => {
          console.log('error', error)
        })
    } else if (permission === "denied") {

      alert("You denied for the notification");
      return true;
    }
  });
} }catch (error) {
    return error;
  }
};

export { auth, provider, appleProvider, staticToken, firebaseConfig };
