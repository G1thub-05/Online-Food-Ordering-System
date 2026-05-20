import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Users.css";
import { API_URL } from "../../util/constants";
const Users = ({ sidebarVisible }) => {
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState("");

	/* ========================================= */
	/* FETCH USERS */
	/* ========================================= */

	const fetchUsers = async () => {
		try {
			const res = await axios.get(`${API_URL}/api/users`);

			setUsers(res.data);
		} catch (error) {
			console.log(error);

			toast.error("Failed to fetch users");
		}
	};

	/* ========================================= */
	/* DELETE USER */
	/* ========================================= */

	const handleDelete = async (id, name) => {
		const confirmDelete = window.confirm(
			`Are you sure you want to delete ${name}?`,
		);

		if (!confirmDelete) return;

		try {
			await axios.delete(`${API_URL}/api/users/${id}`);

			toast.success("User deleted successfully");

			fetchUsers();
		} catch (error) {
			console.log(error);

			toast.error("Failed to delete user");
		}
	};

	/* ========================================= */
	/* USE EFFECT */
	/* ========================================= */

	useEffect(() => {
		fetchUsers();
	}, []);
	const filteredUsers = users.filter(
		(user) =>
			user.name.toLowerCase().includes(search.toLowerCase()) ||
			user.email.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<div
			className={`users-wrapper ${
				sidebarVisible ? "sidebar-open" : "sidebar-close"
			}`}
		>
			<div className="users-page">
				<div className="users-header">
					<h2 className="users-title">
						<i className="bi bi-people-fill"></i>
						All Users
					</h2>
					<div className="users-search">
						<i className="bi bi-search"></i>

						<input
							type="text"
							placeholder="Search by name or email..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
				</div>

				<div className="users-grid">
					{filteredUsers.length > 0 ? (
						filteredUsers.map((user) => (
							<div key={user.id} className="user-card">
								<img
									src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
									alt="user"
									className="user-avatar"
								/>

								<h3 className="user-name">{user.name}</h3>

								<p className="user-email">{user.email}</p>

								<button
									className="user-delete-btn"
									onClick={() => handleDelete(user.id, user.name)}
								>
									<i className="bi bi-trash3-fill"></i>
									Delete
								</button>
							</div>
						))
					) : (
						<div className="empty-users">
							<i className="bi bi-person-x-fill"></i>

							<p>No users found</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Users;
