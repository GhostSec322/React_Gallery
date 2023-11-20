import { collection, getDocs, doc, updateDoc, setDoc,getDoc } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';
import { useState, useEffect } from 'react';
import { auth, db } from './config';

function Category() {
  const [inputValue, setInputValue] = useState('');
  const [folders, setFolders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // 사용자 상태 추가

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
    console.log(user)
      if (user) {
        setCurrentUser(user); // 사용자 정보 업데이트
      } else {
        setCurrentUser(null); // 사용자가 로그아웃한 경우 null로 설정
      }
    });

    return () => unsubscribe(); // cleanup 함수 등록
  }, []);

  useEffect(() => {
    if (currentUser) {
      // currentUser가 존재할 때만 데이터를 가져오도록 설정
      const fetchFolders = async () => {
        try {
          const uid = currentUser.uid;
          alert("UID:"+uid) // 디버그용 나중에 삭제 예정
              const querySnapshot = await getDocs(collection(db, 'users', uid));
       
          const foldersData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
          setFolders(foldersData);
        } catch (error) {
          console.error('Error fetching folders: ', error);
        }
      };

      fetchFolders();
    }
  }, [currentUser]); // currentUser가 변경될 때마다 실행

  const saveToFirebase = async (uid, category) => {
    try {
      const docRef = doc(db, `users/${uid}`);
        alert("UID 4:"+uid);
        alert("1");
        console.log("doc Ref is ..."+docRef); // 디버깅 
        const docSnap = await getDoc(docRef);

      alert(2); //디버깅
      alert(docSnap);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (!userData[category]) {
          await updateDoc(docRef, { [category]: `/users/${uid}/${category}` });
          console.log('Category saved to Firestore successfully!');
        } else {
          console.log('Category already exists in Firestore!');
        }
      } else {
        await setDoc(docRef, { [category]: `/users/${uid}/${category}` });
        console.log('Category saved to Firestore successfully!');
      }

      // Storage 경로 설정
      const storage = getStorage();
      const storageRef = ref(storage, `users/${uid}/${category}`);
      alert(storageRef)
      // 여기에 파일 업로드를 하거나 다른 작업을 할 수 있습니다.
    } catch (error) {
      console.error('Error saving category to Firestore: ', error);
    }
  };

  const handleCreateClick = () => {
    const uid = currentUser.uid;
    alert("2UID:"+uid);
    alert("3 입력값: "+inputValue);
    saveToFirebase(uid, inputValue);
  };

  return (
    <div>
      {/* 입력 필드 및 버튼 */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleCreateClick}>Create</button>

      {/* 사용자의 폴더 목록 출력 */}
      <ul>
        {folders.map((folder) => (
          <li key={folder.id}>{JSON.stringify(folder.data)}</li>
        ))}
      </ul>
    </div>
  );
}

export default Category;
