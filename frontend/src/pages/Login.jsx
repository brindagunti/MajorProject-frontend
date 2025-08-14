import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/auth.css";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/"); // Go to Home
  };

  return (
    <div className="auth-container">
      <h1 className="site-title">MediPredict</h1>
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            className="auth-input"
            placeholder="Enter your email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            className="auth-input"
            placeholder="Enter your password"
            required
          />

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        <p className="auth-text">
          Don't have an account?{" "}
          <a href="/signup" className="auth-link">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
