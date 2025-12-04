//Sign-In & Sign-Up 
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// import { Star, Github } from 'lucide-react';
import RegisterSection from "../components/userAccount/Register.jsx" 
import '../styles/Login.css'

export default function Login(){
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    const result = await login(loginForm.email, loginForm.password);
    
    if (result.success) {
      navigate('/arena');
    } else {
      setLoginError(result.message);
    }
    setLoginLoading(false);
  };

  const handleLoginChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="app-container">
      

      {/* Main Content Card Container */}
      <div className="main-content">
        <div className="auth-card">

            {/* Login Section */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 className="section-title">Login</h2>
            
            {/* Social Buttons */}
            {/* <div className="social-buttons">
              <button className="btn-social btn-github">
                Github <Github size={18} />
              </button>
              <button className="btn-social btn-google">
                Google <Star size={18} fill="black" stroke="black" />
              </button>
            </div> */}

            {/* OR Divider */}
            <div className="divider-container">
              <div className="divider-line" />
              <span className="divider-text">OR</span>
            </div>

            {/* Login Form */}
            {loginError && <div className="error-message">{loginError}</div>}
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  name="email"
                  className="form-input" 
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  name="password"
                  className="form-input" 
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  required 
                />
              </div>
              <button type="submit" className="btn-submit" disabled={loginLoading}>
                {loginLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          </section>

          <RegisterSection />
          
        </div>
      </div>
      

    </div>
  );
}