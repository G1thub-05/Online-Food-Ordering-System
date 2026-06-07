import React, { useContext, useState, useRef, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { clearCartItems } from "../../service/cartService";
import { calculateCartTotals } from "../../util/cartUtils";
import { RAZORPAY_KEY } from "../../util/constants";

import {
	createOrder,
	deleteOrder,
	verifyPayment,
} from "../../service/orderService";

import "./PlaceOrder.css";

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

	/* ========================== */
	/* HANDLE INPUT */
	/* ========================== */

	const onChange = (event) => {
		const name = event.target.name;
		const value = event.target.value.replace(/\s+/g, " ");

		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	/* ========================== */
	/* CART */
	/* ========================== */

	const cartItems = foodList.filter((item) => quantities[item.id] > 0);

	const { subtotal, shipping, tax, total } = calculateCartTotals(
		cartItems,
		quantities,
	);

	/* ========================== */
	/* SUBMIT */
	/* ========================== */
	const cleanedPhone = form.phoneNumber.replace(/\D/g, "");
	const cleanedZip = form.zip.replace(/\D/g, "");

	const handleSubmit = async (e) => {
		console.log(cartItems);
		e.preventDefault();

		const nameRegex = /^[A-Za-z ]{2,30}$/;
		if (!nameRegex.test(form.firstName.trim())) {
			toast.error("Invalid first name");
			return;
		}

		if (!nameRegex.test(form.lastName.trim())) {
			toast.error("Invalid last name");
			return;
		}
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		if (!emailRegex.test(form.email.trim())) {
			toast.error("Please enter a valid email.");
			return;
		}

		const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
		if (!phoneRegex.test(cleanedPhone)) {
			toast.error("Enter a valid 10-digit Indian number.");

			return;
		}

		const addressRegex = /^[A-Za-z0-9\s,./#-]{5,120}$/;
		if (!addressRegex.test(form.address.trim())) {
			toast.error("Invalid address");
			return;
		}

		const cityStateRegex = /^[A-Za-z ]{2,40}$/;
		if (!cityStateRegex.test(form.city)) {
			toast.error("Invalid city");
			return;
		}

		if (!cityStateRegex.test(form.state)) {
			toast.error("Invalid state");
			return;
		}
		const zipRegex = /^[1-9]\d{5}$/;
		if (!zipRegex.test(cleanedZip)) {
			toast.error("Enter a valid 6-digit zip code.");
			return;
		}

		const fullAddress = [
			`${form.firstName} ${form.lastName}`,
			form.address,
			form.city,
			form.state,
			cleanedZip,
		]
			.filter(Boolean)
			.map((item) => item.trim())
			.join(", ");

		const orderData = {
			userAddress: fullAddress,
			phoneNumber: cleanedPhone,
			email: form.email,
			orderedItems: cartItems.map((item) => ({
				foodId: item.id,
				quantity: quantities[item.id],
				price: item.price * quantities[item.id],
				category: item.category,
				imageUrl: item.imageUrl,
				description: item.description,
				name: item.name,
			})),
			orderStatus: "Food Preparing",
		};

		try {
			const res = await createOrder(orderData, token);

			if (res.razorpayOrderId) {
				initRazorpay(res);
			} else {
				toast.error("Order failed.");
			}
		} catch (error) {
			console.error("Full Error:", error);
			console.log("Response Data:", error.response?.data);
			console.log("Status:", error.response?.status);
			toast.error("Order submission error");
		}
	};

	/* ========================== */
	/* RAZORPAY */
	/* ========================== */

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
				contact: cleanedPhone,
			},
			method: {
				upi: true,
				card: true,
				netbanking: true,
				wallet: true,
			},
			theme: {
				color: "#ff6b00",
			},

			modal: {
				ondismiss: async () => {
					await deleteOrderHandler(order.id, token);
					toast.info("Payment cancelled");
				},
			},
		};
		if (!window.Razorpay) {
			toast.error("Razorpay SDK failed to load");
			return;
		}
		const rz = new window.Razorpay(options);

		rz.open();
	};

	/* ========================== */
	/* VERIFY PAYMENT */
	/* ========================== */

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
				toast.error("Payment failed");

				navigate("/");
			}
		} catch {
			toast.error("Payment verification failed.");
		}
	};

	/* ========================== */
	/* DELETE ORDER */
	/* ========================== */

	const deleteOrderHandler = async (orderId) => {
		try {
			await deleteOrder(orderId, token);
		} catch {
			toast.error("Something went wrong.");
		}
	};

	/* ========================== */
	/* PRINT */
	/* ========================== */

	const handlePrint = () => {
		const printContent = printRef.current.innerHTML;

		const win = window.open();

		win.document.write(`<html><body>${printContent}</body></html>`);

		win.document.close();

		win.print();
	};

	const isFormComplete = Object.values(form).every((val) => val.trim() !== "");

	return (
		<div className="placeorder-wrapper">
			<h2 className="placeorder-title">🛒 Place Your Order</h2>

			<div className="placeorder-container">
				{/* ========================== */}
				{/* FORM */}
				{/* ========================== */}
				{/* ========================== */}
				{/* SUMMARY */}
				{/* ========================== */}

				<div className="placeorder-summary" ref={printRef}>
					<div className="summary-top">
						<div>
							<h2 className="placeorder-heading">🛍️ Cart Summary</h2>
							<p className="delivery-time">🚚 Delivery in 25-30 mins</p>
						</div>

						<div className="summary-count">{cartItems.length} Items</div>
					</div>

					{/* ITEMS */}

					<div className="placeorder-items">
						{cartItems.map((item) => (
							<div key={item.id} className="summary-item-card">
								<div className="summary-img-wrapper">
									<img
										src={item.imageUrl}
										alt={item.name}
										className="summary-item-img"
									/>
								</div>

								<div className="summary-item-info">
									<div className="summary-title-row">
										<h4>{item.name}</h4>

										<span className="summary-badge">{item.category}</span>
									</div>

									<div className="summary-bottom-row">
										<div className="summary-qty-box">
											<span className="qty-label">Qty</span>

											<span className="qty-value">{quantities[item.id]}</span>
										</div>

										<p className="summary-single-price">₹{item.price} each</p>
									</div>
								</div>

								<div className="summary-price-wrapper">
									<p className="summary-total-label">Total</p>

									<div className="summary-item-price">
										₹{(item.price * quantities[item.id]).toFixed(2)}
									</div>
								</div>
							</div>
						))}
					</div>

					{/* TOTAL */}

					<div className="summary-total-box">
						<div className="placeorder-total-line">
							<span>Subtotal</span>

							<span>₹{subtotal.toFixed(2)}</span>
						</div>

						<div className="placeorder-total-line">
							<span>Shipping</span>

							<span>₹{shipping.toFixed(2)}</span>
						</div>

						<div className="placeorder-total-line">
							<span>Tax</span>

							<span>₹{tax.toFixed(2)}</span>
						</div>

						<div className="placeorder-total final-total">
							<span>Grand Total</span>

							<span>₹{total.toFixed(2)}</span>
						</div>
					</div>

					<div className="secure-payment">
						<div className="secure-icon">🔒</div>

						<div>
							<p className="secure-subtitle">Protected by Razorpay</p>
						</div>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="placeorder-form">
					<div className="form-header">
						<h2 className="placeorder-heading">
							🚚 Enter your Delivery Details
						</h2>

						<p className="form-subtitle"> </p>
					</div>

					<div className="placeorder-row">
						<input
							name="firstName"
							value={form.firstName}
							onChange={onChange}
							placeholder="First Name"
							required
							className="placeorder-input"
						/>

						<input
							name="lastName"
							value={form.lastName}
							onChange={onChange}
							placeholder="Last Name"
							required
							className="placeorder-input"
						/>
					</div>

					<div className="placeorder-row">
						<input
							name="email"
							value={form.email}
							onChange={onChange}
							placeholder="Email Address"
							required
							type="email"
							className="placeorder-input"
						/>

						<input
							name="phoneNumber"
							value={form.phoneNumber}
							onChange={onChange}
							placeholder="Phone Number"
							required
							maxLength="10"
							inputMode="numeric"
							className="placeorder-input"
						/>
					</div>

					<input
						name="address"
						value={form.address}
						onChange={onChange}
						placeholder="Full Address"
						required
						className="placeorder-input-full"
					/>

					{/* <div className="placeorder-row"> */}
					<div className="placeorder-row city-row">
						<input
							name="city"
							value={form.city}
							onChange={onChange}
							placeholder="City"
							required
							className="placeorder-input"
						/>

						<input
							name="state"
							value={form.state}
							onChange={onChange}
							placeholder="State"
							required
							className="placeorder-input"
						/>

						<input
							name="zip"
							value={form.zip}
							onChange={onChange}
							placeholder="ZIP Code"
							required
							maxLength="6"
							inputMode="numeric"
							className="placeorder-input"
						/>
					</div>
					<button
						type="submit"
						disabled={!isFormComplete || cartItems.length === 0}
						className={`placeorder-btn ${
							!isFormComplete || cartItems.length === 0 ? "disabled-btn" : ""
						}`}
					>
						{cartItems.length === 0
							? "🛒 Cart is Empty"
							: !isFormComplete
								? "🖊️ Fill All Fields"
								: `🔒 Pay ₹${total.toFixed(2)}`}
					</button>

					<button
						type="button"
						onClick={handlePrint}
						disabled={!isFormComplete || cartItems.length === 0}
						className={`placeorder-btn print-btn ${
							!isFormComplete || cartItems.length === 0 ? "disabled-btn" : ""
						}`}
					>
						{cartItems.length === 0
							? "🛒 Can't Print Receipt for Empty Cart"
							: !isFormComplete
								? "📄 Fill All Fields to Print Receipt"
								: "📄 Print Receipt"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default PlaceOrder;
