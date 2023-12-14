import { useState, useEffect } from "react";
import module from "../api/Axios";
import { FaDownload } from "react-icons/fa6";

function CreateImg(props) {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지
  const [isPopupOpen, setPopupOpen] = useState(false); // 팝업 상태
  const [img, setImg] = useState([]); // 이미지 출력을 위한 상태

  const openPopup = (image) => {
    setSelectedImage(image);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  useEffect(() => {
    const fetchRandomImages = async () => {
      try {
        const response = await module.get("", {
          params: {
            q: props.query,
            per_page: props.page,
          },
        });
        setImages(response.data.hits);
      } catch (error) {
        console.error("이미지를 불러오는데 실패했습니다");
      }
    };
    fetchRandomImages();
  }, [props.query, props.page]);

  useEffect(() => {
    // images 상태가 변경될 때마다 이미지를 업데이트합니다.
    const updatedImg = images.map((image) => (
      <div className="img" key={image.id}>
        <img
          src={image.largeImageURL}
          alt="loading"
          onClick={() => openPopup(image)}
        />
      </div>
    ));

    // 업데이트된 이미지를 상태에 반영하여 다시 렌더링합니다.
    setImg(updatedImg);
  }, [images]);

  const downloadImage = () => {
    if (selectedImage) {
      fetch(selectedImage.largeImageURL)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.jpg");
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch((error) =>
          console.error("이미지 다운로드에 실패했습니다", error)
        );
    }
  };

  const popup = isPopupOpen && (
    <div>
      <div className="overlay" onClick={closePopup}></div>
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
      {img}
      {popup}
    </>
  );
}

export default CreateImg;
