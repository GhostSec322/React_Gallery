import React, { useState } from 'react';
import '../CSS/modal.css'; // CSS 파일을 불러옵니다.

const Modal = () => {
  const type = ['image/png','image/jpeg'];
  const [error,setError]= useState(null);
  const [file,Setfile] =useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState('');
  
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCategory(''); // 모달이 닫힐 때 카테고리 초기화
    Setfile(''); // 모달이 닫힐때 이미지 초기화
  };

  const handleFileUpload = (event) => {
    console.log('파일 업로드:', event.target.files);
    console.log('선택된 카테고리:', category);
    let selected = event.target.files[0];
    if (selected && type.includes(selected.type)){ // 파일이 선택되었다면 True  아니면 false;
        Setfile(selected);
        
    }else{
        Setfile(null);
        alert("png와 jpeg 확장자만 업로드 가능합니다.");
        setError('png와 jpeg 확장자만 업로드 가능합니다.');
    }

  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <button onClick={openModal}>파일 업로드</button>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
           
            <form>
           
            <h2>파일 업로드</h2>
            <input
              type="text"
              placeholder="카테고리 입력"
              value={category}
              onChange={handleCategoryChange}
            />
            <input
              type="file"
              onChange={handleFileUpload}
            />
            <div className='output'>
              {error && <div className='error'>{error}</div>}
           
            </div>
            {file && (
              <div className="image-preview">
                 <img
                  src={URL.createObjectURL(file)}
                  alt="Uploaded Preview"
                  style={{ maxWidth: '500px', maxHeight: '500px' }}
                />
              </div>
            )}
            
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Modal;
