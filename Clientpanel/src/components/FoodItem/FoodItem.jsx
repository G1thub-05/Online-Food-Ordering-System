import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { useEffect } from "react";
import "../../App.css";
import "./FoodItem.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Ensure Bootstrap icons are imported

const FoodItem = ({ name, description, id, imageUrl, price }) => {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	const { increaseQty, decreaseQty, quantities } = useContext(StoreContext);
	const [isHovered, setIsHovered] = useState(false);

	const cardStyle = {
		width: "100%",
		maxWidth: "400px",
		border: "none",
		borderRadius: "1rem",
		background: "#f9f9f9",

		boxShadow: `
		8px 8px 20px #cbd1d8,  /* darker outer shadow */
		-8px -8px 20px #ffffff, /* lighter inner glow */
		inset 2px 2px 4px #d1d9e6, /* subtle inset shadow */
		inset -2px -2px 4px #ffffff
`,

		overflow: "hidden",
		transform: "perspective(1000px)",
		transition: "transform 0.4s ease, box-shadow 0.4s ease",
	};

	const cardHoverStyle = {
		transform: "perspective(1000px) translateY(-6px) scale(1.02)",
		boxShadow: "0 14px 28px rgba(0, 0, 0, 0.15)",
	};

	const imageContainerStyle = {
		padding: "9px",
		// backgroundColor: "#f8f9fa",
		// background: "#f9f9f9",
		borderRadius: "20px",
		boxShadow: `
		8px 8px 20px #cbd1d8,  /* darker outer shadow */
		-8px -8px 20px #ffffff, /* lighter inner glow */
		// inset 2px 2px 4px #d1d9e6, /* subtle inset shadow */
		inset -2px -2px 4px #ffffff`,
		// background: "rgba(255, 255, 255, 0.2)",

		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};

	const imageStyle = {
		width: "90%",
		// height: "200px",
		height: "clamp(100px, 10vw, 130px)",
		objectFit: "contain",
		transition: "transform 0.3s ease",
	};

	return (
		// <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
		<div className="custom-5-col mb-4 d-flex justify-content-center">
			<div
				className="card"
				style={{
					...cardStyle,
					...(isHovered ? cardHoverStyle : {}),
					// background: "#f9f9f9",
					// borderRadius: "20px",
					// boxShadow: "8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff",
					// border: "0.2px solid #d1d9e6",
					background: "#f9f9f9",
					borderRadius: "20px",
					boxShadow: `
					8px 8px 20px #cbd1d8,  /* darker outer shadow */
					-8px -8px 20px #ffffff, /* lighter inner glow */
					inset 2px 2px 4px #d1d9e6, /* subtle inset shadow */
					inset -2px -2px 4px #ffffff`,
					border: "1px solid #e4e7ed",
				}}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<Link to={`/food/${id}`} style={imageContainerStyle}>
					<img
						src={imageUrl}
						alt={name}
						style={{
							...imageStyle,
							transform: isHovered ? "scale(1.03)" : "scale(1)",
						}}
					/>
				</Link>

				{/* Hero/Header Section */}
				<div className="card-body px-3">
					<h5
						style={{
							fontSize: ".9rem",
							fontWeight: "600",
							// background: "linear-gradient(90deg, #fc466b, #3f5efb)",
							background: "linear-gradient(145deg, #000000, #ff0000)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							marginBottom: "0.2rem",
						}}
					>
						{name}
					</h5>

					<p
						style={{
							fontSize: "0.8rem",
							color: "#495057",
							lineHeight: "1rem",
							maxHeight: "45px",
							overflow: "hidden",
							textOverflow: "ellipsis",
						}}
					>
						{description}
					</p>

					<div
						className="d-flex justify-content-between align-items-center mt-3"
						style={{
							// borderTop: "1px solid #e9ecef",
							borderTop: "1px solid linear-gradient(90deg, #000000, #ff0000)",
							paddingTop: "0.3rem",
						}}
					>
						<span
							style={{
								fontSize: "0.8rem",
								fontWeight: "700",
								color: "#ffffff",
								background: "linear-gradient(90deg, #000000, #ff0000)",
								borderRadius: "10px",
								width: "50px",
								// margin: "0.5rem auto", // auto horizontally centers
								padding: "0 0.1rem",
								textAlign: "center",
							}}
						>
							<i className="bi bi-currency-rupee"></i>
							{price}
						</span>

						<div className="five-star d-flex align-items-center">
							<div className="text-warning">
								<i className="bi bi-star-fill me-1"></i>
								<i className="bi bi-star-fill me-1"></i>
								<i className="bi bi-star-fill me-1"></i>
								<i className="bi bi-star-fill me-1"></i>
								<i className="bi bi-star-half me-1"></i>
							</div>
							<small className="text-muted ms-1">(4.5)</small>
						</div>
					</div>
				</div>

				{/* Footer - Actions */}
				<div
					className="d-flex justify-content-between align-items-center"
					style={{
						background: "#f9f9f9",
						// borderRadius: "15px",
						boxShadow: `
						8px 8px 20px #cbd1d8,  /* darker outer shadow */
						-8px -8px 20px #ffffff, /* lighter inner glow */
						inset 2px 2px 4px #d1d9e6, /* subtle inset shadow */
						inset -2px -2px 4px #ffffff`,
						// border: "1px solid #e4e7ed",

						padding: "0.5rem .9rem",
						borderTop: "1px solid #eee",
					}}
				>
					<Link
						className="vbtn btn btn-outline-success btn-sm"
						to={`/food/${id}`}
					>
						{quantities[id] > 0 ? "View" : "View Food"}
					</Link>

					{quantities[id] > 0 ? (
						<div className="d-flex align-items-center gap-2">
							<button
								className="btn btn-outline-danger btn-sm"
								onClick={() => decreaseQty(id)}
							>
								<i className="bi bi-dash-circle"></i>
							</button>
							<span className="fw-bold">{quantities[id]}</span>
							<button
								className="btn btn-outline-success btn-sm"
								onClick={() => increaseQty(id)}
							>
								<i className="bi bi-plus-circle"></i>
							</button>
						</div>
					) : (
						<button
							className="btn btn-primary btn-sm"
							onClick={() => increaseQty(id)}
						>
							<i className="bi bi-plus-circle"></i>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default FoodItem;
