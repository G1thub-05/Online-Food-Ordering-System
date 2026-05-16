import axios from "axios";

import { API_URL } from "../util/constants";
const FOOD_API_URL = `${API_URL}/api/foods`;

export const addFood = async (foodData, image) => {
	const formData = new FormData();
	formData.append("food", JSON.stringify(foodData));
	formData.append("file", image);
	try {
		const response = await axios.post(FOOD_API_URL, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		console.log("Food added", response.data);
	} catch (error) {
		console.error("Error adding food:", error);
		throw error;
	}
};

export const getFoodList = async () => {
	try {
		const response = await axios.get(FOOD_API_URL);
		console.log("Food list fetched successfully.");
		return response.data;
	} catch (error) {
		console.error("Error fetching food list:", error);
		throw error;
	}
};

export const deleteFood = async (foodId) => {
	console.log("Deleting food with ID:", foodId);
	try {
		const response = await axios.delete(FOOD_API_URL + "/" + foodId, {});
		return response.status === 204;
	} catch (error) {
		console.log("Error while deleting the food.", error);
		throw error;
	}
};
