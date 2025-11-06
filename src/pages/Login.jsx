import React, { useEffect } from 'react'
import { useState } from 'react';
import { login } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import "../styles/login.css";
import Navbar from "../components/Navbar"
import { initializeLibraryData } from "../utils/Storage";


export default function Login() {
    useEffect(() => {
        initializeLibraryData();
      }, []);
      

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorClass, setErrorClass] = useState("error-box");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn , setIsLoggedIn] = useState(false);


  useEffect (()=>{
    if(isLoggedIn){
      setLoading(false)
      setTimeout(()=>navigate("/dashboard"),3000)
    }
  },[isLoggedIn , navigate])

  const handleInputChange = (event)=>{
    const {name,value} = event.target;
    if(name === "email") setEmail(value);
    if(name === "password") setPassword(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (email === "" || password === "") {
      setMessage("⚠️ Please fill all the fields");
      setErrorClass("error-box shake");
      setTimeout(() => setErrorClass("error-box"), 500);
      return;
    }
  
    setLoading(true);
    setMessage("");

    try{
      console.log(email,password);

    const result = login(email,password)

    if(result.success){
      setMessage("✅ Login successful! Redirecting...");
      setErrorClass("success-box");
      setIsLoggedIn(true);
    }else{
      setLoading(false);
      setMessage("❌" + result.message);
      setIsLoggedIn(false);
      setErrorClass("error-box shake");
      setTimeout(()=>setErrorClass("error-box"),3000)
    }
    }
    catch(error){

    }
  }

  return (
    <>
    <Navbar  isLoggedIn={isLoggedIn} />
      <div className="login">
        <div className="login-body">
          <div className="card login-card">
            <div className="card-body">
              <h1 className="login-title">Log In</h1>
              {message && <div className={errorClass}>{message}</div>}

              <form className="login-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter Email"
                  className="input-sec"
                  style={{ borderRadius: "5px" }}
                  onChange={handleInputChange}
                  value={email}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="input-sec"
                  style={{ borderRadius: "5px" }}
                  onChange={handleInputChange}
                  value={password}
                />

                <button
                  type="submit"
                  className="btn submit-button btn-outline-success m-4"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Submit"}
                </button>

                <p className="text-center mt-3">
                  Don’t have an account?{" "}
                  <a href="/signup" style={{ textDecoration: "underline" }}>
                    Sign up here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}