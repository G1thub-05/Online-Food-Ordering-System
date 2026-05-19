import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { fetchUserOrders, cancelOrder } from "../../service/orderService";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

import "./MyOrders.css";

const MyOrders = () => {
	const { token } = useContext(StoreContext);

	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState("All");
	const [darkMode, setDarkMode] = useState(false);

	const fetchOrders = async () => {
		setLoading(true);

		try {
			const response = await fetchUserOrders(token);

			setData(response);

			setFilteredData(response);

			setFilter("All");
		} catch (error) {
			console.error("Error fetching orders:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleFilterChange = (e) => {
		const value = e.target.value;

		setFilter(value);

		if (value === "All") {
			setFilteredData(data);
		} else if (value === "preparing_group") {
			setFilteredData(
				data.filter(
					(order) =>
						order.orderStatus === "Food Preparing" ||
						order.orderStatus === "Preparing",
				),
			);
		} else {
			setFilteredData(data.filter((order) => order.orderStatus === value));
		}
	};

	useEffect(() => {
		if (token) fetchOrders();
	}, [token]);

	useEffect(() => {
		document.body.classList.toggle("dark-mode", darkMode);
	}, [darkMode]);

	return (
		<div className={`container py-5 ${darkMode ? "text-light" : ""}`}>
			<div className="orders-header">
				<h2>
					🛒
					<span className="orders-title-gradient">My Orders</span>
				</h2>

				<div className="orders-controls">
					<select
						className="form-select shadow"
						value={filter}
						onChange={handleFilterChange}
					>
						<option value="All">All</option>

						<option value="preparing_group">Food Preparing</option>
						<option value="Out for delivery">Out for Delivery</option>
						<option value="Cancelled">Cancelled</option>
						<option value="Delivered">Delivered</option>
					</select>

					<button
						className="btn btn-outline-secondary"
						onClick={() => setDarkMode((prev) => !prev)}
						title="Toggle Theme"
					>
						<i
							className={`bi ${darkMode ? "bi-sun-fill" : "bi-moon-fill"}`}
						></i>
					</button>
				</div>
			</div>

			{loading ? (
				<p>Loading orders...</p>
			) : filteredData.length === 0 ? (
				<p>No orders found.</p>
			) : (
				filteredData.map((order, index) => {
					const totalItems = order.orderedItems.reduce(
						(total, item) => total + item.quantity,
						0,
					);

					const getStatusAnimation = (status) => {
						switch (status.toLowerCase()) {
							case "delivered":
								return "pulseGreen";

							case "cancelled":
								return "pulseRed";

							case "preparing":
							case "food preparing":
								return "pulseYellow";

							case "out for delivery":
								return "pulseYellow";

							default:
								return "";
						}
					};

					return (
						<div key={index} className="order-card">
							<div className="order-line">
								<div className="item-info">
									<img src={assets.delivery} alt="Order" />

									<div className="item-details">
										<div className="item-name">
											{order.orderedItems.map((item, i) => (
												<span key={i}>
													{item.name}
													{" × "}

													<span className="item-qty">{item.quantity}</span>

													{i < order.orderedItems.length - 1 && ", "}
												</span>
											))}
										</div>

										<div className="order-meta">
											🛒
											<span className="badge text-bg-warning">
												Total Items: {totalItems}
											</span>
											<span className="address">
												Address: {order.userAddress || "Your saved address"}
											</span>
										</div>
									</div>
								</div>

								<div className="status-price">
									<div className="price-box">₹{order.amount.toFixed(2)}</div>

									<div
										className={`status-pill ${
											order.orderStatus === "Delivered"
												? "bg-success"
												: order.orderStatus === "Out for delivery"
													? "bg-warning"
													: order.orderStatus === "Cancelled"
														? "bg-danger"
														: "bg-warning text-dark"
										} ${getStatusAnimation(order.orderStatus)}`}
									>
										<i
											className={`bi ${
												order.orderStatus === "Delivered"
													? "bi-check-circle-fill"
													: order.orderStatus === "Out for delivery"
														? "bi-truck"
														: order.orderStatus === "Cancelled"
															? "bi-x-circle-fill"
															: "bi-hourglass-split"
											}`}
										></i>

										{order.orderStatus}
									</div>

									{order.orderStatus !== "Delivered" &&
										order.orderStatus !== "Cancelled" && (
											<button
												className="btn btn-outline-danger"
												onClick={async () => {
													const confirmCancel = confirm(
														"Are you sure you want to cancel this order?",
													);

													if (!confirmCancel) return;
													try {
														await cancelOrder(order.id, token);
														toast.success("Order Cancelled");
														await fetchOrders();
													} catch (error) {
														toast.error("Failed to cancel order.");
													}
												}}
											>
												<i className="bi bi-x-circle me-1"></i>
												Cancel
											</button>
										)}

									<button
										className="refresh-btn"
										onClick={fetchOrders}
										title="Refresh Orders"
									>
										<i className="bi bi-arrow-clockwise"></i>
									</button>
								</div>
							</div>
						</div>
					);
				})
			)}
		</div>
	);
};

export default MyOrders;
