import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAzNXgIXd5e_OqAacTD5xUr2k0APCiM6-A",
  authDomain: "gallery-using-react.firebaseapp.com",
  databaseURL: "https://gallery-using-react-default-rtdb.firebaseio.com",
  projectId: "gallery-using-react",
  storageBucket: "gallery-using-react.appspot.com",
  messagingSenderId: "435514113224",
  appId: "1:435514113224:web:e76dceafeb1d001ed779fd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { app, db, storage, auth, provider, firebaseConfig };

// 이하 기존 코드는 여기서부터 계속됩니다...
