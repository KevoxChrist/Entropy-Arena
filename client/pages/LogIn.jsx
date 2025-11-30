//Sign-In & Sign-Up 
import React, { useState } from "react";
import { Menu, Star, Github } from 'lucide-react';
import RegisterSection from "../components/Register.jsx"
import Footer from "../components/Footer.jsx"
import '../styles/Login.css'

export default function Login(){
     return (
    <div className="app-container">

      {/* Main */}
      <div className="main-content">
        <div className="auth-card">

            {/* Login */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 className="section-title">Login</h2>
            
            <div className="social-buttons">
              <button className="btn-social btn-github">
                Github <Github size={18} />
              </button>
              <button className="btn-social btn-google">
                Google <Star size={18} fill="black" stroke="black" />
              </button>
            </div>

            <div className="divider-container">
              <div className="divider-line" />
              <span className="divider-text">OR</span>
            </div>

            <form>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" className="form-input" />
              </div>
              <button className="btn-submit">Sign In</button>
            </form>
          </section>

          {/* REGISTER SECTION */}
          <RegisterSection />
          
        </div>
      </div>
    <Footer />
    </div>
  );
}