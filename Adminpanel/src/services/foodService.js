import axios from "axios";

const API_URL = "http://localhost:8080/api/foods";

export const addFood = async (foodData, image) => {
	const formData = new FormData();
	formData.append("food", JSON.stringify(foodData));
	formData.append("file", image);
	try {
		const response = await axios.post(API_URL, formData, {
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
		const response = await axios.get(API_URL);
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
		const response = await axios.delete(API_URL + "/" + foodId, {});
		return response.status === 204;
	} catch (error) {
		console.log("Error while deleting the food.", error);
		throw error;
	}
};
