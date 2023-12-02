import React from "react";

const Modal = ({ selectedFileName, selectedCategory, closeModal }) => {
  const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
  };

  return (
    <div style={modalStyle}>
      <span
        style={{
          position: "absolute",
          top: "10px",
          right: "15px",
          cursor: "pointer",
          fontSize: "24px",
        }}
        onClick={closeModal}
      >
        &times;
      </span>
      <h2>Selected File Info</h2>
      <img
        src={selectedFileName}
        alt="Selected Image"
        style={{ maxWidth: "100%", maxHeight: "400px" }}
      />
      <p>Selected Category: {selectedCategory}</p>
    </div>
  );
};

export default Modal;
