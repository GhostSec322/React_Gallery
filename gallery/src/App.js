// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import Login from './Component/Login';
import Pixabay from './Component/Pixabay';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Pixabay />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
