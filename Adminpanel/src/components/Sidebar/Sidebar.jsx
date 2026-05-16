
import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = ({ sidebarVisible }) => {
	return (
		<div
			className={`sidebar bg-white border-end ${
				sidebarVisible ? "" : "collapsed"
			}`}
		>
			<div className="sidebar-header d-flex align-items-center px-3 py-2 border-bottom">
				<img src={assets.logo} alt="Logo" className="logo" />
				<span className="ms-2 fw-semibold">Admin Panel</span>
			</div>

			<nav className="sidebar-links mt-3">
				<NavLink
					to="/add"
					className={({ isActive }) =>
						`sidebar-link ${isActive ? "active" : ""}`
					}
				>
					<i className="bi bi-plus-circle me-2" /> Add Food
				</NavLink>
				<NavLink
					to="/list"
					className={({ isActive }) =>
						`sidebar-link ${isActive ? "active" : ""}`
					}
				>
					<i className="bi bi-list-ul me-2" /> List Food
				</NavLink>
				<NavLink
					to="/orders"
					className={({ isActive }) =>
						`sidebar-link ${isActive ? "active" : ""}`
					}
				>
					<i className="bi bi-cart me-2" /> Orders
				</NavLink>
			</nav>

			<style>{`
        .sidebar {
          width: 240px;
          transition: all 0.3s ease;
          min-height: 100vh;
        }

        .collapsed {
          width: 0;
          overflow: hidden;
        }

        .sidebar-header .logo {
          width: 32px;
          height: 32px;
        }

        .sidebar-link {
          display: block;
          padding: 0.75rem 1.25rem;
          color: #333;
          text-decoration: none;
          font-weight: 500;
          border-left: 4px solid transparent;
          transition: all 0.3s ease;
        }

        .sidebar-link:hover {
          background: #f4f6f8;
          color: #007bff;
          border-left-color: #007bff;
        }

        .sidebar-link.active {
          background: #e9f2ff;
          border-left-color: #007bff;
          color: #007bff;
        }
      `}</style>
		</div>
	);
};

export default Sidebar;
