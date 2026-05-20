import React, { useContext, useState } from "react";
import "./Menubar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Menubar = () => {
	const [active, setActive] = useState("home");

	const { quantities, token, setToken, setQuantities } =
		useContext(StoreContext);

	const navigate = useNavigate();

	const uniqueItemsInCart = Object.values(quantities).filter(
		(qty) => qty > 0,
	).length;

	const logout = () => {
		localStorage.removeItem("token");

		setToken("");

		setQuantities({});

		navigate("/");
	};

	return (
		<nav className="minimal-navbar">
			<div className="minimal-navbar-container">
				<Link to="/" className="minimal-brand">
					<img src={assets.logo} alt="logo" className="minimal-logo" />

					{/* <span>Foodies</span> */}
				</Link>

				<div className="minimal-links">
					<Link
						to="/"
						className={
							active === "home" ? "minimal-link active-link" : "minimal-link"
						}
						onClick={() => setActive("home")}
					>
						Home
					</Link>

					<Link
						to="/explore"
						className={
							active === "explore" ? "minimal-link active-link" : "minimal-link"
						}
						onClick={() => setActive("explore")}
					>
						Menu
					</Link>

					<Link
						to="/contact"
						className={
							active === "contact" ? "minimal-link active-link" : "minimal-link"
						}
						onClick={() => setActive("contact")}
					>
						Contact
					</Link>
				</div>

				<div className="minimal-actions">
					<Link to="/cart" className="minimal-cart">
						<img src={assets.cart} alt="cart" width={20} height={20} />

						{uniqueItemsInCart > 0 && (
							<span className="minimal-cart-count">{uniqueItemsInCart}</span>
						)}
					</Link>

					{!token ? (
						<>
							<button
								className="minimal-login"
								onClick={() => navigate("/login")}
							>
								Login
							</button>

							<button
								className="minimal-register"
								onClick={() => navigate("/register")}
							>
								Sign-up
							</button>
						</>
					) : (
						<div className="dropdown">
							<img
								src={assets.profile}
								alt="profile"
								width={38}
								height={38}
								className="minimal-profile dropdown-toggle"
								data-bs-toggle="dropdown"
							/>

							<ul className="dropdown-menu minimal-dropdown">
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
		</nav>
	);
};

export default Menubar;
