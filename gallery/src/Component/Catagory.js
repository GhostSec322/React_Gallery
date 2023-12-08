import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { auth, db } from "./config";
import { useDispatch } from "react-redux";
import { updateKeyValue } from "./store";
import { useSelector } from "react-redux";

function Category() {
  const [buttonRenderKey, setButtonRenderKey] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [userKeys, setUserKeys] = useState([]);
  const [userValues, setUserValues] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedCatagory, setSelectCatagory] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
  };
  useEffect(() => {
    // 사용자 인증 로직
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  const handleImageDelete = async (fileName) => {
    try {
      const uid = currentUser.uid;
      const storage = getStorage();
      const imageRef = ref(
        storage,
        `users/${uid}/${selectedCatagory}/${fileName}`
      );
      await deleteObject(imageRef);
      console.log("Image deleted successfully!");
      setIsModalOpen(false);

      handleButtonClick(selectedCatagory);
    } catch (error) {
      console.error("Error deleting image: ", error);
    }
  };

  const handleImageClick = async (fileName, category) => {
    try {
      setSelectedFileName(fileName);
      setSelectCatagory(category);
      const uid = currentUser.uid;
      const storage = getStorage();
      const imageRef = ref(storage, `users/${uid}/${category}/${fileName}`);
      const downloadURL = await getDownloadURL(imageRef);
      setSelectedImage(downloadURL);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error loading image: ", error);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    console.log("Selected File Name:", selectedFileName);
  }, [selectedFileName]);

  useEffect(() => {
    console.log("Selected Catagory Name:", selectedCatagory);
  }, [selectedCatagory]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (currentUser) {
          const uid = currentUser.uid;
          const userDocRef = doc(db, "users", uid);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setUserValues(userData || {});
            const keys = Object.keys(userData || {});
            setUserKeys(keys);

            // Redux로 상태 업데이트
            Object.keys(userData).forEach((key) => {
              dispatch(updateKeyValue(key, userData[key]));
            });
          } else {
            console.log("User document does not exist.");
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, [currentUser, dispatch]);

  const handleButtonClick = async (key) => {
    try {
      setSelectCatagory(key);
      const uid = currentUser.uid;
      const storage = getStorage();
      const storageRef = ref(storage, `users/${uid}/${key}`);
      const fileRefs = await listAll(storageRef);
      const imageContainer = document.getElementById("image-container");
      imageContainer.innerHTML = "";

      fileRefs.items.forEach(async (fileRef) => {
        try {
          const downloadURL = await getDownloadURL(fileRef);
          const img = new Image();
          img.src = downloadURL;
          img.alt = "Resized Image";
          img.style.width = "500px";
          img.style.height = "auto";

          const fileName = fileRef.name; // 파일명 가져오기

          const imgDiv = document.createElement("div");

          const imgName = document.createElement("p");
          imgName.textContent = `File Name: ${fileName}`; // 파일명 출력

          imgDiv.appendChild(imgName);
          imgDiv.appendChild(img);
          imgDiv.addEventListener("click", () =>
            handleImageClick(fileName, key)
          ); // 클릭 이벤트 수정
          imageContainer.appendChild(imgDiv);
        } catch (error) {
          console.error("이미지를 불러오는 중 오류 발생:", error);
        }
      });
    } catch (error) {
      console.error("파일 목록을 불러오는 중 오류 발생:", error);
    }
  };
  const handleCreateClick = async () => {
    try {
      const uid = currentUser.uid;
      const docRef = doc(db, `users/${uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (!userData[inputValue]) {
          await updateDoc(docRef, {
            [inputValue]: `/users/${uid}/${inputValue}`,
          });
          console.log("Category saved to Firestore successfully!");
        } else {
          console.log("Category already exists in Firestore!");
        }
      } else {
        await setDoc(docRef, { [inputValue]: `/users/${uid}/${inputValue}` });
        console.log("Category saved to Firestore successfully!");
      }

      const storage = getStorage();
      const storageRef = ref(storage, `users/${uid}/${inputValue}`);
      // 파일 업로드 또는 기타 작업 수행
      console.log("File created successfully!");

      // 파일 생성 성공 후 홈으로 라우팅
    } catch (error) {
      console.error("Error creating file: ", error);
    }
  };

  const renderButtons = () => {
    return (
      <div key={buttonRenderKey}>
        {" "}
        {/* 키를 변경하여 새로 렌더링 */}
        {userKeys.map((key) => (
          <button key={key} onClick={() => handleButtonClick(key)}>
            {key}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleCreateClick}>생성</button>
      {/* 이미지를 담을 컨테이너 */}
      {renderButtons()}
      <div id="image-container"></div>
      {isModalOpen && (
        <div style={modalStyle}>
          <span style={closeButtonStyle} onClick={closeModal}>
            &times;
          </span>
          <h2>Selected File Info</h2>
          <button onClick={() => handleImageDelete(selectedFileName)}>
            Delete
          </button>
          <p>Selected File Name: {selectedFileName}</p>
          <p>Selected Category: {selectedCatagory}</p>

          {/* 이미지를 모달에 출력 */}

          <img
            src={selectedImage}
            alt="Selected"
            style={{ width: "500px", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
}

export default Category;
