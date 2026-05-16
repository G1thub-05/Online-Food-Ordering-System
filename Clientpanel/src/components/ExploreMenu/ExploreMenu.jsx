import React from "react";
import { categories } from "../../assets/assets";
import "./ExploreMenu.css";
import "../../App.css";

const ExploreMenu = ({ category, setCategory }) => {
	return (
		<div className="explore-menu">
			<div className="explore-menu-header">
				<h2>🛒</h2>
				<h2 className="explore-menu-title">Explore Your Taste Now!</h2>
			</div>
			<p className="explore-menu-description">
				"Find what makes your mouth water"
			</p>
			<div className="explore-menu-list">
				{categories.map((item, index) => (
					<div
						key={index}
						tabIndex={-1}
						className={`explore-menu-item ${
							category === item.category ? "active" : ""
						}`}
						onClick={(e) => {
							e.preventDefault();
							setCategory((prev) =>
								prev === item.category ? "All" : item.category,
							);
							e.currentTarget.blur();
						}}
					>
						<div className="menu-image-wrapper">
							<img src={item.icon} alt={item.category} />
						</div>
						<p className={category === item.category ? "text-active" : ""}>
							{item.category}
						</p>
					</div>
				))}
			</div>
			<hr />
		</div>
	);
};

export default ExploreMenu;
