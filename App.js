// App.js
import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Compoment/Home';
import Login from './Compoment/Login';
import UnloginHome from './Compoment/UnloginHome';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<UnloginHome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
