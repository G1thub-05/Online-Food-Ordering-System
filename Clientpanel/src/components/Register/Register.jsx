import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"; // 🆕 axios needed
import "../../App.css";
import { API_URL } from "../../util/constants";

const Register = () => {
	const navigate = useNavigate();
	const [data, setData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	// 🔐 OTP-related states
	const [otp, setOtp] = useState("");
	const [otpSent, setOtpSent] = useState(false);
	const [otpVerified, setOtpVerified] = useState(false);

	const handleReset = () => {
		setData({
			name: "",
			email: "",
			password: "",
		});
		setOtp("");
		setOtpSent(false);
		setOtpVerified(false);
	};

	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		setData((prev) => ({ ...prev, [name]: value }));
	};
	const isValidEmail = (email) => {
		const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return regex.test(email);
	};

	const handleSendOtp = async () => {
		if (!data.name) return toast.error("Enter your full name first");
		if (!data.email) return toast.error("Enter your email first");
		if (!isValidEmail(data.email))
			return toast.error("Enter a valid email address");
		try {
			const res = await axios.post(
				`${API_URL}/api/send-otp`,
				{
					email: data.email,
				},
				{
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
			if (res.data.verified) {
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
			const response = await axios.post(`${API_URL}/api/register`, data);
			if (response.status === 201 || response.status === 200) {
				toast.success("Registration successful. Please login.");
				navigate("/login");
			} else {
				toast.error("Registration failed. Try again.");
			}
		} catch (err) {
			console.error("❌ Error response:", err.response);
			toast.error(err.response?.data?.message || "Email already registered");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="register-page">
			<div className="register-form-container">
				<h2>Sign Up</h2>
				<form onSubmit={onSubmitHandler} className="register-form">
					<input
						type="text"
						name="name"
						placeholder="Full Name"
						value={data.name}
						onChange={onChangeHandler}
						required
					/>
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
												const newOtp = otp.split("");
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
						{!otpVerified ? "Verify OTP First.." : "🚀 Sign Up"}
					</button>

					<p className="login-link">
						Already have an account? <Link to="/login">Sign In</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Register;
