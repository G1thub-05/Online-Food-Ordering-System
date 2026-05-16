import React, { useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import axios from "axios";
import { addFood } from "../../services/foodService";

const AddFood = () => {
	const [image, setImage] = useState(null);
	const [data, setData] = useState({
		name: "",
		description: "",
		price: "",
		category: "Biryani",
	});

	const onChangeHandler = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setData((data) => ({ ...data, [name]: value }));
	};

	const onSubmitHandler = async (event) => {
		event.preventDefault();
		if (!image) {
			toast.error("Please select an image.");
			return;
		}
		try {
			await addFood(data, image);
			toast.success("Food added successfully.");
			setData({ name: "", description: "", category: "Biryani", price: "" });
			setImage(null);
		} catch (error) {
			toast.error("Error adding food.", error);
		}
	};

	return (
		<div style={styles.wrapper}>
			<form onSubmit={onSubmitHandler} style={styles.form}>
				<h2 style={styles.heading}>Add New Food</h2>

				<label htmlFor="image" style={styles.uploadLabel}>
					<img
						src={image ? URL.createObjectURL(image) : "/assets/upload.png"}
						alt="upload"
						style={styles.uploadImage}
					/>
					<p style={styles.uploadText}>Click to Upload</p>
				</label>
				<input
					type="file"
					id="image"
					hidden
					onChange={(e) => setImage(e.target.files[0])}
				/>

				<input
					type="text"
					name="name"
					value={data.name}
					placeholder="Food Name"
					onChange={onChangeHandler}
					style={styles.input}
					required
				/>
				<textarea
					name="description"
					value={data.description}
					placeholder="Description"
					onChange={onChangeHandler}
					rows="3"
					style={styles.textarea}
					required
				></textarea>

				<select
					name="category"
					value={data.category}
					onChange={onChangeHandler}
					style={styles.input}
				>
					<option value="Biryani">Biryani</option>
					<option value="Pizza">Pizza</option>
					<option value="Burger">Burger</option>
					<option value="Cake">Cake</option>
					<option value="Salad">Salad</option>
					<option value="Ice cream">Ice cream</option>
				</select>

				<input
					type="number"
					name="price"
					value={data.price}
					placeholder="₹ Price"
					onChange={onChangeHandler}
					style={styles.input}
					required
				/>

				<button type="submit" style={styles.button}>
					Add Food
				</button>
			</form>

			<style>
				{`
          @keyframes floatBox {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-5px) rotate(0.3deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }

          @keyframes buttonBreath {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }

          button:hover {
            transform: scale(1.08);
            transition: all 0.3s ease;
          }
        `}
			</style>
		</div>
	);
};

export default AddFood;

const styles = {
	wrapper: {
		minHeight: "100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		background: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
		padding: "2rem",
	},
	form: {
		width: "520px",
		padding: "2rem",
		borderRadius: "20px",
		background: "rgba(255, 255, 255, 0.3)",
		backdropFilter: "blur(10px)",
		WebkitBackdropFilter: "blur(10px)",
		border: "1px solid rgba(255, 255, 255, 0.2)",
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
		animation: "floatBox 4s ease-in-out infinite",
	},
	heading: {
		textAlign: "center",
		fontWeight: "600",
		fontSize: "1.8rem",
		color: "#222",
	},
	uploadLabel: {
		textAlign: "center",
		border: "2px dotted #aaa",
		borderRadius: "15px",
		padding: "1rem",
		cursor: "pointer",
		background: "#e2e8f0",
		transition: "all 0.3s ease",
	},
	uploadImage: {
		width: "80px",
		opacity: 0.75,
		marginBottom: "0.5rem",
	},
	uploadText: {
		fontSize: "0.9rem",
		color: "#555",
	},
	input: {
		padding: "12px",
		borderRadius: "10px",
		border: "1px solid #ccc",
		fontSize: "1rem",
		background: "#fefefe",
		transition: "0.2s ease",
	},
	textarea: {
		padding: "12px",
		borderRadius: "10px",
		border: "1px solid #ccc",
		fontSize: "1rem",
		background: "#fefefe",
		resize: "none",
	},
	button: {
		padding: "12px",
		fontSize: "1rem",
		fontWeight: "bold",
		borderRadius: "10px",
		border: "none",
		background: "linear-gradient(to right, #00c6ff, #0072ff)",
		color: "#fff",
		cursor: "pointer",
		animation: "buttonBreath 3s infinite ease-in-out",
	},
};
