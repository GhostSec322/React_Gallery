import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.clear(); // 선택적으로 로컬 스토리지를 지울 수 있습니다.
        navigate('/'); // 로그아웃 후 '/Pixabay'로 라우팅합니다.
      })
      .catch((error) => {
        console.log('로그아웃 에러:', error);
      });
  };

  return <button onClick={handleLogout}>로그아웃</button>;
};

export default Logout;
