import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import Catagory from "./Catagory";
import Upload from "./Upload";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './Pixabay.css'
import module from "../api/Axios";


function BannerImg() {
  const [images, setImages] = useState([]);
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

  useEffect(() => {
    const imgNumber = getRandom(0, 10);
    const fetchRandomImages = async () => {
      const response = await module.get();
      setImages(response.data.hits[imgNumber].webformatURL);
    };
    fetchRandomImages();
  }, []);

  return <img src={images} alt="loading" />;
}


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

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const UploadPopup = isPopupOpen && (
    <div>
      {/* 어두운 배경 */}
      <div className="overlay" onClick={closePopup}></div>

      {/* 업로드창 팝업 */}
      <div className="UploadPopup">
      <Upload/>
      </div>
    </div>
  );

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  }, []);

  return (
    <div className="setBackground">
        
      <div className="apiArea">
        <div
          className={scrollPosition > 30 ? "scroll-color" : "scrolled-color"}
          id="topMenuBar"
        >
          <div className="icons">
              <div className="icons">
                <Link to="/Mypage" className="link">Mypage</Link>
                <Link to="/" className="link">Go to Pixabay</Link>
                <Logout />
                <button className="uploadButton" onClick={() => openPopup()}>업로드</button>
                {UploadPopup}
              </div>
          </div>
        </div>

        {/* api연동 그림 영역 */}
        <div className="banner">
          <BannerImg></BannerImg>
        </div>

      </div>

      <div className="noneApi">
          <Catagory />
      </div>
    </div>
  );
}

export default Home;
