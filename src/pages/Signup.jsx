import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import Navbar from "../components/Navbar";
import { registerUser } from "../utils/auth";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [msgClass, setMsgClass] = useState("error-box");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;

    // validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setMessage("⚠️ Please fill all the fields.");
      setMsgClass("error-box shake");
      setTimeout(() => setMsgClass("error-box"), 2000);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match.");
      setMsgClass("error-box shake");
      setTimeout(() => setMsgClass("error-box"), 2000);
      return;
    }

    // save user
    const result = registerUser({
      firstName,
      lastName,
      email,
      password,
    });

    if (result.success) {
      setMessage("✅ Account created successfully! Redirecting to login...");
      setMsgClass("success-box");
      setTimeout(() => navigate("/"), 2000);
    } else {
      setMessage("❌ " + result.message);
      setMsgClass("error-box shake");
      setTimeout(() => setMsgClass("error-box"), 3000);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login">
        <div className="login-body">
          <div className="card login-card">
            <div className="card-body">
              <h1 className="login-title">Sign Up</h1>
              {message && <div className={msgClass}>{message}</div>}

              <form className="login-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="input-sec"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="input-sec"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input-sec"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input-sec"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="input-sec"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

                <button type="submit" className="btn submit-button btn-outline-success m-4">
                  Create Account
                </button>

                <p className="text-center mt-3">
                  Already have an account?{" "}
                  <a href="/" style={{ textDecoration: "underline" }}>
                    Log in here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
