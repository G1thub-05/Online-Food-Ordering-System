import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteFood, getFoodList } from "../../services/foodService";

const ListFood = () => {
	const [list, setList] = useState([]);
	const [hovered, setHovered] = useState(null);

	const fetchList = async () => {
		try {
			const data = await getFoodList();
			setList(data);
		} catch (error) {
			toast.error("Error while reading the foods.");
		}
	};

	const removeFood = async (foodId) => {
		try {
			const success = await deleteFood(foodId);
			if (success) {
				toast.success("Food removed.");
				await fetchList();
			} else {
				toast.error("Error occurred while removing the food.");
			}
		} catch (error) {
			toast.error("Error occurred while removing the food.");
		}
	};

	useEffect(() => {
		fetchList();
	}, []);

	return (
		<div style={styles.page}>
			<style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card:hover {
          transform: translateY(-4px);
        }
        .trash-icon:hover {
          color: #ff4444;
          transform: scale(1.2);
        }
      `}</style>

			<div style={styles.grid}>
				{list.map((item, index) => (
					<div
						className="card"
						key={index}
						style={{
							...styles.card,
							animation: "fadeIn 0.5s ease forwards",
							...(hovered === index ? styles.cardHover : {}),
						}}
						onMouseEnter={() => setHovered(index)}
						onMouseLeave={() => setHovered(null)}
					>
						<img src={item.imageUrl} alt={item.name} style={styles.img} />
						<div style={styles.content}>
							<div style={styles.title}>{item.name}</div>
							<div class="badge text-bg-warning" style={styles.category}>
								{item.category}
							</div>
							<div style={styles.price}>₹{item.price}.00</div>
							<i
								className="bi bi-trash-fill trash-icon"
								style={styles.deleteBtn}
								onClick={() => removeFood(item.id)}
							></i>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const styles = {
	page: {
		padding: "3rem 1rem",
		minHeight: "100vh",
		background: "#f1f2f6",
		fontFamily: "Segoe UI, sans-serif",
	},
	grid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
		gap: "1.5rem",
		maxWidth: "1200px",
		margin: "0 auto",
	},
	card: {
		// background: "#f9f9f9",
		borderRadius: "20px",
		// boxShadow: "8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff",
		overflow: "hidden",
		transition: "all 0.3s ease",
		display: "flex",
		flexDirection: "column",
		background: "#f9f9f9",
		// borderRadius: "15px",
		boxShadow: `
						8px 8px 20px #cbd1d8,  /* darker outer shadow */
						-8px -8px 20px #ffffff, /* lighter inner glow */
						inset 2px 2px 4px #d1d9e6, /* subtle inset shadow */
						inset -2px -2px 4px #ffffff`,
		border: "1px solid #e4e7ed",

		padding: "0.5rem .9rem",
		borderTop: "1px solid #eee",
	},
	img: {
		width: "100%",
		height: "120px", // 🔻 Reduced height
		objectFit: "contain", // 🔧 Ensure image fits without cropping
		borderTopLeftRadius: "20px",
		borderTopRightRadius: "20px",
		// backgroundColor: "#fff",
		padding: "7px", // Optional: to give spacing around image
	},
	content: {
		padding: "1rem",
		textAlign: "center",
	},
	title: {
		fontSize: "1.1rem",
		fontWeight: "700",
		margin: "0.3rem 0",
		background: "linear-gradient(90deg, #000000, #ff0000)",
		WebkitBackgroundClip: "text",
		WebkitTextFillColor: "transparent",
		color: "transparent", // fallback
	},
	category: {
		fontSize: "0.8rem",
		color: "#666",
	},
	price: {
		fontWeight: "bold",
		color: "#ffffff",
		// marginBottom: "0.5rem",
		background: "linear-gradient(90deg, #000000, #ff0000)",
		borderRadius: "22px",
		width: "100px",
		margin: "0.5rem auto", // auto horizontally centers
	},
	deleteBtn: {
		fontSize: "1.4rem",
		color: "#dc3545",
		cursor: "pointer",
		transition: "0.3s ease",
	},
};

export default ListFood;
