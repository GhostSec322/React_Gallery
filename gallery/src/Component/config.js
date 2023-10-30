// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth,GoogleAuthProvider}from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCduxZYeyxxHMLKbLW0J62YQ9I_30-krsk",
  authDomain: "project-anyang.firebaseapp.com",
  projectId: "project-anyang",
  storageBucket: "project-anyang.appspot.com",
  messagingSenderId: "1054085735051",
  appId: "1:1054085735051:web:47d3dc79652f021c54ea8e",
  measurementId: "G-N18Z202PGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider=new GoogleAuthProvider();
export {auth,provider};