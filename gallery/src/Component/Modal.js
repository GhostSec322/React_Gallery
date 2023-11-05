// Modal.js
import React from "react";

const Modal = ({ closeModal, children }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        {children}
      </div>
      <button
        onClick={closeModal}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        닫기
      </button>
    </div>
  );
};

export default Modal;
