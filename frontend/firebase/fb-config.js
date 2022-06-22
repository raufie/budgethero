// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import '@firebase/auth';
require('firebase/auth')

import '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDvasuJ7t4mQDBJbizKe0jGau7ksVNcne4",
  authDomain: "budgethero-243c3.firebaseapp.com",
  projectId: "budgethero-243c3",
  storageBucket: "budgethero-243c3.appspot.com",
  messagingSenderId: "380277870319",
  appId: "1:380277870319:web:4e5b42bcab6efda15c151a",
  measurementId: "G-F5B2D302TZ"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };