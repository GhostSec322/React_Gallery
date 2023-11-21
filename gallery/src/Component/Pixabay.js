
import './Pixabay.css'
import Modal from 'react-modal'
import { useState, useEffect } from 'react';
import module from '../api/Axios'
import Login from '../Component/Login'

const modalStyles = {
  content:{
    
  },

  overlay: {
   zIndex: 10,
   position: 'absolute',
    top: '45%',
    left: '50%',
    width: '600px',
    height: '800px',
    transform: 'translate(-50%, -50%)',
    background: 'none',
   }
 };
 


 function CreateImg(){
  
  const [images, setImages] = useState([]); 
  
  
  useEffect(() => {
    
    const fetchRandomImages = async () => {
        const response = await module.get();
        setImages(response.data.hits);
    
    };
    fetchRandomImages();
  },[]);

  
  const img =images.map((e)=><div className='img' key={e.id} onClick={()=> 
    {setModalIsOpen(true);}}>
    <img src={e.webformatURL} alt='loading'></img>
    </div>);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return(
    <>
      <div className='imgArea'>   	
        {img} 
      </div>
      <Modal style={modalStyles} isOpen={modalIsOpen}  ariaHideApp={false} onRequestClose={() => setModalIsOpen(false)}>
      </Modal>
    </>
   ); 
 }

 

 function ProfileIcon(){
  return(
    <div className='bprofileIcon'></div>   
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

  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const [scrollPosition, setScrollPosition] = useState(0);

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
        <button id="uploadIcon" onClick={()=> setModalIsOpen(true)}>Upload</button>
         <Modal style={modalStyles} isOpen={modalIsOpen}  ariaHideApp={false}  onRequestClose={() => setModalIsOpen(false)}>
          <Modal>이미지를 업로드 하고 싶으시다면 로그인 해주세요</Modal>
         <Login/>
          
      </Modal> 
      </>
       
    </div>
    
    
  </div>
  
  {/* api연동 그림 영역 */}
   <div className="banner">
         <BannerImg></BannerImg>
   </div>
  
  <div className='search'>
    <input type='text' placeholder='태그로 검색'></input>
  </div>
  
  
</div>

<div className='noneApi'>
  <CreateImg></CreateImg>
</div>
</div>

  );
}
export default Pixabay;