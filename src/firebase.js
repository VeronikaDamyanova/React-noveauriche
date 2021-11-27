import {  initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBPH96N8Tqkyb6A4hAdrS83jOFJyU_oADk",
  authDomain: "react-noveauriche.firebaseapp.com",
  projectId: "react-noveauriche",
  storageBucket: "react-noveauriche.appspot.com",
  messagingSenderId: "21194413060",
  appId: "1:21194413060:web:bcc4c1f182fbdecdd71151"
};

const app = initializeApp(firebaseConfig);
// const db = app.getFirestoreApp();
export const auth = getAuth(app)
export const db = getFirestore();

  // const fireDb = firebase.initializeApp(firebaseConfig);
  // export default fireDb.database().ref();