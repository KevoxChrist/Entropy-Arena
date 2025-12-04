//Sign-In & Sign-Up
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Github } from 'lucide-react';
import RegisterSection from "../components/userAccount/Register.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import '../styles/Login.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(form);
      navigate("/Leaderboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
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
            <form onSubmit={handleSubmit}>
              {error && <div className="error-msg">{error}</div>}
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              <button className="btn-submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </section>

          <RegisterSection />
          
        </div>
      </div>
      

    </div>
  );
}
