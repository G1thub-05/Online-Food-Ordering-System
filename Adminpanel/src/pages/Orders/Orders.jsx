// import React, { useEffect, useState } from "react";
// import { assets } from "../../assets/assets";
// import { fetchAllOrders, updateOrderStatus } from "../../services/orderService";
// import { toast } from "react-toastify";

// const Orders = () => {
//   const [data, setData] = useState([]);

//   const fetchOrders = async () => {
//     try {
//       const response = await fetchAllOrders();
//       setData(response);
//     } catch (error) {
//       toast.error("Unable to display the orders. Please try again.");
//     }
//   };

//   const updateStatus = async (event, orderId) => {
//     const success = await updateOrderStatus(orderId, event.target.value);
//     if (success) await fetchOrders();
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   return (
//     <div className="container">
//       <div className="py-5 row justify-content-center">
//         <div className="col-11 card">
//           <table className="table table-responsive">
//             <tbody>
//               {data.map((order, index) => {
//                 return (
//                   <tr key={index}>
//                     <td>
//                       <img src={assets.parcel} alt="" height={48} width={48} />
//                     </td>
//                     <td>
//                       <div>
//                         {order.orderedItems.map((item, index) => {
//                           if (index === order.orderedItems.length - 1) {
//                             return item.name + " x " + item.quantity;
//                           } else {
//                             return item.name + " x " + item.quantity + ", ";
//                           }
//                         })}
//                       </div>
//                       <div>{order.userAddress}</div>
//                     </td>
//                     <td>&#x20B9;{order.amount.toFixed(2)}</td>
//                     <td>Items: {order.orderedItems.length}</td>
//                     <td>
//                       <select
//                         className="form-control"
//                         onChange={(event) => updateStatus(event, order.id)}
//                         value={order.orderStatus}
//                       >
//                         <option value="Food Preparing">Food Preparing</option>
//                         <option value="Out for delivery">
//                           Out for delivery
//                         </option>
//                         <option value="Delivered">Delivered</option>
//                       </select>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Orders;

import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { fetchAllOrders, updateOrderStatus } from "../../services/orderService";
import { toast } from "react-toastify";

const Orders = () => {
	const [data, setData] = useState([]);

	const fetchOrders = async () => {
		try {
			const response = await fetchAllOrders();
			setData(response);
		} catch (error) {
			toast.error("Unable to display the orders. Please try again.");
		}
	};

	const updateStatus = async (event, orderId) => {
		const success = await updateOrderStatus(orderId, event.target.value);
		if (success) await fetchOrders();
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	return (
		<div style={styles.container}>
			<h2 style={styles.heading}>All Orders</h2>

			<div style={styles.ordersWrapper}>
				{data.map((order, index) => (
					<div key={index} className="order-box" style={styles.orderBox}>
						<img src={assets.parcel} alt="Parcel" style={styles.image} />

						<div style={styles.details}>
							{order.orderedItems.map((item, idx) => (
								<span key={idx}>
									{item.name} x {item.quantity}
									{idx < order.orderedItems.length - 1 && ", "}
								</span>
							))}
							<span style={styles.address}> — {order.userAddress}</span>
						</div>

						<div style={styles.amount}>₹{order.amount.toFixed(2)}</div>

						<div style={styles.itemCount}>
							Items: {order.orderedItems.length}
						</div>

						{/* <select
							style={styles.select}
							onChange={(e) => updateStatus(e, order.id)}
							value={order.orderStatus}
						>
							<option value="Food Preparing">Food Preparing</option>
							<option value="Out for delivery">Out for delivery</option>
							<option value="Delivered">Delivered</option>
						</select> */}

						{/* <select
							style={styles.select}
							onChange={(e) => updateStatus(e, order.id)}
							value={order.orderStatus}
							disabled={order.orderStatus === "Cancelled"} // 🔐 disable if Cancelled
						>
							<option value="Food Preparing">Food Preparing</option>
							<option value="Out for delivery">Out for delivery</option>
							<option value="Delivered">Delivered</option>
						</select> */}

						{order.orderStatus === "Cancelled" ? (
							<span style={styles.cancelledTag}>Cancelled</span>
						) : (
							<select
								style={styles.select}
								onChange={(e) => updateStatus(e, order.id)}
								value={order.orderStatus}
							>
								<option value="Food Preparing">Food Preparing</option>
								<option value="Out for delivery">Out for delivery</option>
								<option value="Delivered">Delivered</option>
							</select>
						)}
					</div>
				))}
			</div>

			{/* Hover effect for rows */}
			<style>
				{`
        .order-box {
          transition: all 0.25s ease;
        }
        .order-box:hover {
          background-color: #fefefe;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          transform: scale(1.01);
        }
			{/* cancelledTag:hover: {
		transform: "scale(1.06)",
		boxShadow: "0 4px 12px rgba(255, 0, 0, 0.25)",
	} */}


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
			

	
      `}
			</style>
		</div>
	);
};

const styles = {
	container: {
		padding: "1.5rem",
		background: "#f4f4f4",
		fontFamily: "Segoe UI, sans-serif",
		minHeight: "100vh",
	},

	cancelledTag: {
		color: "#ff4d4f",
		fontWeight: 600,
		fontSize: "0.85rem",
		padding: "3px 14px",
		borderRadius: "999px", // full pill
		background: "rgba(255, 77, 79, 0.1)", // soft red glass
		border: "1px solid rgba(255, 77, 79, 0.3)",
		backdropFilter: "blur(6px)", // glassmorphism
		boxShadow: "0 4px 12px rgba(255, 77, 79, 0.2)",
		animation: "pulseRed 1.8s infinite ease-in-out",
		transition: "transform 0.3s ease, box-shadow 0.3s ease",
		userSelect: "none",
		display: "inline-block",
		cursor: "default",
	},

	heading: {
		textAlign: "center",
		fontSize: "1.5rem",
		fontWeight: "600",
		marginBottom: "1rem",
	},
	ordersWrapper: {
		display: "flex",
		flexDirection: "column",
		gap: "0.5rem",
	},
	orderBox: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		background: "#fff",
		padding: "0.6rem 1rem",
		border: "1px solid #e0e0e0",
		flexWrap: "wrap",
	},
	image: {
		width: "40px",
		height: "40px",
		objectFit: "cover",
		marginRight: "1rem",
	},
	details: {
		flex: "1",
		fontSize: "0.95rem",
		fontWeight: "500",
		color: "black", // fallback
		marginRight: "1rem",
		// whiteSpace: "nowrap",
		// overflow: "hidden",
		textOverflow: "ellipsis",
	},
	address: {
		fontSize: "0.9rem",
		background: "linear-gradient(90deg, #000000, #ff0000)",
		WebkitBackgroundClip: "text",
		WebkitTextFillColor: "transparent",
		color: "transparent", // fallback
		fontWeight: "700",
	},
	amount: {
		minWidth: "90px",
		fontWeight: "600",
		fontSize: "0.95rem",
		color: "#ffffff",
		marginRight: "1rem",
		background: "linear-gradient(90deg, #000000, #ff0000)",
		borderRadius: "22px",
		width: "90px",
		margin: "0.5rem auto", // auto horizontally centers
		padding: "0.01rem 0",
		textAlign: "center",
		border: "1px solid #ccc",
	},
	itemCount: {
		minWidth: "80px",
		fontSize: "0.85rem",
		color: "#ff0000",
		margin: "1rem",
		fontWeight: "700",
		textAlign: "center",
		borderRadius: "4px",
		width: "90px",
	},
	select: {
		padding: "4px 8px",
		borderRadius: "4px",
		border: "1px solid #ccc",
		// background: "#f4f4f4",
		background: "linear-gradient(90deg, #000000, #ff0000)",
		WebkitBackgroundClip: "text",
		WebkitTextFillColor: "transparent",
		// color: "transparent", // fallback
		fontWeight: "700",
		fontSize: "0.85rem",
		cursor: "pointer",
	},
};

export default Orders;
