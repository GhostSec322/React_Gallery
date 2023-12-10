import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db, storage } from "../config";
import { getDoc, doc, collection, setDoc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject, listAll } from "firebase/storage";
import { readKeyValue, updateKeyValue } from "../store";
import "./Mypage.css"
import module from "../../api/Axios"
import { Link } from "react-router-dom";

function BannerImg() {
  const [images, setImages] = useState([]);
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

  useEffect(() => {
    const imgNumber = getRandom(0, 10);
    const fetchRandomImages = async () => {
      const response = await module.get();
      setImages(response.data.hits[imgNumber].webformatURL);
    };
    fetchRandomImages();
  }, []);

  return <img src={images} alt="loading" />;
}

function Mypage() {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(null);
  const keyValueDict = useSelector((state) => state.keyValueDict);
  const [selectedKey, setSelectedKey] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const [updatedKeyValueDict, setUpdatedKeyValueDict] = useState({});
  const [categoryPath, setCategoryPath] = useState(null);
  const handleDeleteFolder = async (folderPath) => {
    try {
      const listRef = ref(storage, folderPath);
      const listResult = await listAll(listRef);

      // Check if the folder is empty
      if (listResult.items.length === 0 && listResult.prefixes.length === 0) {
        console.log(`Folder ${folderPath} is empty.`);
        return; // If empty, do not delete the folder
      }

      // Delete files in the folder
      const deleteFilePromises = listResult.items.map(async (item) => {
        await deleteObject(item);
        console.log(`File ${item.name} deleted successfully.`);
      });

      await Promise.all(deleteFilePromises);
      console.log("All files inside the folder deleted.");

      // Delete the folder itself
      await deleteObject(ref(storage, folderPath));
      console.log(`Folder ${folderPath} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting folder and files:", error.message);
      //   alert(`Error deleting folder and files: ${error.message}`);
    }
  };
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

  const handleCancel = () => {
    setSelectedKey(null);
    setShowModal(false);
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
        throw new Error(`Selected key "${selectedKey}" does not exist.`);
      }

      const updatedUserData = { ...userData };
      delete updatedUserData[selectedKey];

      await setDoc(userDocRef, updatedUserData);

      const categoryPath = userData[selectedKey];

      setUpdatedKeyValueDict({ ...keyValueDict });
      delete updatedKeyValueDict[selectedKey];
      localStorage.setItem("keyValueDict", JSON.stringify(updatedKeyValueDict));

      alert(`Category "${selectedKey}" has been deleted.`);
      setSelectedKey(null);
      setShowModal(false);
      console.log("Updated Redux State:", updatedKeyValueDict);

      await handleDeleteFolder(categoryPath);

      dispatch(updateKeyValue(selectedKey, undefined));
    } catch (error) {
      console.error("Error deleting category:", error.message);
      // alert(`Error deleting category: ${error.message}`);

      const updatedKeyValueDict = { ...keyValueDict };
      delete updatedKeyValueDict[selectedKey];

      dispatch(updateKeyValue(selectedKey, undefined));
      localStorage.setItem("keyValueDict", JSON.stringify(updatedKeyValueDict));

      console.error(
        `Failed to delete folder "${selectedKey}" from Firebase Storage.`
      );
      console.error("Firebase Storage Error:", error);
    } finally {
      console.log("Executing remaining logic...");

      setSelectedKey(null);
      setShowModal(false);
      console.log("Updated Redux State:", updatedKeyValueDict);

      await handleDeleteFolder(categoryPath);

      dispatch(updateKeyValue(selectedKey, undefined));
    }
  };

  const handleAccountDeletion = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        if (!currentUser) throw new Error("User not authenticated.");

        const uid = currentUser.uid;

        const userImagesRef = ref(storage, `users/${uid}/`);
        const listResult = await listAll(userImagesRef);

        // 모든 디렉터리를 순회합니다
        for (const dirRef of listResult.prefixes) {
          // 디렉터리 내의 모든 파일 및 폴더를 삭제합니다
          await handleDeleteFolder(dirRef.fullPath);
        }

        // 사용자 이미지 디렉터리도 추가로 확인합니다
        await handleDeleteFolder(userImagesRef.fullPath);

        // Firestore에서 사용자 문서를 삭제합니다
        const userDocRef = doc(collection(db, "users"), uid);
        await deleteDoc(userDocRef);

        // Firebase 인증에서 사용자 삭제합니다
        await currentUser.delete();

        localStorage.clear();
        auth.signOut();

        alert("계정 탈퇴가 완료되었습니다.");
        window.location.href = "/"; // 리다이렉트할 경로 입력
      } catch (error) {
        console.error("Error deleting account:", error.message);
        //  alert(`Error deleting account: ${error.message}`);
      }
    }
  };

  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  }, []);


  const closePopup = () => {
    // 팝업이 닫혔을때 처리하는 로직
    setShowModal(false);
  };

  return (
    
<div className="setBackground">
        
        <div className="MyapiArea">
          <div
            className={scrollPosition > 30 ? "scroll-color" : "scrolled-color"}
            id="topMenuBar"
          >
            <div className="icons">
                <div className="icons">
                <Link className="link" to="/Home">Go to Gallery</Link>
                </div>
            </div>
          </div>
  
          {/* api연동 그림 영역 */}
          <div className="banner">
            <BannerImg></BannerImg>
          </div>
        </div>

        <div className="userData">
         {userProfile && (
          <div>
            <div className="photoArea" style={{ zIndex: 2 }}>
              <img src={userProfile.photoURL} alt="프로필 사진" />
            </div>
            
            <p>사용자 이름: {userProfile.displayName}</p>
            <p>이메일: {userProfile.email}</p>
            <button onClick={handleAccountDeletion}>계정탈퇴</button>
          </div>
        )}

        <div className="profileData">
          <div className="catagoryArea">
            <p>생성한 카테고리</p>
            {Object.keys(keyValueDict).map((key) => (
            <button className="catagory" key={key} onClick={() => handleButtonClick(key)}>
              {key}
            </button>
          ))}
          </div>
     
          {showModal && (
            <div className="overlay" onClick={closePopup} style={{ zIndex: 1000}}>
              <div className="modal" style={{ zIndex: 999}}>
                <p>
                  "{selectedKey}" 카테고리를 삭제하시겠습니까?{<br></br>} (삭제시 해당 이미지는
                   모두 삭제 되며 복구가 불가능 합니다 이에 동의하시면 삭제버튼을
                   누르세요)
                </p>
                <div className="modalButtonArea">
                  <button className="agree" onClick={handleDeleteConfirmation}>삭제</button>
                  <button className="disAgree" onClick={handleCancel}>취소</button>
                </div>
                
              </div>
            </div>
            
          )}

          
        </div>

        </div>

      </div>
  );
}

export default Mypage;