
import './Pixabay.css'
import { useState, useEffect } from 'react';
import module from '../api/Axios'
import Login from '../Component/Login'
import { FaDownload } from "react-icons/fa6";
  
 function CreateImg(props){
  
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = (image) => {
    setSelectedImage(image);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

import React, { useState, useEffect } from 'react';
import { fetchRandomImages, searchImages } from '../api/Axios';
import ImageList from './ImageList';
import Login from './Login';

const Pixabay = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchImages = async () => {
      try {

        const response = await module.get('', {
          params: {
            q: props.query,
          },
        });
        setImages(response.data.hits);
      } catch (error) {
        console.error('이미지를 불러오는데 실패했습니다');
      }
    };
    fetchRandomImages();
  }, [props.query]);

        setLoading(true);
        const result = await fetchRandomImages();
        setImages(result);
      } catch (error) {
        // Handle errors
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      const result = await searchImages(query);
      setImages(result);
    } catch (error) {
      // Handle errors
    } finally {
      setLoading(false);
    }
  };


  const downloadImage = () => {
    if (selectedImage) {
      // 이미지 URL을 Blob으로 변환
      fetch(selectedImage.largeImageURL)
        .then((response) => response.blob())
        .then((blob) => {
          // Blob을 다운로드할 수 있는 링크 생성
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'image.jpg'); // 다운로드될 파일의 이름
          document.body.appendChild(link);
          link.click();

          // 다운로드 후에는 링크와 Blob 객체를 제거
          link.parentNode.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => console.error('이미지 다운로드에 실패했습니다', error));
    }
  };

  const img = images.map((image) => (
    <div className='img' key={image.id}>
      <img src={image.largeImageURL} alt='loading' onClick={() => openPopup(image)} />
    </div>
  ));

  const popup = isPopupOpen && (
    <div>
      {/* 어두운 배경 */}
      <div className="overlay" onClick={closePopup}></div>

      {/* 이미지 팝업 */}
      <div className="popup">
        {selectedImage && (
          <> 
            <div className='popupImg'>
              <img src={selectedImage.largeImageURL} alt='popup' />
            </div>
            <button className='download-button' onClick={downloadImage}>DownLoad <FaDownload></FaDownload></button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className='imgArea'>
        {img}
      </div>
      {popup}
    </>
  );
};
 

 
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
  const [query, setQuery]=useState('');

  useEffect(() => {setQuery('');}, []);//무한 랜더링 방지

  const handleInputChange = (e) => {
    setQuery(e.target.value); // input 값이 변경될 때마다 query 값을 업데이트
  };


  //스크롤 이벤트 제어
  const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    };

  useEffect(() => {
        window.addEventListener("scroll", updateScroll);
    }, []);

    let content=null;

    if(scrollPosition>30){
      content=<div className='top-search'>
        <input type='text'
            value={query}
            placeholder='태그로 검색'
            onChange={handleInputChange}/>
      </div>

    }



   return (
    <div className='setBackground'>
    
      <div className='apiArea'>

        <div className={scrollPosition > 30 ? "scroll-color" : "scrolled-color"} id='topMenuBar'>
          {content}
          <div className="icons">
            <Login/>
          </div>
        </div>
  
      {/* api연동 그림 영역 */}
        <div className="banner">
          <BannerImg></BannerImg>
        </div>
  
        <div className='search'>
          <input
            type='text'
            value={query}
            placeholder='태그로 검색'
            onChange={handleInputChange} // input 값이 변경될 때마다 query 값을 업데이트
          />
        </div>
  

      {loading && <p>Loading...</p>}
      <div>
        <ImageList images={images} onImageClick={handleImageClick} />

      </div>

        <div className='noneApi'>
          <CreateImg query={query}></CreateImg>
        </div>


</div>

  );
}

      )}
      <Login />
    </div>
  );
};


export default Pixabay;