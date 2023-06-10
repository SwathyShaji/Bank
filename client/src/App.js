

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginPage } from './components/Pages/LoginPage';
import { SignupPage } from './components/Pages/SignupPage';
import { HomePage } from './components/Pages/HomePage';
import { DepositPage } from './components/Pages/DepositPage';
import { AccountStatementPage } from './components/Pages/AccountStatementPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [token, setToken] = useState('');

  const handleLogin = (token) => {
    setToken(token);
  };

  const handleLogout = () => {
    setToken('');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignupPage onSignup={handleLogin} />} />
          <Route
            path="/"
            element={
              !token ? (
                <>
                  <LoginPage onLogin={handleLogin} />
                  <Link to="/signup">Sign Up</Link>
                </>
              ) : (
                <>
                  <header className="header">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                      <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                          <Link to="/deposit" className="nav-link">
                            Deposit
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/account-statement" className="nav-link">
                            Account Statement
                          </Link>
                        </li>
                        <li className="nav-item">
                          <button onClick={handleLogout} className="btn btn-outline-primary">
                            Logout
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </header>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/deposit" element={<DepositPage />} />
                    <Route path="/account-statement" element={<AccountStatementPage />} />
                  </Routes>
                </>
              )
            }
          />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
