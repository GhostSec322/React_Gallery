import Logout from "./Logout";
import Catagory from "./Catagory";
import Upload from "./Upload";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import module from "../api/Axios";
import { useState, useEffect } from "react";
import './Pixabay.css'

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

      {/* 이미지 팝업 */}
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


  console.log("Redux State: ", keyValueDict);

  return (
      <div className="setBackground">
        
      <div className="apiArea">
        <div
          className={scrollPosition > 30 ? "scroll-color" : "scrolled-color"}
          id="topMenuBar"
        >
          <div className="icons">
              <div className="icons">
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
