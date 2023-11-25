import { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';
import { auth, db } from './config';

function Category() {
  const [inputValue, setInputValue] = useState('');
  const [userKeys, setUserKeys] = useState([]);
  const [userValues, setUserValues] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

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
          } else {
            console.log('User document does not exist.');
          }
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleButtonClick = async (key) => {
    const value = userValues[key];
    alert(`클릭된 값: ${value}`);
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
    } catch (error) {
      console.error('Error creating file: ', error);
    }
  };

  const renderButtons = () => {
    return (
      <div>
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
      {renderButtons()}
    </div>
  );
}

export default Category;
