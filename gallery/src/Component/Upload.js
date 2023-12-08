import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useSelector } from "react-redux";
import "./Upload.css"

function Upload() {
  const [imageUrl, setImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0); // 업로드 진행 상황을 저장하는 상태
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedKey, setSelectedKey] = useState("");
  const storage = getStorage(); // Firebase Storage 인스턴스
  const keyValueDict = useSelector((state) => state.keyValueDict);

  const generateFilename = (originalFilename) => {
    const date = new Date();
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    const timeString = `${date.getHours().toString().padStart(2, "0")}${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}${date.getSeconds().toString().padStart(2, "0")}`;
    return `${dateString}_${timeString}_${originalFilename}`;
  };

  const handleChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleKeyChange = (event) => {
    setSelectedKey(event.target.value);
  };

  const handleUpload = () => {
    if (!selectedKey) {
      alert("카테고리를 선택해야 합니다.");
      return;
    }

    if (!selectedImage) {
      alert("이미지를 선택해야 합니다.");
      return;
    }

    const selectedValue = keyValueDict[selectedKey];
    if (!selectedValue) {
      alert("선택된 카테고리의 값이 없습니다.");
      return;
    }

    const storageRef = ref(
      storage,
      `${selectedValue}/${generateFilename(selectedImage.name)}` // 이미지파일 중복방지 로직 실행
    );
    const uploadTask = uploadBytesResumable(storageRef, selectedImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // 업로드 진행 상황 모니터링
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress); // 진행 상황 업데이트
      },
      (error) => {
        console.error("Error uploading image: ", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          // 이미지가 성공적으로 업로드되면 다운로드 URL을 얻을 수 있습니다.
          // 여기에서 다운로드 URL을 이용하여 필요한 작업을 수행할 수 있습니다.
          console.log("File available at", downloadURL);
          setImageUrl(downloadURL); // 다운로드 URL을 상태로 설정
        });
      }
    );
  };

  return (
    <div className='setUpload'>

      <div className='load'>
        <div className='preview'>
          {imageUrl && <img src={imageUrl} alt="Uploaded"></img>}
        </div>
        <progress className="progress" value={uploadProgress} max="100" /> {/* 프로그래스 바 */}
      </div>
      
      <div className='detail'>
        <select className="category" value={selectedKey} onChange={handleKeyChange}>
          <option value="">카테고리 선택</option>
          {Object.keys(keyValueDict).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        <div className='filebox'>
          <label for="select-file">이미지 선택</label>
          <input id="select-file" type="file" onChange={handleChange} />
        </div>
        
        <button className='upload-button' onClick={handleUpload}>Upload</button>
      </div>
      
    </div>
  );
}

export default Upload;
