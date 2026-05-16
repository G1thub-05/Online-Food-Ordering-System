import axios from "axios";
import { API_URL } from "../util/constants";
const ORDERS_API_URL = `${API_URL}/api/orders`;

export const fetchUserOrders = async (token) => {
	try {
		const response = await axios.get(ORDERS_API_URL, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return response.data;
	} catch (error) {
		console.error("Error occured while fetching the orders", error);
		throw error;
	}
};

export const createOrder = async (orderData, token) => {
	try {
		const response = await axios.post(ORDERS_API_URL + "/create", orderData, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return response.data;
	} catch (error) {
		console.error("Error occured while creating the order", error);
		throw error;
	}
};

export const verifyPayment = async (paymentData, token) => {
	try {
		const response = await axios.post(ORDERS_API_URL + "/verify", paymentData, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return response.status === 200;
	} catch (error) {
		console.error("Error occured while verifing the payment", error);
		throw error;
	}
};

export const deleteOrder = async (orderId, token) => {
	try {
		await axios.delete(ORDERS_API_URL + "/" + orderId, {
			headers: { Authorization: `Bearer ${token}` },
		});
	} catch (error) {
		console.error("Error occured while deleting the order", error);
		throw error;
	}
};

export const cancelOrder = async (orderId, token) => {
	try {
		const res = await axios.patch(
			`${ORDERS_API_URL}/${orderId}/cancel`, // ✅ absolute URL
			{}, // PATCH needs a body, even empty
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return res.data;
	} catch (err) {
		console.error("cancelOrder failed:", err.response?.data || err.message);
		throw err;
	}
};
