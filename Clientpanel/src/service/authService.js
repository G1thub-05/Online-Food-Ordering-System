import axios from "axios";

import { API_URL } from "../util/constants";
const API_API_URL = `${API_URL}/api`;

export const registerUser = async (data) => {
	try {
		const response = await axios.post(API_API_URL + "/register", data);
		return response;
	} catch (error) {
		throw error;
	}
};

export const login = async (data) => {
	try {
		const response = await axios.post(API_API_URL + "/login", data);
		return response;
	} catch (error) {
		throw error;
	}
};
