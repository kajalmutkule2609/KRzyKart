import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Pages/Login.css"; // Import the CSS file
import { loginUser, getUserByEmail } from "../Apis/userApi.api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState("");
  
  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate & Handle Login
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !formData.email.endsWith("@gmail.com")) {
      newErrors.email = "Please enter a valid Email id.";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    return newErrors;
  };const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await loginUser(formData);
        if (response.data.includes("Login Failed")) {
          alert("Login Failed !! Please Try Again");
          console.log("login Failed");
        } else {
          const userDataResponse = await getUserByEmail(formData.email);
          localStorage.setItem("userData", JSON.stringify(userDataResponse.data));
          navigate("/");
        }
      } catch (error) {
        alert("Login Failed !! Please Try Again");
        console.log("login Failed");
      }
    } else {
      alert("Login Failed !! Please Try Again");
      console.log("login Failed");
    }
  };
  
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        {Object.keys(errors).length > 0 && (
          <p className="login-error">
            {Object.keys(errors).map((key) => (
              <span key={key}>{errors[key]}</span>
            ))}
          </p>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label className="login-label">Email</label>
            <input
              type="text"
              name="email"
              className="login-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email here"
            />
          </div>

          <div>
            <label className="login-label">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {/* Links for Reset Password & New User */}
        <div className="login-links">
          <p onClick={() => navigate("/reset-password")} className="login-link">
            Forgot Password?
          </p>
          <p onClick={() => navigate("/sign-up")} className="login-link">
            New User? Sign Up
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;