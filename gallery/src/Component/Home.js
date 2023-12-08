import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import Catagory from "./Catagory";
import Upload from "./Upload";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Home() {
  const keyValueDict = useSelector((state) => state.keyValueDict);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // useNavigate를 사용하여 navigate 함수 가져오기

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 사용자가 로그인되어 있다면, 로그인 상태로 설정합니다.
        setIsLoggedIn(true);
      } else {
        // 사용자가 로그인되어 있지 않다면, 로그아웃 상태로 설정하고 리다이렉트합니다.
        setIsLoggedIn(false);
        navigate("/"); // '/'로 이동
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  console.log("Redux State: ", keyValueDict);

  useEffect(() => {
    // 로그인 상태일 때만 실행되도록 조건 추가
    if (isLoggedIn) {
      localStorage.setItem("keyValueDict", JSON.stringify(keyValueDict));
    }
  }, [keyValueDict, isLoggedIn]);

  return (
    <div>
      {isLoggedIn && (
        <div>
          <h1>Home</h1>
          <Link to="/Mypage">Mypage</Link>
          <Link to="/">Go to Pixabay</Link>
          <Logout />
          <Upload />
          <Catagory />
        </div>
      )}
    </div>
  );
}

export default Home;
