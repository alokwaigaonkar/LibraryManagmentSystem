import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, isAdmin } from "../utils/auth";
import "../styles/login.css";
import Navbar from "../components/Navbar";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = () => {
    const result = login(email, password);
    if (result.success && isAdmin()) {
      setMsg("✅ Welcome Admin! Redirecting...");
      setTimeout(() => navigate("/admin/dashboard"), 1000);
    } else {
      setMsg("❌ Invalid admin credentials");
    }
  };

  return (
    <>
    <Navbar/>
      <div className="login">
        <div className="login-card">
          <h1>Admin Login</h1>
          <input
            type="text"
            placeholder="Admin Email"
            value={email}
            className="input-sec"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            className="input-sec"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="submit-button" onClick={handleLogin}>
            Login
          </button>
          <p>{msg}</p>
        </div>
      </div>
    </>
  );
}
