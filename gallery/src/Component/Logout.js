import React, {useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Log.css"

const Logout = ({ scrollPosition }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.clear(); // 선택적으로 로컬 스토리지를 지울 수 있습니다.
        navigate("/"); // 로그아웃 후 '/'로 라우팅합니다.
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

        return () => clearTimeout(logoutTimer);
      }
    });

    return () => unsubscribe();
  }, []);

 
  return <button className={scrollPosition > 30 ? "scrolled-log":"log"} onClick={handleLogout}>로그아웃</button>;
};

export default Logout;
