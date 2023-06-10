import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './style.css';
import waveImage from './img/wave.png';
import bgImage from './img/bg.svg';
import avatarImage from './img/avatar.svg';

export const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('//localhost:8001/login', {
      username,
      password
    })
      .then((response) => {
        const { token } = response.data;
        onLogin(token);
      })
      .catch((error) => {
        console.error(error);
        toast.error('Login failed');
      });
  };

  return (
    <div className="container">
      <img className="wave" src={waveImage} alt="Wave" />
      <div className="img">
        <img src={bgImage} alt="Background" />
      </div>
      <div className="login-content">
        <form onSubmit={handleLogin}>
          <img src={avatarImage} className="image" alt="Avatar" />
          <h2 className="title">Welcome</h2>
          <div className="input-div one">
            <div className="i">
              <i className="fas fa-user"></i>
            </div>
            <div className="div">
              <h5>Username</h5>
              <input
                type="text"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="input-div pass">
            <div className="i">
              <i className="fas fa-lock"></i>
            </div>
            <div className="div">
              <h5>Password</h5>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <a href="#">Forgot Password?</a>
          <input type="submit" className="btn" value="Login" />
        </form>
        <div className="signup-link">
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link> 
          </p>
        </div>
      </div>
    </div>
  );

};

// export default LoginPage;
