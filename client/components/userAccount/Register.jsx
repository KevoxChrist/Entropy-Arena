import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function RegisterSection() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors({});

    try {
      await register(formData);
      setMessage("Account created successfully!");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setErrors({ form: err.message || "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2 className="section-title">Register</h2>
      {errors.form && <div className="error-msg">{errors.form}</div>}
      {message && <div className="success-msg">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-input"
          />
          {errors.username && <p className="error-msg">{errors.username}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="register-email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="register-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
          {errors.email && <p className="error-msg">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="register-password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="register-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
          {errors.password && <p className="error-msg">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <button type="submit" disabled={loading} className="btn-submit">
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </section>
  );
}
