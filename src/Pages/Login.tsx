import React, { useState } from 'react';
import './Login.css';
import { FaUser, FaLock, FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '2005') {
      navigate('/admin');
    } else if (username === 'checador' && password === '1800') {
      navigate('/menucheck');
    } else if (username === 'chofer' && password === '1700') {
      navigate('/driver');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario o contraseña incorrectos',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="login-container">
      <div className="overlay"></div>
      <div className="login-box">
        <div className="back-arrow" onClick={handleGoBack}>
          <FaArrowLeft className="arrow-icon" />
        </div>
        <div className="login-form-container">
          <h2 className="login-title">Welcome</h2>
          <p className="login-subtitle">Ingrese sus datos</p>
          <form onSubmit={handleLogin}>
            <div className="input-container">
              <FaUser className="icon" />
              <input
                type="text"
                placeholder="Username"
                className="login-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-container">
              <FaLock className="icon" />
              <input
                type="password"
                placeholder="Password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="login-button">VAMOS</button>
            <a href="#" className="login-forgot-password">Se olvidó de su contraseña?</a>
          </form>
          <p className="login-register">No está registrado?</p>
        </div>
        <div className="login-image">
          <img src="/logo-removebg-preview.png" alt="Login background" />
        </div>
      </div>
    </div>
  );
};

export default Login;
