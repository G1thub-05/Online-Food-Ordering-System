import axios from "axios";
import { API_URL } from "../util/constants";
const FOODS_API_URL = `${API_URL}/api/foods`;

export const fetchFoodList = async () => {
	try {
		const response = await axios.get(FOODS_API_URL);
		return response.data;
	} catch (error) {
		console.log("Error fetching food list:", error);
		throw error;
	}
};

export const fetchFoodDetails = async (id) => {
	try {
		const response = await axios.get(FOODS_API_URL + "/" + id);
		return response.data;
	} catch (error) {
		console.log("Error fetching food details:", error);
		throw error;
	}
};
