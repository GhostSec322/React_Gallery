import { useState,useEffect } from "react";
import module from '../api/Axios'
import { FaDownload } from "react-icons/fa6";

function CreateImg(props) {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지
    const [isPopupOpen, setPopupOpen] = useState(false); // 팝업 상태
  
    const openPopup = (image) => {
      // 팝업이 열렸을때 처리하는 로직
      setSelectedImage(image);
      setPopupOpen(true);
    };
  
    const closePopup = () => {
      // 팝업이 닫혔을때 처리하는 로직
      setPopupOpen(false);
    };
  
    useEffect(() => {
      //Pixabayapi에서 이미지를 불러오는 로직
      const fetchRandomImages = async () => {
        try {
          const response = await module.get("", {
            params: {
              q: props.query,
            },
          });
          setImages(response.data.hits);
        } catch (error) {
          console.error("이미지를 불러오는데 실패했습니다");
        }
      };
      fetchRandomImages();
    }, [props.query]);
  
    const downloadImage = () => {
      // 이미지 다운로드 로직
      if (selectedImage) {
        // 이미지 URL을 Blob으로 변환
        fetch(selectedImage.largeImageURL)
          .then((response) => response.blob())
          .then((blob) => {
            // Blob을 다운로드할 수 있는 링크 생성
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "image.jpg"); // 다운로드될 파일의 이름
            document.body.appendChild(link);
            link.click();
  
            // 다운로드 후에는 링크와 Blob 객체를 제거
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
          })
          .catch((error) =>
            console.error("이미지 다운로드에 실패했습니다", error)
          );
      }
    };
  
    const img = images.map(
      (
        image // 이미지를 화면 출력 로직
      ) => (
        <div className="img" key={image.id}>
          <img
            src={image.largeImageURL}
            alt="loading"
            onClick={() => openPopup(image)}
          />
        </div>
      )
    );
  
    const popup = isPopupOpen && (
      <div>
        <div className="overlay" onClick={closePopup}></div>
  
        {/* 이미지 팝업 */}
        <div className="popup">
          {selectedImage && (
            <>
              <div className="popupImg">
                <img src={selectedImage.largeImageURL} alt="popup" />
              </div>
              <button className="download-button" onClick={downloadImage}>
                DownLoad <FaDownload></FaDownload>
              </button>
            </>
          )}
        </div>
      </div>
    );
  
    return (
      <>
        <div className="imgArea">{img}</div>
        {popup}
      </>
    );
  }

  export default CreateImg;