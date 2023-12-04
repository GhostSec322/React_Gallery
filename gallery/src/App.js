// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import Login from "./Component/Login";
import Pixabay from "./Component/Pixabay";
import Mypage from "./Component/Page/Mypage";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Pixabay />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Mypage" element={<Mypage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
