import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBEQdYBQMYlhEQ14aGG7D_byvfZHKcg49w",
    authDomain: "reactgallery-9edc2.firebaseapp.com",
    projectId: "reactgallery-9edc2",
    storageBucket: "reactgallery-9edc2.appspot.com",
    messagingSenderId: "706048848393",
    appId: "1:706048848393:web:823768550e30f1911d3ed8"
};

// Firebase 초기화
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // 로그인 성공시 처리할 작업
        const user = userCredential.user;
        console.log('로그인 성공', user);
      })
      .catch((error) => {
        // 로그인 실패시 처리할 작업
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('로그인 실패', errorCode, errorMessage);
      });
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button type="submit">로그인</button>
    </form>
  );
};

export default Login;
