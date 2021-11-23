import { initializeApp } from "firebase/app";

// import firebase from 'firebase/compat/app';
// import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBPH96N8Tqkyb6A4hAdrS83jOFJyU_oADk",
  authDomain: "react-noveauriche.firebaseapp.com",
  projectId: "react-noveauriche",
  storageBucket: "react-noveauriche.appspot.com",
  messagingSenderId: "21194413060",
  appId: "1:21194413060:web:bcc4c1f182fbdecdd71151"
};

const app = initializeApp(firebaseConfig);

// export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();


// export default firebase;

// const app = initializeApp(firebaseConfig);