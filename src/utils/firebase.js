import {  initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyADhLXNKQHCkFjnvCbgI-rFtswVFGWJb8Y",
  authDomain: "react-project-28407.firebaseapp.com",
  projectId: "react-project-28407",
  storageBucket: "react-project-28407.appspot.com",
  messagingSenderId: "736205818410",
  appId: "1:736205818410:web:814f23e35722ca9dd79153"
};

const app = initializeApp(firebaseConfig);
// const db = app.getFirestoreApp();
export const auth = getAuth(app)
export const db = getFirestore();

  // const fireDb = firebase.initializeApp(firebaseConfig);
  // export default fireDb.database().ref();