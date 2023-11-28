import { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, listAll, getDownloadURL  } from 'firebase/storage';
import { auth, db } from './config';
import { useDispatch } from 'react-redux';
import { updateKeyValue } from './store';
import { useSelector } from 'react-redux';


function Category() {
  const [buttonRenderKey, setButtonRenderKey] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [userKeys, setUserKeys] = useState([]);
  const [userValues, setUserValues] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (currentUser) {
          const uid = currentUser.uid;
          const userDocRef = doc(db, 'users', uid);
          const userDocSnapshot = await getDoc(userDocRef);
  
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setUserValues(userData || {});
            const keys = Object.keys(userData || {});
            setUserKeys(keys);
  
            // Redux로 상태 업데이트
            Object.keys(userData).forEach(key => {
              dispatch(updateKeyValue(key, userData[key]));
            });
          } else {
            console.log('User document does not exist.');
          }
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };
  
    fetchUserData();
  }, [currentUser, dispatch]);

  const handleButtonClick = async (key) => {
    try {
      const uid = currentUser.uid;
      const storage = getStorage();
      const storageRef = ref(storage, `users/${uid}/${key}`);
      const fileRefs = await listAll(storageRef);
      const imageContainer = document.getElementById('image-container');
      imageContainer.innerHTML = ''; // 이미지 컨테이너 비우기
      fileRefs.items.forEach(async (fileRef) => {
        const downloadURL = await getDownloadURL(fileRef);
  
        const img = new Image();
        img.src = downloadURL;
        img.alt = 'Resized Image';
        img.style.width = '500px'; // 원하는 가로 크기 설정
        img.style.height = 'auto'; // 세로 비율 자동 조정
  
        document.getElementById('image-container').appendChild(img);
      });
    } catch (error) {
      console.error('파일 목록을 불러오는 중 오류 발생:', error);
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
          await updateDoc(docRef, { [inputValue]: `/users/${uid}/${inputValue}` });
          console.log('Category saved to Firestore successfully!');
        } else {
          console.log('Category already exists in Firestore!');
        }
      } else {
        await setDoc(docRef, { [inputValue]: `/users/${uid}/${inputValue}` });
        console.log('Category saved to Firestore successfully!');
      }

      const storage = getStorage();
      const storageRef = ref(storage, `users/${uid}/${inputValue}`);
      // 파일 업로드 또는 기타 작업 수행
      console.log('File created successfully!');

      // 파일 생성 성공 후 홈으로 라우팅
 
    } catch (error) {
      console.error('Error creating file: ', error);
    }
  };

  const renderButtons = () => {
    return (
      <div key={buttonRenderKey}> {/* 키를 변경하여 새로 렌더링 */}
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
  
    </div>
  );
}

export default Category;
