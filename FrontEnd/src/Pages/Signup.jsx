import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Pages/SignIn.css";
import { registerUser, generateOtp, verifyOtp } from "../Apis/userApi.api";
const SignUpForSeller = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "",
    fullName: "",
    email: "",
    contactNo: "",
    password: "",
    address: "",
    role: "seller",
  });
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [securityCode, setSecurityCode] = useState("");
  const [securityCodeVerified, setSecurityCodeVerified] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSecurityCodeChange = (e) => {
    setSecurityCode(e.target.value);
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    if (formData.contactNo.length < 10) newErrors.contactNo = "Invalid contact number";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0 && verified && securityCodeVerified) {
      try {
        const response = await registerUser({
          ...formData,
          role: "seller", // Ensure role is "seller"
        });

        console.log(response.data);
        setRegistrationStatus("Registration Successful!");
        setSuccess("");
        setErrors({});
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(formData);
        localStorage.setItem("users", JSON.stringify(users));
        const userData = JSON.parse(localStorage.getItem("userData"));
        const email = userData?.email;
        console.log("Email from localStorage:", email);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        setRegistrationStatus("Registration Failed!");
        setSuccess("");
        setErrors({});
      }
    } else {
      setRegistrationStatus("Registration Failed!");
      setSuccess("");
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
      console.log("response:", response);
      if (response === "OTP verified successfully") {
        setVerified(true);
        setSuccess("OTP verified successfully.");
        setErrors({});
      } else {
        setVerified(false);
        setErrors({ otp: "Wrong Otp Entered!!" });
      }
    } catch (error) {
      setErrors({ otp: "Invalid OTP. Please try again." });
      setSuccess("");
    }
  };

  const handleVerifySecurityCode = (e) => {
    e.preventDefault();
    if (securityCode === "Seller@11") {
      setSecurityCodeVerified(true);
      setSuccess("Security code verified successfully.");
      setErrors({});
    } else {
      setSecurityCodeVerified(false);
      setErrors({ securityCode: "Invalid security code" });
    }
  };
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign Up As Seller</h2>
        {registrationStatus && (
          <p
            style={{
              color: registrationStatus.includes("Successful") ? "green" : "red",
            }}
          >
            {registrationStatus}
          </p>
        )}
        {!securityCodeVerified && (
          <div>
            <label className="lableForSCode">Security Code</label>
            <input
              type="Password"
              className="sCode"
              placeholder="Enter Security Code Here"
              value={securityCode}
              onChange={handleSecurityCodeChange}
            />
            <button type="button" onClick={handleVerifySecurityCode}>
              Verify Security Code
            </button>
            {securityCodeVerified && (
              <p style={{ color: "green" }}>Security code verified!</p>
            )}
            {errors.securityCode && (
              <p className="signup-error">{errors.securityCode}</p>
            )}
          </div>
        )}
        {securityCodeVerified && (
          <form className="signup-form">
            <div>
              <label className="signup-label">Name</label>
              <input
                type="text"
                name="fullName"
                className="signup-input"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              {errors.fullName && (
                <p className="signup-error">{errors.fullName}</p>
              )}
            </div>
            <div>
              <label className="signup-label">Email</label>
              <input
                type="email"
                name="email"
                className="signup-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {errors.email && <p className="signup-error">{errors.email}</p>}
            </div>
            {!otpSent && (
              <button type="button" className="signup-button" onClick={handleSendOtp}>
                Send OTP
              </button>
            )}
            {otpSent && (
              <div>
                {!verified && (
                  <div>
                    <label className="signup-label">OTP</label>
                    <input
                      type="text"
                      name="otp"
                      className="signup-input"
                      value={otp}
                      onChange={handleOtpChange}
                      placeholder="Enter your OTP"
                    />
                    {errors.otp && <p className="signup-error">{errors.otp}</p>}
                    <button
                      type="button"
                      className="signup-button"
                      onClick={handleVerifyOtp}
                    >
                      Verify OTP
                    </button>
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
                  <input
                    type="text"
                    name="contactNo"
                    className="signup-input"
                    value={formData.contactNo}
                    onChange={handleChange}
                    placeholder="Enter your contact number"
                  />
                  {errors.contactNo && (
                    <p className="signup-error">{errors.contactNo}</p>
                  )}
                </div>
                <div>
                  <label className="signup-label">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="signup-input"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your Address Here"
                  />
                  {errors.address && (
                    <p className="signup-error">{errors.address}</p>
                  )}
                </div>
                <div>
                  <label className="signup-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="signup-input"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="signup-error">{errors.password}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="signup-button"
                  onClick={handleSubmit}
                >
                  Register
                </button>
              </div>
            )}
            <p className="signup-login-link">
              Already a user?{" "}
              <span
                onClick={() => navigate("/login")}
                className="signup-login-text"
              >
                Login here
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );

}
export default SignUpForSeller;