import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../resources/logo.ico";
import "../styles/Navbar.css";
import { getCurrentUser, logout } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = getCurrentUser();

  const initials =
    (user?.firstName?.[0]?.toUpperCase() || "U") +
    (user?.lastName?.[0]?.toUpperCase() || "U");

  useEffect(() => {
    setIsLoggedIn(!!user);
    setShowDropdown(false);
  }, [location.pathname]);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleLogout = () => {
    logout();
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left: Logo */}
        <div className="navbar-left">
          <Link to="/home">
            <img src={logo} alt="logo" className="navbar-logo" />
          </Link>
        </div>

        {/* Center: Title */}
        <div className="navbar-center">
          <h1 className="navbar-title">COMPSA Library</h1>
        </div>

        {/* Right: Auth Buttons or User */}
        <div className="navbar-right">
          {isLoggedIn ? (
            <div className="user-section">
              <div className="user-icon" onClick={toggleDropdown}>
                {initials}
              </div>
              {showDropdown && (
                <div className="dropdown">
                  <button onClick={() => navigate("/home")}>Home</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="buttons">
              <Link to="/signup" className="button">Sign Up</Link>
              <Link to="/" className="button">Log In</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
