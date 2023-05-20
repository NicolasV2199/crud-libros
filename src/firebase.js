// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFhxE-igvIVgjgB0FtsSDpjzN-kTHq0ms",
  authDomain: "crud-libros-f606f.firebaseapp.com",
  projectId: "crud-libros-f606f",
  storageBucket: "crud-libros-f606f.appspot.com",
  messagingSenderId: "257873779674",
  appId: "1:257873779674:web:25b6eaee38cf954279fee3",
  measurementId: "G-GNK8LNG3J7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};
