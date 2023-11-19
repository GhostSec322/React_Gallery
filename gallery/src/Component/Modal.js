import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Firebase 인증 관련 메서드 가져오기
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage 관련 메서드 가져오기
import { initializeApp } from 'firebase/app'; // Firebase 앱 초기화 메서드 가져오기
import { firebaseConfig } from '../Firebase/config'; // Firebase 설정 파일을 import
import { collection, addDoc } from 'firebase/firestore'; // Firebase Firestore 관련 메서드 가져오기
import '../CSS/modal.css'; // 스타일 시트 불러오기

const Modal = () => {
  const type = ['image/png', 'image/jpeg']; // 허용된 이미지 파일 형식들
  const [error, setError] = useState(null); // 오류 상태를 저장하는 state
  const [file, Setfile] = useState(null); // 업로드할 파일을 저장하는 state
  const [modalOpen, setModalOpen] = useState(false); // 모달 창 열림 여부를 저장하는 state
  const [category, setCategory] = useState(''); // 업로드할 이미지의 카테고리를 저장하는 state
  const [userUid, setUserUid] = useState(null); // 현재 사용자 UID를 저장하는 state

  // 사용자 인증 상태 변경을 감지하고, 인증되면 사용자 UID를 가져오는 useEffect
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid);
      } else {
        setUserUid(null);
      }
    });
  }, []);
   // 빈 배열을 전달하여 한 번만 실행되도록 설정

  // 모달 열기 함수
  const openModal = () => {
    setModalOpen(true); // 모달 창 열림 상태를 true로 설정
  };

  // 모달 닫기 함수
  const closeModal = () => {
    // 모달 창 열림 상태를 false로 설정
    setCategory(''); // 카테고리 state 초기화
    Setfile(''); // 파일 state 초기화
  };

  // 파일 선택 시 호출되는 함수
  const handleFileUpload = (event) => {
    let selected = event.target.files[0]; // 선택된 파일 가져오기
    if (selected && type.includes(selected.type)) {
      Setfile(selected); // 선택된 파일이 허용된 형식이면 파일 state 업데이트
    } else {
      Setfile(null); // 그렇지 않으면 파일 state를 null로 설정하여 오류 메시지 표시
      alert('png와 jpeg 확장자만 업로드 가능합니다.');
      setError('png와 jpeg 확장자만 업로드 가능합니다.');
    }
  };

  // 카테고리 입력 시 호출되는 함수
  const handleCategoryChange = (event) => {
    setCategory(event.target.value); // 입력된 카테고리를 카테고리 state에 업데이트
  };

  // 파일 업로드 버튼 클릭 시 호출되는 함수
  // 파일 업로드 버튼 클릭 시 호출되는 함수
const handleUpload = async () => {
  if (file && category && userUid) { // 파일, 카테고리, 사용자 UID 확인
    const app = initializeApp(firebaseConfig); // Firebase 앱 초기화
    const storage = getStorage(app); // Firebase Storage 가져오기
    const userFolderRef = ref(storage, `users/${userUid}`); // 사용자 폴더 참조
    const categoryFolderRef = ref(userFolderRef, category); // 카테고리 폴더 참조

    const fileRef = ref(categoryFolderRef, file.name); // 파일 경로 참조

    try {
      await uploadBytes(fileRef, file); // 파일을 카테고리 폴더에 업로드
      const downloadURL = await getDownloadURL(fileRef); // 업로드된 파일의 다운로드 URL 가져오기

      const db = app.firestore(); // Firestore 객체 가져오기
      try {
        const docRef = await addDoc(collection(db, 'images'), { // 'images' 컬렉션에 데이터 추가
          userId: userUid, // 사용자 UID
          category: category, // 카테고리
          imageURL: downloadURL, // 이미지 다운로드 URL
        });
        console.log('Document written with ID: ', docRef.id); // 추가된 문서 ID 출력

        // 파일 업로드 후 상태 초기화
        Setfile(null); // 파일 state 초기화
        setCategory(''); // 카테고리 state 초기화
      } catch (error) {
        console.error('문서 추가 중 오류: ', error); // 데이터 추가 중 에러 출력
      }
    } catch (error) {
      console.error('파일 업로드 중 오류:', error); // 파일 업로드 중 에러 출력
      alert('파일 업로드 중 오류가 발생했습니다.'); // 에러 알림
    }
  } else {
    alert('파일, 카테고리를 선택하거나 사용자 인증이 필요합니다.'); // 필수 정보 누락 알림
  }
};

  // JSX 반환
  return (
    <div>
      {/* 파일 업로드 버튼 */}
      <button onClick={openModal}>파일 업로드</button>
      {/* 모달 */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>

            {/* 파일 업로드 폼 */}
            <form onSubmit={handleUpload}>
              <h2>파일 업로드</h2>
              {/* 카테고리 입력 필드 */}
              <input
                type="text"
                placeholder="카테고리 입력"
                value={category}
                onChange={handleCategoryChange}
              />
              {/* 파일 선택 필드 */}
              <input
                type="file"
                onChange={handleFileUpload}
              />
              {/* 오류 메시지 출력 */}
              <div className='output'>
                {error && <div className='error'>{error}</div>}
              </div>
              {/* 업로드된 파일 미리보기 */}
              {file && (
                <div className="image-preview">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Uploaded Preview"
                    style={{ maxWidth: '500px', maxHeight: '500px' }}
                  />
                </div>
              )}
              {/* 파일 업로드 버튼 */}
              <button type="submit">파일 업로드</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
