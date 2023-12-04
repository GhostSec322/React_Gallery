import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readKeyValue, updateKeyValue } from "../store";
import { auth, db, storage } from "../config";
import { getDoc, doc, collection, setDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

function Mypage() {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(null);
  const keyValueDict = useSelector((state) => state.keyValueDict);
  const [selectedKey, setSelectedKey] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    dispatch(readKeyValue("id1"));
    dispatch(readKeyValue("id2"));
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user || null);
      if (user) {
        const userProfileData = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        setUserProfile(userProfileData);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleButtonClick = (key) => {
    setSelectedKey(key);
    setShowModal(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      if (!currentUser) throw new Error("User not authenticated.");

      const uid = currentUser.uid;
      const userDocRef = doc(collection(db, "users"), uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists())
        throw new Error("User document does not exist.");

      const userData = userDocSnap.data();
      if (!(selectedKey in userData)) {
        alert(`Selected key "${selectedKey}" does not exist.`);
      }

      const updatedUserData = { ...userData };
      delete updatedUserData[selectedKey];

      await setDoc(userDocRef, updatedUserData);

      const categoryPath = userData[selectedKey];
      const storageRef = ref(storage, categoryPath);

      const fileRef = storageRef.child(selectedKey); // 파일 참조 생성

      await deleteObject(fileRef).catch((error) => {
        if (error.code === "storage/object-not-found") {
          alert(`Object "${categoryPath}" does not exist.`);
        }
      });

      const updatedKeyValueDict = { ...keyValueDict };
      delete updatedKeyValueDict[selectedKey];

      dispatch(updateKeyValue(selectedKey, undefined));

      localStorage.setItem("keyValueDict", JSON.stringify(updatedKeyValueDict));

      alert(`Category "${selectedKey}" has been deleted.`);
      setSelectedKey(null);
      setShowModal(false);
      console.log("Updated Redux State:", updatedKeyValueDict);
    } catch (error) {
      console.error("Error deleting category:", error.message);
      alert(`Error deleting category: ${error.message}`);
    }
  };

  const handleCancel = () => {
    setSelectedKey(null);
    setShowModal(false);
  };

  return (
    <div>
      <h1>My Page</h1>
      {userProfile && (
        <div>
          <p>사용자 이름: {userProfile.displayName}</p>
          <p>이메일: {userProfile.email}</p>
          <img src={userProfile.photoURL} alt="프로필 사진" />
        </div>
      )}
      {Object.keys(keyValueDict).map((key) => (
        <button key={key} onClick={() => handleButtonClick(key)}>
          {key}
        </button>
      ))}
      {showModal && (
        <div className="modal">
          <p>
            "{selectedKey}" 카테고리를 삭제하시겠습니까?(삭제시 해당 이미지는
            모두 삭제 되며 복구가 불가능 합니다 이에 동의하시면 삭제버튼을
            누르세요)
          </p>
          <button onClick={handleDeleteConfirmation}>삭제</button>
          <button onClick={handleCancel}>취소</button>
        </div>
      )}
      <button>계정탈퇴</button>
    </div>
  );
}

export default Mypage;
