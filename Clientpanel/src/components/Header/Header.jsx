import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import "../../App.css";

const Header = () => {
	return (
		<header className="hero-header">
			<div className="hero-container">
				<div className="hero-title-container">
					{/* <h1 className="hero-title">Order your favorite food here</h1> */}
					<h1 className="hero-title">“Feel the flavor, love the bite.”</h1>
					{/* <h1>🚀</h1> */}
				</div>
				<p className="hero-description">
					Craving something delicious? Tap, order, and relax—your food is on the
					way! We deliver piping-hot meals from local favorites, faster than you
					can say “extra cheese.” Order in seconds. Eat in minutes. Get hot,
					fresh meals from your favorite spots—delivered fast, without the fuss.
				</p>
				<Link to="/explore" className="hero-button">
					🚀 Explore Now
				</Link>
			</div>
		</header>
	);
};

export default Header;
