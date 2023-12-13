import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useSelector } from "react-redux";
import "./Upload.css";

function Upload() {
  const [imageUrl, setImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedKey, setSelectedKey] = useState("");
  const storage = getStorage();
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
    if (!selectedKey || !selectedImage || !keyValueDict[selectedKey]) {
      alert("카테고리나 이미지를 선택해야 합니다.");
      return;
    }

    const selectedValue = keyValueDict[selectedKey];
    const storageRef = ref(
      storage,
      `${selectedValue}/${generateFilename(selectedImage.name)}`
    );
    const uploadTask = uploadBytesResumable(storageRef, selectedImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("이미지 업로드 에러: ", error);
        alert("이미지 업로드 중 오류가 발생했습니다.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          window.location.href = "/home"; // 업로드 완료 후 홈 경로로 이동
        });
      }
    );
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setSelectedImage(droppedFile);
  };

  return (
    <div className="setUpload">
      <div className="detail">
        <select
          className="category"
          value={selectedKey}
          onChange={handleKeyChange}
        >
          <option value="">카테고리 선택</option>
          {Object.keys(keyValueDict).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>

        <div
          className="dragArea"
          style={
            selectedImage ? { backgroundColor: "rgba(240, 134, 134,0.3" } : {}
          }
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="filebox">
            <label htmlFor="select-file">이미지 선택</label>
            <p
              style={
                selectedImage ? { fontWeight: "bold", fontSize: "20px" } : {}
              }
            >
              {selectedImage
                ? "이미지가 선택되었습니다"
                : "이미지를 선택하거나 드래그 해 주세요"}
            </p>
            <input id="select-file" type="file" onChange={handleChange} />
          </div>
        </div>

        {selectedImage && (
          <div className="fileInfo">
            <p>{selectedImage.name}</p>
            <progress className="progress" value={uploadProgress} max="100" />
            {uploadProgress === 100 && (
              <div className="uploadComplete">
                <p>완료</p>
              </div>
            )}
          </div>
        )}

        <button className="upload-button" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
}

export default Upload;
