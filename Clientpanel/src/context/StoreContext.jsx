import { createContext, useEffect, useState } from "react";
import { fetchFoodList } from "../service/foodService";

import {
	addToCart,
	getCartData,
	removeQtyFromCart,
	removeItemFromCart,
} from "../service/cartService";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
	const [foodList, setFoodList] = useState([]);
	const [quantities, setQuantities] = useState({});
	const [token, setToken] = useState("");

	const increaseQty = async (foodId) => {
		try {
			await addToCart(foodId, token);
			setQuantities((prev) => ({
				...prev,
				[foodId]: (prev[foodId] || 0) + 1,
			}));
		} catch (error) {
			console.error("ADD TO CART ERROR:", error);
		}
	};

	const decreaseQty = async (foodId) => {
		try {
			await removeQtyFromCart(foodId, token);
			setQuantities((prev) => ({
				...prev,
				[foodId]: prev[foodId] > 0 ? prev[foodId] - 1 : 0,
			}));
		} catch (error) {
			console.error("REMOVE QTY ERROR:", error);
		}
	};

	const removeFromCart = async (foodId) => {
		try {
			// Backend remove
			await removeItemFromCart(foodId, token);

			// Frontend remove only after success
			setQuantities((prevQuantities) => {
				const updatedQuantities = { ...prevQuantities };
				delete updatedQuantities[foodId];
				return updatedQuantities;
			});
		} catch (error) {
			console.error("REMOVE ITEM ERROR:", error);
		}
	};

	const loadCartData = async (token) => {
		try {
			const items = await getCartData(token);
			setQuantities(items && typeof items === "object" ? items : {});
		} catch (error) {
			console.error("LOAD CART ERROR:", error);
			setQuantities({});
		}
	};

	const contextValue = {
		foodList,
		increaseQty,
		decreaseQty,
		quantities,
		removeFromCart,
		token,
		setToken,
		setQuantities,
		loadCartData,
	};

	useEffect(() => {
		async function loadData() {
			try {
				const data = await fetchFoodList();
				console.log("FOOD API RESPONSE:", data);
				setFoodList(Array.isArray(data) ? data : []);

				const savedToken = localStorage.getItem("token");
				if (savedToken) {
					setToken(savedToken);
					await loadCartData(savedToken);
				}
			} catch (error) {
				console.error("LOAD DATA ERROR:", error);
				setFoodList([]);
				setQuantities({});
			}
		}
		loadData();
	}, []);

	return (
		<StoreContext.Provider value={contextValue}>
			{props.children}
		</StoreContext.Provider>
	);
};
