import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

import {
	fetchAllOrders,
	updateOrderStatus,
	deleteOrder,
} from "../../services/orderService";

import { toast } from "react-toastify";

import "./Orders.css";

const Orders = () => {
	const [data, setData] = useState([]);

	const [filterStatus, setFilterStatus] = useState("All");

	/* ========================================= */
	/* FETCH ORDERS */
	/* ========================================= */

	const fetchOrders = async () => {
		try {
			const response = await fetchAllOrders();

			console.log(response);

			setData(response);
		} catch (error) {
			console.log(error);

			toast.error("Unable to fetch orders");
		}
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	/* ========================================= */
	/* UPDATE STATUS */
	/* ========================================= */

	const updateStatus = async (event, orderId) => {
		const newStatus = event.target.value;

		try {
			await updateOrderStatus(orderId, newStatus);

			/* REFRESH */

			await fetchOrders();

			toast.success(`Order marked as ${newStatus}`);
		} catch (error) {
			console.log(error);

			toast.error("Failed to update order");
		}
	};

	/* ========================================= */
	/* DELETE ORDER */
	/* ========================================= */

	const handleDelete = async (orderId) => {
		try {
			const confirmDelete = window.confirm("Delete this order?");

			if (!confirmDelete) return;
			await deleteOrder(orderId);

			/* REFRESH */

			await fetchOrders();

			toast.success("Order deleted");
		} catch (error) {
			console.log(error);

			toast.error("Failed to delete order");
		}
	};

	/* ========================================= */
	/* FILTER */
	/* ========================================= */

	const filteredOrders =
		filterStatus === "All"
			? data
			: data.filter((order) => order.orderStatus === filterStatus);

	return (
		<div className="orders-container">
			{/* ========================================= */}
			{/* TOPBAR */}
			{/* ========================================= */}

			<div className="orders-topbar">
				<div className="filter-box">
					<i className="fa-solid fa-filter"></i>

					<select
						value={filterStatus}
						onChange={(e) => setFilterStatus(e.target.value)}
						className="filter-select"
					>
						<option value="All">All Orders</option>

						<option value="Food Preparing">Food Preparing</option>

						<option value="Out for delivery">Out for delivery</option>

						<option value="Delivered">Delivered</option>

						<option value="Cancelled">Cancelled</option>
					</select>
				</div>
			</div>

			{/* ========================================= */}
			{/* ORDERS */}
			{/* ========================================= */}

			<div className="orders-wrapper">
				{filteredOrders.length > 0 ? (
					filteredOrders.map((order, index) => (
						<div key={index} className="order-box">
							{/* IMAGE */}

							<img src={assets.parcel} alt="Parcel" className="order-image" />

							{/* DETAILS */}

							<div className="order-details">
								<div className="items-text">
									{order.orderedItems?.map((item, idx) => (
										<span key={idx}>
											{item.name} x{" "}
											<strong className="qty-text">{item.quantity}</strong>
											{idx < order.orderedItems.length - 1 && ", "}
										</span>
									))}
								</div>

								<span className="order-address">{order.userAddress}</span>
							</div>

							{/* ITEM COUNT */}

							<div className="item-count">
								Items: <strong>{order.orderedItems?.length}</strong>
							</div>

							{/* AMOUNT */}

							<div className="order-amount">₹{order.amount?.toFixed(2)}</div>

							{/* ACTIONS */}

							<div className="order-actions">
								{/* STATUS */}

								<select
									className={`status-select ${
										order.orderStatus === "Cancelled"
											? "cancelled-tag"
											: order.orderStatus === "Out for delivery"
												? "out-delivery"
												: order.orderStatus === "Delivered"
													? "delivered-tag"
													: "preparing-tag"
									}`}
									onChange={(e) => updateStatus(e, order._id || order.id)}
									value={order.orderStatus}
								>
									<option value="Food Preparing">🥣 Food Preparing</option>

									<option value="Out for delivery">🚚 Out for delivery</option>

									<option value="Delivered">✅ Delivered</option>

									<option
										value="Cancelled"
										disabled={order.orderStatus === "Cancelled"}
									>
										❌ Cancelled
									</option>
								</select>

								{/* REFRESH */}

								<button
									className="refresh-btn"
									// onClick={fetchOrders}
									onClick={() => {
										fetchOrders();

										toast.success("Order refreshed", {
											position: "top-right",
											autoClose: 1000,
											theme: "transparent",
											style: {
												color: "black",
											},
										});
									}}
									title="Refresh"
								>
									<i className="bi bi-arrow-clockwise"></i>
								</button>

								{/* DELETE */}

								<button
									className="delete-btn"
									onClick={() => handleDelete(order._id || order.id)}
									title="Delete Order"
								>
									🗑️
								</button>
							</div>
						</div>
					))
				) : (
					<div className="no-orders">No orders found 😕</div>
				)}
			</div>
		</div>
	);
};

export default Orders;
