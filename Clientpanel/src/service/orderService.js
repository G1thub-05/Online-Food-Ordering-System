import axios from "axios";

const API_URL = "http://localhost:8080/api/orders";

export const fetchUserOrders = async (token) => {
	try {
		const response = await axios.get(API_URL, {
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
		const response = await axios.post(API_URL + "/create", orderData, {
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
		const response = await axios.post(API_URL + "/verify", paymentData, {
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
		await axios.delete(API_URL + "/" + orderId, {
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
			`${API_URL}/${orderId}/cancel`, // ✅ absolute URL
			{}, // PATCH needs a body, even empty
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return res.data;
	} catch (err) {
		console.error("cancelOrder failed:", err.response?.data || err.message);
		throw err;
	}
};
