import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/auth.css";

export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/"); // Go to Home
  };

  return (
    <div className="auth-container">
      <h1 className="app-title">MediPredict</h1>
      <div className="auth-card">
        <h2 className="form-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label className="auth-label">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            required
            className="auth-input"
          />

          <label className="auth-label">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="auth-input"
          />

          <label className="auth-label">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            required
            className="auth-input"
          />

          <button type="submit" className="auth-button">
            Sign Up
          </button>
        </form>
        <p className="auth-text">
          Already have an account?{" "}
          <a href="/login" className="auth-link">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
