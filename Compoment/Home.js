import Logout from "./Logout";
import "./Home.css"
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Pixabay from "./Pixabay";

function CreateImg(props){
   const lis=props.imgInfo.map((e)=><div className='img' key={e.id}>{e.title}</div>);
 
   const [modalIsOpen, setModalIsOpen] = useState(false);
 
   return(
     <>
       <div className='imgArea' onClick={()=> setModalIsOpen(true)}>   	
         {lis} 
       </div>
       <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
          Img Info
       </Modal>
     </>
   ); 
 }
  
 
 function Upload(props){
   return<article>
 <h2>이미지를 선택해 주세요</h2>
    <form onSubmit={event=>{event.preventDefault();
       const title=event.target.title.value;
       const body=event.target.body.value;
       props.onCreate(title,body);
     }}>
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
 
   </article>
 }

function Home()
{
   const[id,setId]=useState(null);
  const [nextId, setNextId]=useState(1);
  const [imgInfo, setImgInfo]=useState([
  ]);

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
      
        <div className='profileIcon'></div>
        <Logout/>
          <button id="uploadIcon" onClick={()=> setModalIsOpen(true)}>Upload</button>
	          <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
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
      </div>

      {/* api연동 그림 영역 */}

      <Pixabay>
        <div className='search'>
          <input type='text' placeholder='태그로 검색'></input>
        </div>
      </Pixabay>

    </div>

    <div className='noneApi'>
      <CreateImg id={id} imgInfo={imgInfo}></CreateImg>
    </div>
  </div>
    
   );
}
export default Home;