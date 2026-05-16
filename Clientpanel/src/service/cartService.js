import axios from "axios";

import { API_URL } from "../util/constants";
const CART_API_URL = `${API_URL}/api/cart`;

export const addToCart = async (foodId, token) => {
	try {
		await axios.post(
			CART_API_URL,
			{ foodId },
			{ headers: { Authorization: `Bearer ${token}` } },
		);
	} catch (error) {
		console.error("Error while adding the cart data", error);
	}
};

export const removeQtyFromCart = async (foodId, token) => {
	try {
		await axios.post(
			CART_API_URL + "/remove",
			{ foodId },
			{ headers: { Authorization: `Bearer ${token}` } },
		);
	} catch (error) {
		console.error("Error while removing qty from cart", error);
	}
};

export const getCartData = async (token) => {
	try {
		const response = await axios.get(CART_API_URL, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return response.data.items;
	} catch (error) {
		console.error("Error while fetching the cart data", error);
	}
};

export const clearCartItems = async (token, setQuantities) => {
	try {
		await axios.delete(CART_API_URL, {
			headers: { Authorization: `Bearer ${token}` },
		});
		setQuantities({});
	} catch (error) {
		console.error("Error while clearing the cart", error);
		throw error;
	}
};

// 🆕 Remove item from cart using existing backend
export const removeItemFromCart = async (foodId, token) => {
	return await axios.post(
		`${CART_API_URL}/remove-item`, // 🟢 matches your existing backend API
		{ foodId }, // 👈 CartRequest expects foodId
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
};
