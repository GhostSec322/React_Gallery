///// 파이어 베이스 인증, storage  임포트
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Storage 모듈 가져오기
import { getFirestore, collection, doc, deleteDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAzNXgIXd5e_OqAacTD5xUr2k0APCiM6-A",
  authDomain: "gallery-using-react.firebaseapp.com",
  databaseURL: "https://gallery-using-react-default-rtdb.firebaseio.com",
  projectId: "gallery-using-react",
  storageBucket: "gallery-using-react.appspot.com",
  messagingSenderId: "435514113224",
  appId: "1:435514113224:web:e76dceafeb1d001ed779fd",
};

// Firebase 설정 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
alert(db);
// Storage 서비스에 대한 참조 가져오기
const storage = getStorage(app);

export { auth, provider, storage, db }; // auth, provider, storage 함께 내보내기
