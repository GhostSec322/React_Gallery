import Logout from "./Logout";
import './Home.css'
import Modal from 'react-modal'
import { useState, useEffect } from 'react';
import module from '../api/Axios'

const modalStyles = {

  overlay: {
   zIndex: 10,
   
   }
 };
 

 function CreateImg(props){
  const[id,setId]=useState(null);
  const img =props.imgInfo.map((e)=><div className='img' key={e.id} onClick={()=> 
    {setModalIsOpen(true);
    setId(e.id.toString());
    console.log(id);
    console.log(e);
  }}>
      {e.id}
      {e.title}
    </div>);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return(
    <>
      <div className='imgArea'>   	
        {img} 
      </div>
      <Modal style={modalStyles} isOpen={modalIsOpen}  ariaHideApp={false} onRequestClose={() => setModalIsOpen(false)}>
      <input value="delete" type='button' onClick={()=>{
       const newimg=[];
       for(let i=0; i<img.length; i++){
        if(img[i].key!==id){
          newimg.push(props.imgInfo[i]);
          console.log(newimg);
        }
       }
       props.setImgInfo(newimg);
       setModalIsOpen(false);
      }}>
      </input>
      </Modal>
    </>
   ); 
 }

 
 function Upload(props){
   return(<div className="uploadScreen">
 
    <form onSubmit={event=>{event.preventDefault();
       const title=event.target.title.value;
       const body=event.target.body.value;
       props.onCreate(title,body);
     }}>
      
         <div className="selectImg">
            <h2>이미지를 선택해 주세요</h2>
         </div>
      
       <p>
         <input type='text' name='title' placeholder='title'></input>
       </p>
       <p>
         <textarea name='body' placeholder='body'></textarea>
       </p>
       <p>
         <input type='submit' value='Create'></input>
       </p>
     </form> 
   </div>
   );
 }
 
 function ProfileIcon(){
  const [visible, setVisible] = useState(false);
  let content=null;

  if(visible===true){
   content=<div className="profileDetail"><Logout/></div>
  }
  return(
    <>
     <div className='profileIcon' onClick={()=>{ 
       setVisible(!visible)
       }}
     >
     </div>
     {content}     
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

function Home()
{
   const[id,setId]=useState(null);
  const [nextId, setNextId]=useState(1);
  const [imgInfo, setImgInfo]=useState([]); //imginfo를 조작하여 Div의 갯수를 조절한다.



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
          <Upload onCreate={(_title,_body)=>{
            const newImgInfo={id:nextId, title: _title, body: _body}
            const newImgInfos=[...imgInfo];
            newImgInfos.push(newImgInfo);
            setImgInfo(newImgInfos);
            setId(nextId);
            setNextId(nextId+1);
            setModalIsOpen(false);
           }}> 
          </Upload>
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
  <CreateImg id={id} imgInfo={imgInfo} setImgInfo={setImgInfo}></CreateImg>
</div>
</div>

  );
}
export default Home;