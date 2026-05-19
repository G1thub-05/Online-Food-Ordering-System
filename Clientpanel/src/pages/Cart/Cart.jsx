import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import { calculateCartTotals } from "../../util/cartUtils";
import { toast } from "react-toastify";
import "./Cart.css";
import "../../App.css";

const Cart = () => {
	const navigate = useNavigate();
	const {
		foodList,
		increaseQty,
		decreaseQty,
		quantities,
		removeFromCart,
		token,
	} = useContext(StoreContext);
	const cartItems = foodList.filter((food) => quantities[food.id] > 0);
	const { subtotal, shipping, tax, total } = calculateCartTotals(
		cartItems,
		quantities,
	);

	return (
		<div className="cart-container">
			<h2 className="cart-heading">🛍️ Your Shopping Cart</h2>
			<div className="cart-content">
				<div className="cart-left">
					{cartItems.length === 0 ? (
						<p className="empty-cart">Your cart is empty.</p>
					) : (
						<>
							{cartItems.map((food) => (
								<div key={food.id} className="cart-item">
									<img
										src={food.imageUrl}
										alt={food.name}
										className="cart-img"
									/>
									<div className="cart-details">
										<h5 className="cart-title">{food.name}</h5>

										<p className="badge cart-category text-bg-warning">
											{food.category}
										</p>
									</div>
									<div className="cart-qty-group">
										<button onClick={() => decreaseQty(food.id)}>-</button>
										<input
											type="text"
											readOnly
											value={quantities[food.id]}
											className="cart-qty-input"
										/>
										<button onClick={() => increaseQty(food.id)}>+</button>
									</div>
									<div className="cart-price">
										&#8377;{(food.price * quantities[food.id]).toFixed(2)}
									</div>
									<button
										className="cart-delete-btn"
										onClick={() => {
											if (!token) {
												toast.error("Please login first to remove items 🛒", {
													position: "top-right",
													autoClose: 2000,
													theme: "transparent",
												});

												return;
											}

											removeFromCart(food.id);
										}}
										// onClick={() => decreaseQty(food.id)}
									>
										🗑️
									</button>
								</div>
							))}
						</>
					)}
				</div>
				<div className="cart-right">
					<div className="order-summary">
						<h4>🛒Order Summary</h4>
						<div className="summary-line">
							<span>Subtotal:</span>
							<span>&#8377;{subtotal.toFixed(2)}</span>
						</div>
						<div className="summary-line">
							<span>Shipping:</span>
							<span>&#8377;{subtotal === 0 ? 0.0 : shipping.toFixed(2)}</span>
						</div>
						<div className="summary-line">
							<span>Tax:</span>
							<span>&#8377;{tax.toFixed(2)}</span>
						</div>
						<hr />
						<div className="summary-line total">
							<strong>Total:</strong>
							<strong>&#8377;{subtotal === 0 ? 0.0 : total.toFixed(2)}</strong>
						</div>
						<button
							className="checkout-btn"
							onClick={() => {
								if (cartItems.length === 0) {
									toast.warning("Your cart is empty 🛒", {
										position: "top-right",
										autoClose: 2000,
										theme: "transparent",
									});
									return;
								}
								if (!token) {
									toast.warning("Please login first to continue checkout", {
										position: "top-right",
										autoClose: 2000,
										theme: "transparent",
									});
									return;
								}
								navigate("/order");
							}}
						>
							🚀 Proceed to Checkout
						</button>
					</div>
					<div className="continue-btn-wrapper">
						<Link to="/" className="continue-btn">
							⬅ Continue Shopping
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
