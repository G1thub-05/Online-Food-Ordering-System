import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Sidebar.css";

const Sidebar = ({ sidebarVisible, setSidebarVisible }) => {
	return (
		<>
			{/* MOBILE TOGGLE */}

			<button
				className="sidebar-toggle"
				onClick={() => setSidebarVisible(!sidebarVisible)}
			>
				<i className="bi bi-list"></i>
			</button>

			<div className={`sidebar ${sidebarVisible ? "show" : "hide"}`}>
				{/* HEADER */}

				<div className="sidebar-header">
					<img src={assets.logo} alt="Logo" className="sidebar-logo" />

					<span className="sidebar-title">Admin Panel</span>
				</div>

				{/* LINKS */}

				<nav className="sidebar-links">
					<NavLink
						to="/add"
						className={({ isActive }) =>
							`sidebar-link ${isActive ? "active" : ""}`
						}
					>
						<i className="bi bi-plus-circle me-2"></i>
						Add Food
					</NavLink>

					<NavLink
						to="/list"
						className={({ isActive }) =>
							`sidebar-link ${isActive ? "active" : ""}`
						}
					>
						<i className="bi bi-list-ul me-2"></i>
						List Food
					</NavLink>

					<NavLink
						to="/orders"
						className={({ isActive }) =>
							`sidebar-link ${isActive ? "active" : ""}`
						}
					>
						<i className="bi bi-cart me-2"></i>
						Orders
					</NavLink>
					<NavLink
						to="/users"
						className={({ isActive }) =>
							`sidebar-link ${isActive ? "active" : ""}`
						}
					>
						<i className="bi bi-people me-2"></i>
						Users
					</NavLink>
				</nav>
			</div>
		</>
	);
};

export default Sidebar;
