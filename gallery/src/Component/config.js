// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth,GoogleAuthProvider}from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyAzNXgIXd5e_OqAacTD5xUr2k0APCiM6-A",
  authDomain: "gallery-using-react.firebaseapp.com",
  databaseURL: "https://gallery-using-react-default-rtdb.firebaseio.com",
  projectId: "gallery-using-react",
  storageBucket: "gallery-using-react.appspot.com",
  messagingSenderId: "435514113224",
  appId: "1:435514113224:web:e76dceafeb1d001ed779fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider=new GoogleAuthProvider();
export {auth,provider};