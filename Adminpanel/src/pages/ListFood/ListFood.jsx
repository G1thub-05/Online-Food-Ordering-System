import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteFood, getFoodList } from "../../services/foodService";
import "./ListFood.css";

const ListFood = () => {
	const [list, setList] = useState([]);

	const [selectedCategory, setSelectedCategory] = useState("All");

	/* ========================================= */
	/* FETCH FOODS */
	/* ========================================= */

	const fetchList = async () => {
		try {
			const data = await getFoodList();

			setList(data);
		} catch (error) {
			toast.error("Error while reading foods.");
		}
	};

	/* ========================================= */
	/* DELETE FOOD */
	/* ========================================= */

	const removeFood = async (foodId) => {
		const confirmDelete = confirm("Are you sure you want to delete this food?");

		if (!confirmDelete) return;

		try {
			const success = await deleteFood(foodId);

			if (success) {
				toast.success("Food removed successfully", {
					position: "top-right",

					autoClose: 1200,

					theme: "transparent",

					style: {
						color: "black",

						background: "rgba(255,255,255,0.25)",

						backdropFilter: "blur(10px)",
					},
				});

				await fetchList();
			} else {
				toast.error("Failed to remove food.");
			}
		} catch (error) {
			toast.error("Error occurred while removing food.");
		}
	};

	useEffect(() => {
		fetchList();
	}, []);

	/* ========================================= */
	/* UNIQUE CATEGORIES */
	/* ========================================= */

	const categories = ["All", ...new Set(list.map((item) => item.category))];

	/* ========================================= */
	/* FILTERED LIST */
	/* ========================================= */

	const filteredList =
		selectedCategory === "All"
			? list
			: list.filter((item) => item.category === selectedCategory);

	return (
		<div className="listfood-page">
			{/* ========================================= */}
			{/* TOPBAR */}
			{/* ========================================= */}

			<div className="listfood-topbar">
				<select
					className="listfood-filter"
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value)}
				>
					{categories.map((category, index) => (
						<option key={index} value={category}>
							{category}
						</option>
					))}
				</select>
			</div>

			{/* ========================================= */}
			{/* GRID */}
			{/* ========================================= */}

			<div className="listfood-grid">
				{filteredList.map((item, index) => (
					<div className="listfood-card" key={index}>
						<img src={item.imageUrl} alt={item.name} className="listfood-img" />

						<div className="listfood-content">
							<h3 className="listfood-title">{item.name}</h3>

							<div className="badge listfood-category">{item.category}</div>

							<div className="listfood-bottom">
								<div className="listfood-price">₹{item.price}.00</div>

								<i
									className="bi bi-trash-fill listfood-delete"
									onClick={() => removeFood(item.id)}
								></i>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ListFood;
