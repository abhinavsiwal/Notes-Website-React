import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDH6p8ZYUcl2fn1wbviWDFm0uYCizsAJ5M",
    authDomain: "notes-website-1d278.firebaseapp.com",
    databaseURL: "https://notes-website-1d278-default-rtdb.firebaseio.com",
    projectId: "notes-website-1d278",
    storageBucket: "notes-website-1d278.appspot.com",
    messagingSenderId: "47962896907",
    appId: "1:47962896907:web:3d6dd9889e1b99145d250e",
    measurementId: "G-YV8SSP38F0"
  };
  
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const auth = firebase.auth();
export const firestore = firebase.firestore;
export default db;