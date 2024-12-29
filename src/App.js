import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  const checkAuth = () => {
    const token = localStorage.getItem("userinfo");

    setIsAuthenticated(!!token);
    setIsLoading(false); // Set loading to false after checking authentication
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const ProtectedRoute = ({ element }) => {
    if (isLoading) {
      // Show a loading indicator while checking authentication
      return <div>Loading...</div>;
    }
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login"  element={<Login onLoginSuccess={checkAuth} />}   />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
      </Routes>
    </Router>
  );
}

export default App;
