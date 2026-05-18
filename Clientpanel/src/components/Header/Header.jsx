import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import "../../App.css";

const Header = () => {
	return (
		<header className="hero-header">
			<div className="hero-overlay"></div>

			<div className="hero-container">
				<div className="hero-badge">🔥 Fast Delivery Across Your City</div>

				<h1 className="hero-title">
					Fresh Food.
					<br />
					<span>Delivered Hot.</span>
				</h1>

				<p className="hero-description">
					Discover delicious meals from top restaurants near you. Enjoy
					lightning-fast delivery, premium taste, and a modern food ordering
					experience — all in just a few taps.
				</p>

				<div className="hero-buttons">
					<Link to="/explore" className="hero-button primary-btn">
						🍔 Explore Menu
					</Link>

					<Link to="/cart" className="hero-button secondary-btn">
						🛒 View Cart
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
