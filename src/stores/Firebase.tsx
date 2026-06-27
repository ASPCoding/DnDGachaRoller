// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpySTn9GQBVQC9wF1BaXaLs2_JOzG2Hsw",
  authDomain: "dndlitegacharoller.firebaseapp.com",
  projectId: "dndlitegacharoller",
  storageBucket: "dndlitegacharoller.firebasestorage.app",
  messagingSenderId: "214344742308",
  appId: "1:214344742308:web:93022e8fbad45dc481fd31",
  measurementId: "G-2BXPB0CTKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;