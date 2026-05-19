import axios from "axios";
import { API_URL } from "../util/constants";
const ORDER_API_URL = `${API_URL}/api/orders`;
export const fetchAllOrders = async () => {
	try {
		const response = await axios.get(ORDER_API_URL + "/all");
		return response.data;
	} catch (error) {
		console.error("Error occured while fetching the orders", error);
		throw error;
	}
};
// new added function to delete orders by status
export const deleteOrder = async (orderId) => {
	try {
		const response = await axios.delete(`${ORDER_API_URL}/${orderId}`);

		return response.data;
	} catch (error) {
		console.log("DELETE ERROR:", error);

		throw error;
	}
};

export const updateOrderStatus = async (orderId, status) => {
	try {
		const response = await axios.patch(
			`${ORDER_API_URL}/status/${orderId}?status=${status}`,
		);
		return response.status === 200;
	} catch (error) {
		console.error("Error occured while updating the status", error);
		throw error;
	}
};

export const cancelOrder = async (orderId, token) => {
	try {
		const res = await axios.patch(
			`/api/orders/${orderId}/cancel`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return res.data;
	} catch (error) {
		console.error("Error cancelling order:", error);
		throw error;
	}
};
