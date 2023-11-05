// UploadModal.js
import React, { useState } from "react";
import Modal from "./Modal";

const UploadModal = ({ closeModal, handleUpload, handleCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCategorySelect(selectedCategory);
    closeModal();
  };

  return (
    <Modal closeModal={closeModal}>
      <h3>이미지를 업로드하세요</h3>
      <input type="file" onChange={handleUpload} />
      <h3>카테고리를 입력하세요</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={selectedCategory}
          onChange={handleCategoryChange}
        />
        <button type="submit">확인</button>
      </form>
      <button onClick={closeModal}>닫기</button>
    </Modal>
  );
};

export default UploadModal;
