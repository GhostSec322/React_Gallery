import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import '../Firebase/config'
import './Home'

const Login = () => {
  // 로그인 처리 함수
  const signInWithFirebase = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      // 로그인 성공 후 리다이렉션
       history.push('/home'); // 리다이렉션 방법에 따라 변경 가능
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  return (
    <div>
      <h1>로그인 페이지</h1>
      <button onClick={signInWithFirebase}>Google 로그인</button>
    </div>
  );
};

export default Login;
