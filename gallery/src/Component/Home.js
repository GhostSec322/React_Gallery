// Home.js
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Logout from "./Logout";
import Modal from "./Modal";
import UploadModal from "./UploadModal";

const Home = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // 사용자가 인증된 경우
        const { displayName, email, photoURL } = user;
        setUserProfile({ displayName, email, photoURL });
      } else {
        // 사용자가 인증되어 있지 않은 경우
        setUserProfile(null);
      }
    });
  }, []);

  const handleUpload = (event) => {
    // 업로드 처리 로직 추가
    // 이벤트에서 파일을 가져와서 처리할 수 있습니다.
    setSelectedImage(event.target.files[0]);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    closeModal();
  };

  return (
    <div>
      <h2>홈 화면</h2>
      {userProfile ? (
        <div>
          <p>안녕하세요, {userProfile.displayName}님!</p>
          {userProfile.photoURL && (
            <img
              src={userProfile.photoURL}
              alt="프로필 사진"
              style={{ width: "100px", height: "100px" }}
            />
          )}
        </div>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
      <button onClick={openModal}>이미지 업로드</button>
      <Logout />
      {showModal && (
        <UploadModal
          closeModal={closeModal}
          handleUpload={handleUpload}
          handleCategorySelect={handleCategorySelect}
        />
      )}
    </div>
  );
};

export default Home;
