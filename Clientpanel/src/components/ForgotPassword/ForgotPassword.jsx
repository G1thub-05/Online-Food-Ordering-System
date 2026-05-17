import React, { useState } from "react";
import "../Register/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios"; // 🆕 axios needed
import "../../App.css";
import { API_URL } from "../../util/constants";

const ForgotPassword = () => {
	const navigate = useNavigate();
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	// 🔐 OTP-related states
	const [otp, setOtp] = useState("");
	const [otpSent, setOtpSent] = useState(false);
	const [otpVerified, setOtpVerified] = useState(false);

	useEffect(() => {
		setOtp("");
		setOtpSent(false);
		setOtpVerified(false);
	}, []); // empty dependency = only on component mount

	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		setData((prev) => ({ ...prev, [name]: value }));
	};
	const isValidEmail = (email) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	const handleSendOtp = async () => {
		if (!data.email) return toast.error("Enter your email first");
		if (!isValidEmail(data.email))
			return toast.error("Enter a valid email address");
		try {
			const res = await axios.post(
				`${API_URL}/api/reset-password`,
				{
					email: data.email,
				},
				{
					timeout: 10000,
					headers: {
						"Content-Type": "application/json",
					},
					// withCredentials: true,
				},
			);
			toast.success(`OTP sent to your email: ${data.email}`);
			console.log("OTP sent response:", res.data);
			setOtpSent(true);
		} catch (err) {
			toast.error(err.response?.data?.message || "Failed to send OTP");
			console.log("OTP ERROR:", err.response);
		}
	};

	const handleVerifyOtp = async () => {
		if (!otp) return toast.error("Please enter the OTP");
		try {
			const res = await axios.post(`${API_URL}/api/verify-otp`, {
				email: data.email,
				otp,
			});
			if (res?.data?.verified) {
				toast.success("OTP verified");
				setOtpVerified(true);
			} else {
				toast.error("Invalid or expired OTP");
			}
		} catch (err) {
			toast.error("OTP verification failed");
		}
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();

		if (!otpVerified) {
			toast.error("Please verify OTP first");
			return;
		}

		setLoading(true);
		try {
			const token = localStorage.getItem("token"); // 🧠 MOVE THIS UP
			console.log("reset token:", token);
			const response = await axios.post(
				`${API_URL}/api/reset`,
				{
					email: data.email,
					password: data.password,
				},

				{
					headers: {
						"Content-Type": "application/json",
						...(token && {
							Authorization: `Bearer ${token}`,
						}),
					},
				},
			);
			if (response?.status === 200 || response?.status === 201) {
				toast.success("Password reset successful. Please login.");
				navigate("/login");
			} else {
				toast.error("Password reset failed. Try again.");
			}
		} catch (err) {
			console.error("❌ Error response:", err.response);
			toast.error(err.response?.data?.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="register-page">
			<div className="register-form-container">
				<h2>Reset Your Password</h2>
				<form onSubmit={onSubmitHandler} className="register-form">
					<div className="otp-email-container">
						<input
							type="email"
							name="email"
							placeholder="Email"
							value={data.email}
							onChange={onChangeHandler}
							required
						/>
						<span>
							<button
								type="button"
								className="send-otp-btn"
								onClick={handleSendOtp}
							>
								Send OTP
							</button>
						</span>
					</div>
					{otpSent && (
						<>
							<div className="otp-input-container">
								{[...Array(6)].map((_, idx) => (
									<input
										key={idx}
										type="text"
										maxLength="1"
										className="otp-box"
										onChange={(e) => {
											const value = e.target.value;
											if (/^[0-9]?$/.test(value)) {
												const newOtp = otp ? [...otp] : Array(6).fill("");
												newOtp[idx] = value;
												setOtp(newOtp.join(""));
												// Auto-focus next
												if (value && idx < 5) {
													const nextInput = document.getElementById(
														`otp-${idx + 1}`,
													);
													nextInput?.focus();
												}
											}
										}}
										id={`otp-${idx}`}
									/>
								))}

								<span>
									<button
										type="button"
										onClick={handleVerifyOtp}
										style={{ backgroundColor: "#198754", color: "white" }}
										className="verify-otp-btn"
									>
										Verify OTP
									</button>
								</span>
							</div>
						</>
					)}

					<div className="password-wrapper">
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							placeholder="Password"
							value={data.password}
							onChange={onChangeHandler}
							required
						/>
						<span
							className="toggle-password"
							onClick={() => setShowPassword((prev) => !prev)}
						>
							{showPassword ? "🙈" : "👁️"}
						</span>
					</div>

					<button type="submit" disabled={loading || !otpVerified}>
						{!otpVerified ? "Verify OTP First.." : "🚀 Reset Password"}
					</button>

					<p className="login-link">
						Want to go Login ? <Link to="/login">Login</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default ForgotPassword;
