import React, { useState } from 'react';
import axios from 'axios';
import {Link , useNavigate } from 'react-router-dom';
import "./Login.css"

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://recipback.onrender.com/login', { email, password });
      console.log('Login successful');
      // Assuming response contains the username
      setUsername(response.data.username);
      navigate('/home');
    } catch (error) {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input className="login-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="login-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="login-button" onClick={handleLogin}>Login</button>
      <p className="login-text">Don't have an account? <Link to="/">Register</Link></p>
      {error && <p className="login-error">{error}</p>}
      {username && (
        <div>
          <p className="login-welcome">Welcome, {username}!</p>
          <p className="login-welcome"><button onClick={() => navigate('/home')}>Go to Home Page</button></p>
        </div>
      )}
    </div>
  );
}

export default Login;