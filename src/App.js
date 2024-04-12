// Import necessary modules
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Register />} />
        <Route path="/Home" element={<Home />} />
       
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
