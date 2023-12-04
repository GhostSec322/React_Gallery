import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.clear(); // 선택적으로 로컬 스토리지를 지울 수 있습니다.
        navigate("/"); // 로그아웃 후 '/Pixabay'로 라우팅합니다.
      })
      .catch((error) => {
        console.log("로그아웃 에러:", error);
      });
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const logoutTimer = setTimeout(() => {
          handleLogout(); // 5 분 후 로그아웃 함수 호출
        }, 300000);

        return () => clearTimeout(logoutTimer); // 언마운트 시 타이머 정리
      }
    });

    return () => unsubscribe(); // 언마운트 시 인증 상태 변경 감지 정리
  }, []);

  return <button onClick={handleLogout}>로그아웃</button>;
};

export default Logout;
