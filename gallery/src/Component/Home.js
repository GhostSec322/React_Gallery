import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import Catagory from "./Catagory";
import Upload from "./Upload";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./Pixabay.css";
import module from "../api/Axios";

function BannerImg() {
  const [image, setImage] = useState("");

  useEffect(() => {
    const getRandom = (min, max) =>
      Math.floor(Math.random() * (max - min) + min);
    const imgNumber = getRandom(0, 10);

    const fetchRandomImages = async () => {
      try {
        const response = await module.get();
        setImage(response.data.hits[imgNumber].webformatURL);
      } catch (error) {
        console.error("Error fetching random image: ", error);
      }
    };

    fetchRandomImages();
  }, []);

  return <img src={image} alt="loading" />;
}

function Home() {
  const [scrollPosition, setScrollPosition] = useState(0); // scrollPosition 상태 정의
  const keyValueDict = useSelector((state) => state.keyValueDict);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      if (!user) {
        navigate("/"); // '/'로 이동
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("keyValueDict", JSON.stringify(keyValueDict));
    }
  }, [keyValueDict, isLoggedIn]);

  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const UploadPopup = isPopupOpen && (
    <div>
      <div className="overlay" onClick={closePopup}></div>
      <div className="UploadPopup">
        <Upload />
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
          <div className="icons">
            <Link to="/Mypage" className="link">
              Mypage
            </Link>
            <Link to="/" className="link">
              Go to Pixabay
            </Link>
            <Logout />
            <button className="uploadButton" onClick={() => openPopup()}>
              업로드
            </button>
            {UploadPopup}
          </div>
        </div>
        <div className="banner">
          <BannerImg />
        </div>
      </div>
      <div className="noneApi">
        <Catagory />
      </div>
    </div>
  );
}

export default Home;
