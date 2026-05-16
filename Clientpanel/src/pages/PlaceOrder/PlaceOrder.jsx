import React, { useContext, useState, useRef } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCartItems } from "../../service/cartService";
import { calculateCartTotals } from "../../util/cartUtils";
import { RAZORPAY_KEY } from "../../util/constants";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import "../../App.css";
import {
	createOrder,
	deleteOrder,
	verifyPayment,
} from "../../service/orderService";
import axios from "axios";
import Razorpay from "razorpay";

const PlaceOrder = () => {
	const { foodList, quantities, setQuantities, token } =
		useContext(StoreContext);
	const navigate = useNavigate();
	const printRef = useRef();

	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		address: "",
		state: "",
		city: "",
		zip: "",
	});

	// Handle page reloads
	useEffect(() => {
		const handleBeforeUnload = (event) => {
			sessionStorage.setItem("reloaded", "true");
			event.preventDefault(); // Required for Firefox
			event.returnValue = ""; // ✅ This triggers the confirmation dialog in most browsers
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	// const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

	const onChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setForm((Form) => ({ ...Form, [name]: value }));
	};

	const cartItems = foodList.filter((item) => quantities[item.id] > 0);
	// const cartItems = foodList.filter((food) => quantities[food.id] > 0);
	const { subtotal, shipping, tax, total } = calculateCartTotals(
		cartItems,
		quantities,
	);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!emailRegex.test(form.email)) {
			toast.error("Please enter a valid email.");
			return;
		}

		// ✅ Indian phone number validation (10 digits only, optional +91)
		const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/;

		if (!phoneRegex.test(form.phoneNumber)) {
			toast.error("Enter a valid 10-digit Indian number.");
			return;
		}
		const zipRegex = /^[1-9][0-9]{5}$/;
		if (!zipRegex.test(form.zip)) {
			toast.error("Enter a valid 6-digit Indian zip code.");
			return;
		}
		const fullAddress = `${form.firstName} ${form.lastName}, ${form.address}, ${form.city}, ${form.state}, ${form.zip}`;
		const orderData = {
			userAddress: fullAddress,
			phoneNumber: form.phoneNumber,
			email: form.email,
			orderedItems: cartItems.map((item) => ({
				foodId: item.foodId,
				quantity: quantities[item.id],
				price: item.price * quantities[item.id],
				category: item.category,
				imageUrl: item.imageUrl,
				description: item.description,
				name: item.name,
			})),
			// amount: total.toFixed(2),
			// amount: Number(total.toFixed(2)), // ✅ Send numeric amount like 499.99
			amount: Math.round(total * 100) / 100, // Still 2 decimals, but a number

			orderStatus: "Preparing",
		};

		try {
			const res = await createOrder(orderData, token);
			console.log("🔁 Razorpay order response from backend:", res); // 👈 Add this line

			if (res.razorpayOrderId) {
				initRazorpay(res);
			} else {
				toast.error("Order failed.");
			}
		} catch (error) {
			console.error("❌ Order submission error:", error); // Optional detailed error logging
			toast.error("Order submission error.");
		}
	};

	const initRazorpay = (order) => {
		const options = {
			key: RAZORPAY_KEY,
			amount: order.amount,
			currency: "INR",
			name: "Digeshwar Foodies",
			description: "Food Order Payment",
			order_id: order.razorpayOrderId,
			handler: verifyHandler,
			prefill: {
				name: `${form.firstName} ${form.lastName}`,
				email: form.email,
				contact: form.phoneNumber,
			},
			theme: { color: "#000" },
			// modal: { ondismiss: () => deleteOrder(order._id, token) },
			modal: { ondismiss: () => deleteOrderHandler(order._id, token) },
		};

		const rz = new window.Razorpay(options);
		rz.open();
	};

	const verifyHandler = async (res) => {
		try {
			const success = await verifyPayment(
				{
					razorpay_payment_id: res.razorpay_payment_id,
					razorpay_order_id: res.razorpay_order_id,
					razorpay_signature: res.razorpay_signature,
				},
				token,
			);
			if (success) {
				toast.success("Payment successful");
				await clearCartItems(token, setQuantities);
				navigate("/myorders");
			} else {
				toast.error("Payment failed ho gya bhai");
				navigate("/");
			}
		} catch {
			toast.error("Payment verification failed.");
		}
	};

	const deleteOrderHandler = async (orderId) => {
		try {
			await deleteOrder(orderId, token);
		} catch (error) {
			toast.error("Something went wrong. Contact support.");
		}
	};

	const handlePrint = () => {
		const printContent = printRef.current.innerHTML;
		const win = window.open();
		win.document.write(`<html><body>${printContent}</body></html>`);
		win.document.close();
		win.print();
	};

	const isFormComplete = Object.values(form).every((val) => val.trim() !== "");

	return (
		<div style={styles.wrapper}>
			<h2 style={styles.title}>🛒 Place Your Order</h2>
			<div style={styles.container}>
				<form onSubmit={handleSubmit} style={styles.form}>
					<h2
						style={{
							fontSize: "22px",
							fontWeight: "700",
							marginBottom: "12px",
							color: "#333",
						}}
					>
						🚚 Your Delivery Details
					</h2>
					<div style={styles.row}>
						<input
							name="firstName"
							value={form.firstName}
							onChange={onChange}
							placeholder="First Name"
							required
							style={styles.input}
						/>
						<input
							name="lastName"
							value={form.lastName}
							onChange={onChange}
							placeholder="Last Name"
							required
							style={styles.input}
						/>
					</div>
					<div style={styles.row}>
						<input
							name="email"
							value={form.email}
							onChange={onChange}
							placeholder="Email"
							required
							type="email"
							style={styles.input}
						/>
						<input
							name="phoneNumber"
							value={form.phoneNumber}
							onChange={onChange}
							placeholder="Phone"
							required
							style={styles.input}
						/>
					</div>
					<input
						name="address"
						value={form.address}
						onChange={onChange}
						placeholder="Address"
						required
						style={styles.inputFull}
					/>
					<div style={styles.row}>
						<input
							name="city"
							value={form.city}
							onChange={onChange}
							placeholder="City"
							required
							style={styles.input}
						/>
						<input
							name="state"
							value={form.state}
							onChange={onChange}
							placeholder="State"
							required
							style={styles.input}
						/>
						<input
							name="zip"
							value={form.zip}
							onChange={onChange}
							placeholder="ZIP"
							required
							style={styles.input}
						/>
					</div>

					<button
						type="submit"
						disabled={!isFormComplete || cartItems.length === 0}
						onMouseOver={(e) => {
							e.target.style.backgroundPosition = "right center";
							e.target.style.transform = "translateY(2px) scale(0.97)";
							e.target.style.boxShadow = "0 8px 24px rgba(0, 39, 212, 0.6)";
						}}
						onMouseOut={(e) => {
							e.target.style.background =
								"linear-gradient(135deg, #ff0000, #000000, #0000ff)";
							e.target.style.backgroundPosition = "left center";
							e.target.style.backgroundSize = "200% 200%";
							e.target.style.transform = "none";
							e.target.style.boxShadow = "0 5px 15px rgba(212, 0, 0, 0.4)";
							e.target.style.transition =
								"background-position 1s ease, transform 0.2s ease, box-shadow 0.2s ease";
						}}
						style={{
							...styles.button,
							opacity: isFormComplete ? 1 : 0.5,
							cursor: isFormComplete ? "pointer" : "not-allowed",
						}}
					>
						{isFormComplete
							? `🔐 Pay Securely ₹${total.toFixed(2)}`
							: "⚠️ Please fill all fields to enable payment"}
					</button>

					<button
						type="button"
						disabled={!isFormComplete || cartItems.length === 0}
						onClick={handlePrint}
						onMouseOver={(e) => {
							e.target.style.backgroundPosition = "right center";
							e.target.style.transform = "translateY(2px) scale(0.97)";
							e.target.style.boxShadow = "0 8px 24px rgba(0, 39, 212, 0.6)";
						}}
						onMouseOut={(e) => {
							e.target.style.background =
								"linear-gradient(135deg, #ff0000, #000000, #0000ff)";
							e.target.style.backgroundPosition = "left center";
							e.target.style.backgroundSize = "200% 200%";
							e.target.style.transform = "none";
							e.target.style.boxShadow = "0 5px 15px rgba(212, 0, 0, 0.4)";
							e.target.style.transition =
								"background-position 1s ease, transform 0.2s ease, box-shadow 0.2s ease";
						}}
						style={{
							...styles.button,
							opacity: isFormComplete ? 1 : 0.5,
							cursor: isFormComplete ? "pointer" : "not-allowed",
						}}
					>
						{isFormComplete
							? "🖨 Tap to Print Receipt"
							: "⚠️ Please fill all fields to enable Print"}
					</button>
				</form>

				<div style={styles.summary} ref={printRef}>
					<h2
						style={{
							fontSize: "22px",
							fontWeight: "700",
							marginBottom: "12px",
							color: "#333",
						}}
					>
						🛍️ Cart Summary
					</h2>

					<div style={{ maxHeight: "230px", overflowY: "auto" }}>
						{cartItems.map((item) => (
							<div key={item.id} style={styles.cartItem}>
								<span>
									{item.name} × {quantities[item.id]}
								</span>
								<span>₹{item.price * quantities[item.id]}</span>
							</div>
						))}
					</div>
					<hr style={styles.divider} />
					<div style={styles.totalLine}>
						<span>Subtotal:</span>
						<span>₹{subtotal.toFixed(2)}</span>
					</div>
					<div style={styles.totalLine}>
						<span>Shipping:</span>
						<span>₹{shipping.toFixed(2)}</span>
					</div>
					<div style={styles.totalLine}>
						<span>Tax (10%):</span>
						<span>₹{tax.toFixed(2)}</span>
					</div>
					<div
						style={{
							...styles.totalLine,
							fontWeight: "bold",
							fontSize: "17px",
						}}
					>
						<span>Total:</span>
						<span>₹{total.toFixed(2)}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

const styles = {
	wrapper: {
		padding: "30px",
		fontFamily: "Arial, sans-serif",
		maxWidth: "1100px",
		margin: "auto",
	},
	title: {
		textAlign: "center",
		marginBottom: "20px",
		fontWeight: "bold",
	},
	container: {
		display: "flex",
		gap: "20px",
		flexWrap: "wrap",
	},
	form: {
		flex: "1 1 360px",
		display: "flex",
		flexDirection: "column",
		gap: "10px",
		background: "#fafafa",
		padding: "20px",
		borderRadius: "8px",
		// boxShadow: "0 4px 6px rgba(1, 2, 3, 0.1), 0 10px 15px rgba(0, 0, 0, 0.3)",
		boxShadow:
			"10px 10px 25px rgba(0, 0, 0, 0.15), -5px -5px 15px rgba(255, 255, 255, 0.8)",
	},
	row: {
		display: "flex",
		gap: "10px",
	},
	input: {
		flex: 1,
		padding: "10px",
		borderRadius: "5px",
		border: "1px solid #ccc",
		fontSize: "14px",
	},
	inputFull: {
		width: "100%",
		padding: "10px",
		borderRadius: "5px",
		border: "1px solid #ccc",
		fontSize: "14px",
	},
	button: {
		marginTop: "10px",
		padding: "12px",
		borderRadius: "12px",
		border: "none",
		color: "#fff",
		fontSize: "15px",
		fontWeight: "700",
		cursor: "pointer",
	},

	printButton: {
		marginTop: "8px",
		padding: "10px",
		backgroundColor: "#eee",
		border: "1px solid #ccc",
		borderRadius: "5px",
		cursor: "pointer",
		fontSize: "14px",
		backgroundPosition: "left center",
		background: "linear-gradient(135deg, #ff0000, #000000, #0000ff)",
		backgroundSize: "200% 200%",
		boxShadow: "0 5px 15px rgba(212, 0, 0, 0.4)",
		transition:
			"background-position 1s ease, transform 0.2s ease, box-shadow 0.2s ease",
	},
	summary: {
		flex: "1 1 350px",
		background: "white",
		fontFamily: "'Inter', sans-serif",
		fontSize: "15px",
		fontWeight: "500",
		lineHeight: "1.5",
		letterSpacing: "0.2px",
		padding: "20px",
		borderRadius: "8px",
		// boxShadow: "0 4px 6px rgba(1, 2, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.4)",
		boxShadow:
			"10px 10px 25px rgba(0, 0, 0, 0.15), -5px -5px 15px rgba(255, 255, 255, 0.8)",
	},
	summaryTitle: {
		marginBottom: "10px",
	},
	cartItem: {
		display: "flex",
		justifyContent: "space-between",
		marginRight: "18px",
		padding: "4px 0",
		fontSize: "14px",
		borderBottom: "1px dashed #ddd",
	},
	totalLine: {
		display: "flex",
		justifyContent: "space-between",
		margin: "6px",
	},
	divider: {
		margin: "12px 0",
	},
};

export default PlaceOrder;
