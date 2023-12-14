import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import Catagory from "./Catagory";
import Upload from "./Upload";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./Pixabay.css";
import BannerImg from "../api/BannerImg";
import { MdOutlineExpandMore } from "react-icons/md";
import { MdUpload } from "react-icons/md";

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
        <Upload />
      </div>
    </div>
  );

  //메뉴 더보기 팝업

  const [isMenuPopupOpen, setMenuPopupOpen] = useState(false);

  const openMunuPopup = () => {
    setMenuPopupOpen(true);
  };

  const closeMenuPopup = () => {
    setMenuPopupOpen(false);
  };

  const menuPopup = isMenuPopupOpen && (
    <div>
      {/* 어두운 배경 */}
      <div className="menuBack" onClick={closeMenuPopup}></div>

      {/* 업로드창 팝업 */}
      <div className="menuPopup">
        <Link to="/Mypage" className="menuBtn">
          Mypage
        </Link>
        <Link to="/" className="menuBtn">
          Picture
        </Link>
        <Logout />
      </div>
    </div>
  );

  useEffect(() => {
    const updateScroll = () => {
      setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    };

    window.addEventListener("scroll", updateScroll);

    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return (
    <div className="setBackground">
        
      <div className="apiArea">
        <div
          className={scrollPosition > 30 ? "scroll-color" : "scrolled-color"}
          id="topMenuBar"
        >
          <div className={scrollPosition > 30 ? "scrolled-logo":"logo"}>
            Gallery
        </div>
              <div className="icons">
                <button 
                  style={isMenuPopupOpen ? { backgroundColor: 'rgba(173, 173, 173, 0.356)' } : {}}
                  className={scrollPosition > 30 ? "scrolled-more":"more"}  onClick={()=>openMunuPopup()}>더보기<MdOutlineExpandMore className="moreIcon" size="20px" /></button>
                <button className="uploadButton" onClick={() => openPopup()}> <MdUpload className="uploadIcon" />업로드</button>
                {UploadPopup}
                {menuPopup}
              </div>
          
        </div>

        {/* api연동 그림 영역 */}
     
          <BannerImg></BannerImg>
     

        <div className="search">

          <div className="info">
            <div className="title">
              Gallery
            </div>
            <div className="body">
            여러분의 사진을 카테고리 별로 분류하고 저장하세요 
            </div>  
          </div>
          
        </div>

      </div>

      <div className="noneApi">
          <Catagory />
      </div>
    </div>
  );
}

export default Home;
