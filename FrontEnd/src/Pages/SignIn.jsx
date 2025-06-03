import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Pages/SignIn.css"; 
import { registerUser, generateOtp, verifyOtp } from "../Apis/userApi.api";

const SignUp = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNo: "",
    password: "",
    address:"",
    role:"Customer"
  });
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Validate Form
  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    if (formData.contactNo.length < 10) newErrors.contactNo = "Invalid contact number";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  // Handle Form Submit
  
const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validateForm();
  if (Object.keys(newErrors).length === 0 && verified) {
    try {
      const response = await registerUser({ ...formData, role: "Customer" });
      console.log(response.data);
      setSuccess("Registration Successful!");
      setErrors({});
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(formData);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("userData", JSON.stringify(formData));
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }  catch (error) {
      if (error.response && error.response.status === 403) {
        setErrors({ general: "User already exists with the given details." });
      } else {
        setErrors({ general: "An error occurred" });
      }    
      setSuccess("");
    }
  } else {
    setSuccess("Registration Failed");
    setErrors(newErrors);
    console.log("Registration Failed");
  }
};


  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setErrors({ email: "Email is required" });
      return;
    }
    try {
      const response = await generateOtp({ email: formData.email });
      setOtpSent(true);
      setSuccess("OTP sent to your email.");
      setErrors({});
    } catch (error) {
      setErrors({ email: "Error sending OTP. Please try again." });
      setSuccess("");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setErrors({ otp: "OTP is required" });
      return;
    }
    try {
      const response = await verifyOtp({ email: formData.email, otp });
      console.log("response:",response);
      if(response == "OTP verified successfully"){
        setVerified(true);
        setSuccess("OTP verified successfully.");
        setErrors({});
      } else{
        setVerified(false);
        setErrors({ otp: "Wrong Otp Entered!!" });
      }
  
      
    } catch (error) {
      setErrors({ otp: "Invalid OTP. Please try again." });
      setSuccess("");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>
        {errors.general && <p className="signup-error">{errors.general}</p>}
        {success && <p className="signup-success">{success}</p>}
        <form className="signup-form">
          <div>
            <label className="signup-label">Name</label>
            <input type="text" name="fullName" className="signup-input" value={formData.fullName} onChange={handleChange} placeholder="Enter your name" />
            {errors.fullName && <p className="signup-error">{errors.fullName}</p>}
          </div>
          <div>
            <label className="signup-label">Email</label>
            <input type="email" name="email" className="signup-input" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
            {errors.email && <p className="signup-error">{errors.email}</p>}
          </div>
          {!otpSent && (
            <button type="button" className="signup-button" onClick={handleSendOtp}> Send OTP </button>
          )}
          {otpSent && (
            <div>
              {!verified && (
                <div>
                  <label className="signup-label">OTP</label>
                  <input type="text" name="otp" className="signup-input" value={otp} onChange={handleOtpChange} placeholder="Enter your OTP" />
                  {errors.otp && <p className="signup-error">{errors.otp}</p>}
                  <button type="button" className="signup-button" onClick={handleVerifyOtp}> Verify OTP </button>
                </div>
              )}
              {verified && (
                <div>
                  <input type="checkbox" checked={verified} readOnly />
                  <label className="otp-verify">OTP Verified</label>
                </div>
              )}
            </div>
          )}

          {verified && (
            <div>
              <div>
                <label className="signup-label">Contact</label>
                <input type="text" name="contactNo" className="signup-input" value={formData.contactNo} onChange={handleChange} placeholder="Enter your contact number" />
                {errors.contactNo && <p className="signup-error">{errors.contactNo}</p>}
              </div>
              <div>
              <label className="signup-label">Address</label>
                <input type="text" name="address" className="signup-input" value={formData.address} onChange={handleChange} placeholder="Enter your Address Here" />
                {errors.address && <p className="signup-error">{errors.address}</p>}
              </div>
              <div>
                <label className="signup-label">Password</label>
                <input type="password" name="password" className="signup-input" value={formData.password} onChange={handleChange} placeholder="Enter your password" />
                {errors.password && <p className="signup-error">{errors.password}</p>}
              </div>
              <button type="submit" className="signup-button" onClick={handleSubmit}> Register </button>
            </div>
          )}
          {/* Already a user? Redirect to login page */}
          <p className="signup-login-link"> Already a user?{" "}
            <span onClick={() => navigate("/login")} className="signup-login-text"> Login here </span>
          </p>
          <p className="signup-login-link">Want to Register as Seller? {" "}
            <span onClick={() => navigate("/SignUpForSeller")} className="signup-login-text"> Click here </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
