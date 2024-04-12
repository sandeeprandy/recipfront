import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Register.css'; // Importing CSS file for styling

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://recipback.onrender.com/register', { email, password, phone });
      console.log(response.data.message); // Log registration success message
      window.location.href ='/login'
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <input className="register-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="register-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input className="register-input" type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <button className="register-button" onClick={handleRegister}>Register</button>
      <p className="register-text">Already have an account? <Link to="/login">Login</Link></p>
      {error && <p className="register-error">{error}</p>}
    </div>
  );
}

export default Register;
