import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Importing CSS file for styling

function Login() {
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
      // Redirect to home page after successful login
      window.location.href = '/home';
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
      <p className="login-text">Don't have an account? <a href="/">Register</a></p>
      {error && <p className="login-error">{error}</p>}
      {username && <p className="login-welcome">Welcome, {username}!</p>}
    </div>
  );
}

export default Login;
