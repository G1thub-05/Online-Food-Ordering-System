import React, { useContext, useState } from "react";
import "./Menubar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "../../App.css";

const Menubar = () => {
	const [active, setActive] = useState("home");
	const { quantities, token, setToken, setQuantities } =
		useContext(StoreContext);
	const uniqueItemsInCart = Object.values(quantities).filter(
		(qty) => qty > 0
	).length;
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem("token");
		setToken("");
		setQuantities({});
		navigate("/");
	};
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container">
				<Link to="/">
					<img
						src={assets.logo}
						alt=""
						className="mx-4"
						height={60}
						width={60}
					/>
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link
								className={
									active === "home" ? "nav-link fw-bold active" : "nav-link"
								}
								to="/"
								onClick={() => setActive("home") & navigate("/")}
							>
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className={
									active === "explore" ? "nav-link fw-bold active" : "nav-link"
								}
								to="/explore"
								onClick={() => setActive("explore")}
							>
								Explore
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className={
									active === "contact-us"
										? "nav-link fw-bold active"
										: "nav-link"
								}
								to="/contact"
								onClick={() => setActive("contact-us")}
							>
								Contact us
							</Link>
						</li>
					</ul>
					<div className="d-flex align-items-center gap-4">
						<Link to={`/cart`}>
							<div className="position-relative">
								<img
									src={assets.cart}
									alt=""
									height={28}
									width={28}
									className="position-relative"
								/>
								<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
									{uniqueItemsInCart}
								</span>
							</div>
						</Link>
						{!token ? (
							<>
								<button
									// className="btn btn-outline-primary btn-sm"
									className="login-btn"
									onClick={() => navigate("/login")}
								>
									Login
								</button>
								<button
									// className="btn btn-outline-success btn-sm"
									className="register-btn"
									onClick={() => navigate("/register")}
								>
									Register
								</button>
							</>
						) : (
							<div className="dropdown text-end">
								<a
									href="#"
									className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<img
										src={assets.profile}
										alt=""
										width={32}
										height={32}
										className="rounded-circle"
									/>
								</a>
								<ul className="dropdown-menu text-small">
									<li
										className="dropdown-item"
										onClick={() => navigate("/myorders")}
									>
										Orders
									</li>
									<li className="dropdown-item" onClick={logout}>
										Logout
									</li>
								</ul>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Menubar;
