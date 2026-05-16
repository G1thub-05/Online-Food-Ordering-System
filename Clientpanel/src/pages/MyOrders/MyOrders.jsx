import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { fetchUserOrders } from "../../service/orderService";
import { assets } from "../../assets/assets";
import { cancelOrder } from "../../service/orderService";

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
			<style>{`

				@keyframes pulseYellow {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.6);
    }
    70% {
      transform: scale(1.03);
      box-shadow: 0 0 0 8px rgba(255, 193, 7, 0);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(255, 193, 7, 0);
    }
  }

  @keyframes pulseRed {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(255, 77, 79, 0.6);
    }
    70% {
      transform: scale(1.03);
      box-shadow: 0 0 0 8px rgba(255, 77, 79, 0);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(255, 77, 79, 0);
    }
  }

  @keyframes pulseGreen {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.6);
    }
    70% {
      transform: scale(1.03);
      box-shadow: 0 0 0 8px rgba(76, 175, 80, 0);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
    }
  }

  .pulseRed {
	animation: pulseRed 1.8s infinite ease-in-out;
}
.pulseGreen {
	animation: pulseGreen 1.8s infinite ease-in-out;
}
.pulseYellow {
	animation: pulseYellow 1.8s infinite ease-in-out;
}


				.dark-mode {
					background-color: #000 !important;
					color: #fff !important;
				}
				.order-card {
					background: rgba(255, 255, 255, 0.1);
					backdrop-filter: blur(6px);
					border: 1px solid rgba(255, 255, 255, 0.2);
					border-radius: 16px;
					padding: 16px;
					box-shadow: 0 4px 10px rgba(0,0,0,0.1);
					margin-bottom: 20px;
					transition: background-position 1s ease, transform 0.2s ease, box-shadow 0.2s ease;
				}

				.order-card:hover {
				background-position: right center;
				transform: translateY(2px) scale(0.99); /* press effect */
				box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.15), -5px -5px 15px rgba(255, 255, 255, 0.8);
				}

				.order-line {
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					justify-content: space-between;
					gap: 12px;
				}
				.item-info {
					display: flex;
					align-items: center;
					gap: 12px;
					flex: 1;
					min-width: 250px;
				}
				.item-info img {
					height: 50px;
					width: 50px;
				}
				.item-details {
					display: flex;
					flex-direction: column;
					gap: 4px;

				}
				.item-name {
					font-weight: 600;
				}
				.item-qty {
					color: red;
					font-weight: 600;
				}
				.address {
					font-size: 1rem;
					font-weight: "700";
					color: "#555";
				}
				.dark-mode .address {
				background: linear-gradient(135deg, #ff0000, #2575fc, #00d4ff);

				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
}
				.status-price {
					display: flex;
					align-items: center;
					gap: 12px;
					flex-wrap: wrap;
				}
				.price-box {
					background: linear-gradient(to right, #000, #f00);
					color: #fff;
					padding: 3px 10px;
					border-radius: 10px;
					font-weight: bold;
					font-size: 0.85rem;
					white-space: nowrap;
				}
				.status-pill {
					padding: 3px 10px;
					border-radius: 20px;
					font-weight: 500;
					color: white;
					display: flex;
					align-items: center;
					gap: 6px;
					font-size: 0.85rem;
					{/* animation: pulseRed 1.8s infinite ease-in-out; */}
					transition: transform 0.3s ease, box-shadow 0.3s ease;
				}



				.refresh-btn {
					background-color: white;
					border: none;
					border-radius: 50%;
					width: 34px;
					height: 34px;
					cursor: pointer;
					display: flex;
					align-items: center;
					justify-content: center;
					transition: all 0.4s ease;
					box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
				}

				.refresh-btn i {
					transition: transform 0.5s ease;
					font-size: 1.1rem;
					color: black;
				}

				.refresh-btn:hover i {
					transform: rotate(180deg);
					color: green;
				}
				.dark-mode .refresh-btn:hover i{
					transform: rotate(180deg);
					color: green;
				}


				.dark-mode .refresh-btn {
					background-color: white;
				}


				.text-muted {
					color: black !important;
				}

				.dark-mode .text-muted {
					color: white !important;
				}
				.status-price .btn-outline-danger {
					padding: 6px 12px;
					font-size: 0.85rem;
				}


`}</style>

			<div className="d-flex justify-content-between align-items-center mb-4">
				<h2>
					🛒{" "}
					<span
						style={{
							background: "linear-gradient(135deg, #6a11cb, #2575fc, #00d4ff)",
							WebkitBackgroundClip: "text",
							backgroundClip: "text",
							color: "transparent",
							fontSize: "1.8rem",
							fontWeight: "bold",
							WebkitTextFillColor: "transparent",
						}}
					>
						My Orders
					</span>
				</h2>
				<div className="d-flex align-items-center gap-3">
					<select
						className="form-select shadow"
						value={filter}
						onChange={handleFilterChange}
					>
						<option value="All">All</option>
						<option value="preparing_group">Food Preparing</option>{" "}
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
													{item.name} ×{" "}
													<span className="item-qty">{item.quantity}</span>
													{i < order.orderedItems.length - 1 && ", "}
												</span>
											))}
										</div>
										<div
											className="text-muted"
											style={{
												fontSize: ".9rem",
											}}
										>
											🛒
											<span class="badge text-bg-warning">
												Total Items: {totalItems}
											</span>
											<span className="address">
												{" "}
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
													? "bg-info"
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
													if (
														window.confirm(
															"Are you sure you want to cancel this order?",
														)
													) {
														try {
															await cancelOrder(order.id, token);
															// await fetchOrders(); // Refresh order list
														} catch (error) {
															alert("Failed to cancel order.");
														}
													}
												}}
											>
												<i className="bi bi-x-circle me-1"></i> Cancel
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
