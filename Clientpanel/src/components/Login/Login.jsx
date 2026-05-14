import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../service/authService";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import "./Login.css";
import "../../App.css";

const Login = () => {
	const { setToken, loadCartData } = useContext(StoreContext);
	const navigate = useNavigate();
	const [data, setData] = useState({ email: "", password: "" });

	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		setData((prev) => ({ ...prev, [name]: value }));
	};

	const [showPassword, setShowPassword] = useState(false); // 👈 Add this state

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			const response = await login(data);
			if (response.status === 200) {
				setToken(response.data.token);
				localStorage.setItem("token", response.data.token);
				const token = localStorage.getItem("token"); // ✅ this should return the actual JWT
				console.log("Login token:", token);
				toast.success("Login successful!");
				await loadCartData(response.data.token);
				navigate("/");
			} else {
				toast.error("Unable to login. Please try again.");
			}
		} catch (error) {
			toast.error("Unable to login. Please try again.");
		}
	};

	return (
		<>
			{/* <nav className="navbar">
				<div className="navbar-brand">Foodies</div>
			</nav> */}
			<div className="login-wrapper">
				<form className="form" onSubmit={onSubmitHandler}>
					<h2 className="title">Welcome Back</h2>

					<div className="form_control">
						<input
							type="email"
							className="input"
							name="email"
							placeholder=" "
							value={data.email}
							onChange={onChangeHandler}
							required
						/>
						<label className="label">Email</label>
					</div>

					{/* <div className="form_control">
						<input
							type="password"
							className="input"
							name="password"
							placeholder=" "
							value={data.password}
							onChange={onChangeHandler}
							required
						/>
						<label className="label">Password</label>
					</div> */}
					<div className="form_control">
						<input
							type={showPassword ? "text" : "password"}
							className="input"
							name="password"
							placeholder=" "
							value={data.password}
							onChange={onChangeHandler}
							required
						/>
						<label className="label">Password</label>

						{/* 👁 Show/Hide Password Toggle */}
						<span
							className="toggle-password"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? "🙈" : "👁️"}
						</span>
					</div>

					<button type="submit">Login</button>

					<div className="bottom_text">
						Don't have an account ?{"   "}
						<Link to="/register" className="swtich">
							Sign up
						</Link>
						<br />
						<Link to="/forgot-password" className="swtich">
							Forgot Password ?
						</Link>
					</div>
				</form>
			</div>
		</>
	);
};

export default Login;
