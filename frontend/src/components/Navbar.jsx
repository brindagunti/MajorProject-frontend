import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">MediPredict</Link>
      <ul className="nav-links">
        <li><Link to="/predict">Predict</Link></li>
        <li><Link to="/chat">Chat</Link></li>
        <li><Link to="/find">Find</Link></li>
        <li><Link to="/book">Book</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
}
