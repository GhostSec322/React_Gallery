import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth'; // 추가된 부분

const firebaseConfig = {
  apiKey: "AIzaSyAzNXgIXd5e_OqAacTD5xUr2k0APCiM6-A",
  authDomain: "gallery-using-react.firebaseapp.com",
  projectId: "gallery-using-react",
  storageBucket: "gallery-using-react.appspot.com",
  messagingSenderId: "435514113224",
  appId: "1:435514113224:web:e76dceafeb1d001ed779fd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); // 인증 객체 추가

const provider = new GoogleAuthProvider(); // 구글 로그인 프로바이더 생성

export { app, db, storage, auth, provider , firebaseConfig}; // auth와 googleProvider를 export
