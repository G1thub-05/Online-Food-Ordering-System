import "./FoodSkeleton.css";

const FoodSkeleton = () => {
	return (
		<div className="food-skeleton">
			<div className="skeleton skeleton-image"></div>

			<div className="food-skeleton-body">
				<div className="skeleton skeleton-title"></div>

				<div className="skeleton skeleton-category"></div>

				<div className="food-skeleton-bottom">
					<div className="skeleton skeleton-price"></div>
					<div className="skeleton skeleton-icon"></div>
				</div>
			</div>
		</div>
	);
};

export default FoodSkeleton;
