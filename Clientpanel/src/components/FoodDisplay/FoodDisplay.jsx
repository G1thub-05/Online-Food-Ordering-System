import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import "../../App.css";
import FoodSkeleton from "../FoodSkeleton/FoodSkeleton";

const FoodDisplay = ({ category, searchText }) => {
	const { foodList, loading } = useContext(StoreContext);
	const safeFoodList = Array.isArray(foodList) ? foodList : [];
	const filteredFoods = safeFoodList.filter(
		(food) =>
			(category === "All" || food.category === category) &&
			food.name.toLowerCase().includes(searchText.toLowerCase()),
	);
	// 👇 Show Skeleton while API is loading
	if (loading) {
		return (
			<div className="container">
				<div className="row">
					{Array.from({ length: 8 }).map((_, index) => (
						<FoodSkeleton key={index} />
					))}
				</div>
			</div>
		);
	}
	return (
		<div className="container">
			<div className="row">
				{filteredFoods.length > 0 ? (
					filteredFoods.map((food, index) => (
						<FoodItem
							key={index}
							name={food.name}
							description={food.description}
							id={food.id}
							imageUrl={food.imageUrl}
							price={food.price}
						/>
					))
				) : (
					<div className="text-center mt-4">
						<h4>No Food Found 😔</h4>
					</div>
				)}
			</div>
		</div>
	);
};

export default FoodDisplay;
