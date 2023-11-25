// store.js

import { createStore } from 'redux';

// 초기 상태 설정
const initialState = {
  keyValueDict: {}, // key:value 쌍을 저장할 객체
};

// 액션 타입 정의
const UPDATE_KEY_VALUE = 'UPDATE_KEY_VALUE';

// 액션 생성자 함수
export const updateKeyValue = (key, value) => ({
    type: UPDATE_KEY_VALUE,
  payload: { key, value },
  
});

// 리듀서 함수
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_KEY_VALUE:
      return {
        ...state,
        keyValueDict: {
          ...state.keyValueDict,
          [action.payload.key]: action.payload.value,
        },
      };
    default:
      return state;
  }
};

// 스토어 생성
const store = createStore(reducer);

export default store;
