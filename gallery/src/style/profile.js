


import React, { useState } from 'react';
import './styles.css';

function profile() {
  // 사용자 데이터의 예시
  const [userData, setUserData] = useState({
    name: '???',
    usageBytes: 500000, 
  });

  return (
    <div className="profile-container">
      <div className="profile-image">
        <img src="https://placekitten.com/200/300" alt="프로필" />
      </div>
      <div className="profile-info">
        <h1>{userData.name}</h1>
        <div className="usage-info">
          <div className="usage-bar">
            <div
              className="usage-fill"
              style={{ width: `${(userData.usageBytes / 1000000) * 100}%` }}
            ></div>
          </div>
          <div className="circle-graph">
            <div className="circle-fill"></div>
          </div>
        </div>
        <p>사용 용량: {userData.usageBytes} 바이트</p>
        <button className="edit-button">비밀번호 변경</button>
      </div>
    </div>
  );
}

export default App;
