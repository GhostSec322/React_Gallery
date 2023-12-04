import { createStore } from "redux";

// 액션 타입
const UPDATE_KEY_VALUE = "UPDATE_KEY_VALUE";
const READ_KEY_VALUE = "READ_KEY_VALUE";

// 초기 상태
const initialState = {
  // 로컬 스토리지에서 keyValueDict를 가져와서 초기 상태로 설정
  keyValueDict: JSON.parse(localStorage.getItem("keyValueDict")) || {},
};

// 액션 생성자
export const updateKeyValue = (key, value) => ({
  type: UPDATE_KEY_VALUE,
  payload: { key, value },
});

// 새로운 액션 생성자 추가
export const readKeyValue = (keyToRead) => ({
  type: READ_KEY_VALUE,
  payload: { keyToRead },
});

// 리듀서 함수
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_KEY_VALUE:
      // 새로운 키-값 쌍을 추가하고 로컬 스토리지에 상태 저장
      const { key, value } = action.payload;
      const updatedKeyValueDict = {
        ...state.keyValueDict,
        [key]: value,
      };
      localStorage.setItem("keyValueDict", JSON.stringify(updatedKeyValueDict));
      return {
        ...state,
        keyValueDict: updatedKeyValueDict,
      };
    case READ_KEY_VALUE:
      // 해당 키의 값을 반환하거나 초기 상태 반환
      const { keyToRead } = action.payload;
      const valueToRead = state.keyValueDict[keyToRead] || null;
      return {
        ...state,
        valueToRead,
      };
    default:
      return state;
  }
};

// 스토어 생성
const store = createStore(reducer);

export default store;
