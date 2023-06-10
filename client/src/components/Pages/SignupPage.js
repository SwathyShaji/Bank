import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import waveImage from './img/wave.png';
import bgImage from './img/bg.svg';
import avatarImage from './img/avatar.svg';

export const SignupPage = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    if (username.trim() === '') {
      toast.error('Please enter a username');
      return;
    }

    if (password.trim() === '') {
      toast.error('Please enter a password');
      return;
    }

    axios
      .post('//localhost:8001/signup', {
        username,
        password,
      })
      .then((response) => {
        toast.success('Signup successful');
        onSignup();
      })
      .catch((error) => {
        console.error(error);
        toast.error('Signup failed');
      });
  };

  return (
    <div className="container">
      <img className="wave" src={waveImage} alt="Wave" />

      <h1 className="text-center">Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div className="img">
          <img src={bgImage} alt="Background" />
        </div>
        <div className="form-group">
          Email:
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          Password:
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Sign Up
        </button>
        <img src={avatarImage} className="image" alt="Avatar" />
      </form>
    </div>
  );
};

export default SignupPage;
;
