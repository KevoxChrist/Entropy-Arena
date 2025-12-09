// Sign-In Page
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Login.css";

export default function Login() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    const result = await login(loginForm.email, loginForm.password);

    if (result.success) {
      navigate("/arena");
    } else {
      setLoginError(result.message);
    }
    setLoginLoading(false);
  };

  const handleLoginChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <header className="login-header">
          <h1 className="login-title">Log in</h1>
          <p className="login-subtitle">
            Access your account, save your best runs, and track your rank on
            the leaderboard.
          </p>
        </header>

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
            {loginLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="login-footer-text">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="login-footer-link">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
