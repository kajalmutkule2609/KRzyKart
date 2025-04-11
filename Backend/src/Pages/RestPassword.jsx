import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Pages/ResetPassword.css"; // Import CSS file
import { generateOtp, verifyOtp, forgotPassword } from "../Apis/userApi.api"; // Import the API

const ResetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [verified, setVerified] = useState(false);

    // Handle Input Change
    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    // Handle Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setError("Please enter your email ");
            return;
        }
        try {
            const response = await generateOtp({ email });
            setOtpSent(true);
            setSuccess("OTP sent to your email.");
            setError("");
        } catch (error) {
            setError("Error sending OTP. Please try again.");
            setSuccess("");
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!otp) {
            setError("Please enter your OTP ");
            return;
        }
        try {
            const response = await verifyOtp({ email, otp });
            setVerified(true);
            setSuccess("OTP verified successfully.");
            setError("");
        } catch (error) {
            setError("Invalid OTP. Please try again.");
            setSuccess("");
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (!newPassword || !confirmPassword) {
            setError("Please enter both new password and confirm password ");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }
        try {
            const response = await forgotPassword({ email, newPassword });
            setSuccess("Password changed successfully.");
            setError("");
        } catch (error) {
            setError("Error changing password. Please try again.");
            setSuccess("");
        }
    };

    return (
        <div className="reset-container">
            <div className="reset-box">
                <h2 className="reset-title">Reset Password</h2>
                {error && <p className="reset-error">{error}</p>}
                {success && <p className="reset-success">{success}</p>}
                {!otpSent && (
                    <form onSubmit={handleSubmit} className="reset-form">
                        <div>
                            <label className="reset-label">Email</label>
                            <input type="text" className="reset-input" value={email} onChange={handleChange} placeholder="Enter your email" />
                        </div>
                        <button type="submit" className="reset-button"> Send OTP </button>
                    </form>
                )}
                {otpSent && !verified && (
                    <form onSubmit={handleVerifyOtp} className="reset-form">
                        <div>
                            <label className="reset-label">OTP</label>
                            <input type="text" className="reset-input" value={otp} onChange={handleOtpChange} placeholder="Enter your OTP" />
                        </div>
                        <button type="submit" className="reset-button"> Verify OTP </button>
                    </form>
                )}
                {verified && (
                    <form onSubmit={handleChangePassword} className="reset-form">
                        <div>
                            <label className="reset-label">New Password</label>
                            <input type="password" className="reset-input" value={newPassword} onChange={handleNewPasswordChange} placeholder="Enter your new password" />
                        </div>
                        <div>
                            <label className="reset-label">Confirm Password</label>
                            <input type="password" className="reset-input" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Enter your confirm password" />
                            </div>
                        <button type="submit" className="reset-button" disabled={newPassword !== confirmPassword}> Change Password </button>
                    </form>
                )}
                {/* Back to Login */}
                <p onClick={() => navigate("/login")} className="reset-link"> Back to Login </p>
            </div>
        </div>
    );
};

export default ResetPassword;