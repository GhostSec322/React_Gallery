import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyAzNXgIXd5e_OqAacTD5xUr2k0APCiM6-A",
  authDomain: "gallery-using-react.firebaseapp.com",
  projectId: "gallery-using-react",
  storageBucket: "gallery-using-react.appspot.com",
  messagingSenderId: "435514113224",
  appId: "1:435514113224:web:e76dceafeb1d001ed779fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app);
const storage = getStorage(app); // 이 부분 추가

export { auth, provider, firestore, storage };