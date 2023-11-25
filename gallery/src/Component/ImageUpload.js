import React, { useState } from 'react';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewImage(null);
    }
  };

  const handleCancel = () => {
    document.getElementById('file-input').value = ''; 
    setSelectedFile(null);
    setPreviewImage(null);
  };

  const handleUpload = () => {
    console.log('File uploaded:', selectedFile);
   
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {/* 파일 선택 */}
      <input
        id="file-input"
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        style={{ marginBottom: '20px' }}
      />

      {/* 선택된 이미지가 있을 때만 표시 */}
      {selectedFile && (
        <div>
          {/* 선택된 이미지 정보, 취소 버튼, 업로드 버튼 */}
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h4 style={{ marginRight: '10px' }}>Selected Image:</h4>
            <button onClick={handleCancel} style={{ marginRight: '10px' }}>
              Cancel
            </button>
            <span>{selectedFile.name}</span>
            <button onClick={handleUpload} style={{ marginLeft: '10px' }}>
              Upload
            </button>
          </div>

          {/* 이미지 미리보기 */}
          <div style={{ maxWidth: '100%', maxHeight: '300px', margin: 'auto' }}>
            <img src={previewImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
