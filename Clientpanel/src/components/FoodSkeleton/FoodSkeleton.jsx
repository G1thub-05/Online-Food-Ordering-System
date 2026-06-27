import "./FoodSkeleton.css";

const FoodSkeleton = () => {
	return (
		<div className="col-lg-3 col-md-4 col-sm-6 mb-4">
			<div className="food-skeleton">
				<div className="skeleton skeleton-image"></div>

				<div className="food-skeleton-body">
					<div className="skeleton skeleton-title"></div>

					<div className="skeleton skeleton-text"></div>

					<div className="skeleton skeleton-text short"></div>

					<div className="skeleton skeleton-price"></div>
				</div>
			</div>
		</div>
	);
};

export default FoodSkeleton;
