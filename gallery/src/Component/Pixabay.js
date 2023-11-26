
import './Pixabay.css'
import { useState, useEffect } from 'react';
import module from '../api/Axios'
import Login from '../Component/Login'


 function CreateImg(){
  
  const [images, setImages] = useState([]); 
  
  useEffect(() => {
    
    const fetchRandomImages = async () => {
        const response = await module.get();
        setImages(response.data.hits);
    
    };
    fetchRandomImages();
  },[]);

  
  const img =images.map((e)=><div className='img' key={e.id}>
    <img src={e.webformatURL} alt='loading'></img>
    </div>);

  

  return(
    <>
      <div className='imgArea'>   	
        {img} 
      </div>
     
    </>
   ); 
 }

 

 function ProfileIcon(){

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
    document.body.style.overflow = 'hidden'; // 팝업이 나타날 때 body 스크롤을 막음
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = 'visible'; // 팝업이 닫힐 때 body 스크롤을 다시 허용
  };
  

  return(
    <>
    <button className='bprofileIcon' onClick={openPopup}>Login</button>   
    {isPopupOpen && (
          <>
            <div className="overlay" onClick={closePopup}></div>
              <div className="login-popup">
                <div className="login-popup-content">
                  <div className='login-top'>이미지를 업로드 하려면 로그인하세요</div>
                   <Login/>
              </div>
            </div>
          </> 
      )}
    </>
    
  );
 }

 
 function BannerImg(){
   const [images, setImages] = useState([]); 
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
  
  useEffect(() => {
    
    const imgNumber=getRandom(0,10);

    const fetchRandomImages = async () => {
        const response = await module.get();
        setImages(response.data.hits[imgNumber].webformatURL);
    
    };
    fetchRandomImages();
  },[]);

  return (
  
        <img src={images} alt='loading' />
     
        
);
 }

function Pixabay()
{
  
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
    document.body.style.overflow = 'hidden'; // 팝업이 나타날 때 body 스크롤을 막음
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = 'visible'; // 팝업이 닫힐 때 body 스크롤을 다시 허용
  };
  

  const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    };

  useEffect(() => {
        window.addEventListener("scroll", updateScroll);
    }, []);

    let content=null;

    if(scrollPosition>30){
      content=<div className='top-search'>
        <input type='text' placeholder='태그로 검색'></input>
      </div>
    }

   return (


<div className='setBackground'>

<div className='apiArea'>

  <div className={scrollPosition > 30 ? "scroll-color" : "scrolled-color"} id='topMenuBar'>
    {content}
    <div className="icons">
      <ProfileIcon></ProfileIcon>
      <>    
        <button id="uploadIcon" onClick={openPopup}>Upload</button>
        {isPopupOpen && (
          <>
            <div className="overlay" onClick={closePopup}></div>
              <div className="login-popup">
                <div className="login-popup-content">
                  <div className='login-top'>이미지를 업로드 하려면 로그인하세요</div>
                   <Login/>
              </div>
            </div>
          </> 
      )}
         
      </>
       
    </div>
    
  </div>
  
  {/* api연동 그림 영역 */}
   <div className="banner">
         <BannerImg></BannerImg>
   </div>
  
  <div className='search'>
    <input   
      type="text"
      placeholder='태그로 검색'/>
      
  </div>
  
  
</div>

<div className='noneApi'>
  <CreateImg></CreateImg>
</div>

</div>

  );
}
export default Pixabay;