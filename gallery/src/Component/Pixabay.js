import "./Pixabay.css";
import { useState, useEffect } from "react";
import { auth } from "./config";
import Login from "../Component/Login";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import BannerImg from "../api/BannerImg";
import CreateImg from "../api/CreateImg";


function Pixabay() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // user가 있는 경우 true, 없는 경우 false로 상태 설정
    });

    return () => unsubscribe();
  }, []);
  ///////
  /**useEffect(() => {
    setQuery("");
  }, [query]); <=무한 랜더링 현상에 빠질 수 있음 */


  ////////
  const handleInputChange = (e) => {
    setQuery(e.target.value); // input 값이 변경될 때마다 query 값을 업데이트
  };

  //스크롤 이벤트 제어
  useEffect(() => {
    // 스크롤 이벤트 리스너 추가
    const updateScroll = () => {
      setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    };

    window.addEventListener("scroll", updateScroll);
    // 컴포넌트가 마운트 해제될 때 스크롤 이벤트 리스너 정리
    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정


  let content = null;

  if (scrollPosition > 30) {
    content = (
      <div className="top-search">
        <input
          type="text"
          value={query}
          placeholder="태그로 검색"
          onChange={handleInputChange}
        />
      </div>
    );
  }

  return (
    <div className="setBackground">
      <div className="apiArea">
        <div
          className={scrollPosition > 30 ? "scroll-color" : "scrolled-color"}
          id="topMenuBar"
        >
        <div className={scrollPosition > 30 ? "scrolled-logo":"logo"}>
            Picture
        </div>
          {content}
            {isLoggedIn ? (
              <div className="icons">
                <Link className={scrollPosition > 30 ? "scrolled-link":"link"} to="/Home">Gallery</Link>
                <Logout scrollPosition={scrollPosition} />
              </div>
            ) : (
              <Login scrollPosition={scrollPosition}/>
            )}

          </div>
     
        {/* api연동 그림 영역 */}
     
          <BannerImg></BannerImg>
      
        
        <div className="search">

          <div className="info">

            <div className="title">
              Picture
            </div>

            <div className="body">
            Pixabay API에서 제공하는 무료 이미지를 검색하고 다운로드 하세요
            </div>
              
          </div>
                
          <input
            type="text"
            value={query}
            placeholder="태그로 검색"
            onChange={handleInputChange} // input 값이 변경될 때마다 query 값을 업데이트
          />

        </div>
      </div>

      <div className="noneApi">
        <CreateImg query={query}></CreateImg>
      </div>
    </div>
  );
}
export default Pixabay;
