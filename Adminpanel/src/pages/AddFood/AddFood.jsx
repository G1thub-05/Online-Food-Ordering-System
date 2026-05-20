import React, { useState } from "react";
import { toast } from "react-toastify";
import { addFood } from "../../services/foodService";
import "./AddFood.css";

const AddFood = () => {
	const [image, setImage] = useState(null);

	const [data, setData] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
	});

	/* ========================================= */
	/* INPUT CHANGE */
	/* ========================================= */

	const onChangeHandler = (event) => {
		const name = event.target.name;

		const value = event.target.value;

		setData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	/* ========================================= */
	/* SUBMIT */
	/* ========================================= */

	const onSubmitHandler = async (event) => {
		event.preventDefault();

		/* IMAGE CHECK */

		if (!image) {
			toast.error("Please select an image.");
			return;
		}

		/* CATEGORY CHECK */

		if (!data.category) {
			toast.error("Please select a category.");
			return;
		}

		try {
			await addFood(data, image);

			toast.success("Food added successfully");

			setData({
				name: "",
				description: "",
				price: "",
				category: "",
			});

			setImage(null);
		} catch (error) {
			toast.error("Error adding food");
		}
	};

	return (
		<div className="upload-page">
			<div className="upload-card">
				{/* CLOSE BUTTON */}

				<div className="close-btn">
					<i className="bi bi-x-lg"></i>
				</div>

				{/* TITLE */}

				<h2 className="upload-title">
					<span></span>
					UPLOAD FOOD
					<span></span>
				</h2>

				{/* UPLOAD BOX */}

				<label htmlFor="image" className="upload-box">
					{image ? (
						<img
							src={URL.createObjectURL(image)}
							alt="preview"
							className="preview-image"
						/>
					) : (
						<>
							<div className="upload-icon">
								<i className="bi bi-cloud-arrow-up"></i>
							</div>

							<h3>Drag & Drop</h3>

							<p>Upload food image here</p>

							<small>JPG, JPEG, PNG only</small>
						</>
					)}
				</label>

				<input
					type="file"
					id="image"
					hidden
					onChange={(e) => setImage(e.target.files[0])}
				/>

				{/* FILE ICONS */}

				<div className="file-icons">
					<div className="file-card jpg">
						<i className="bi bi-image"></i>
						<span>JPG</span>
					</div>

					<div className="file-card jpeg">
						<i className="bi bi-image"></i>
						<span>JPEG</span>
					</div>

					<div className="file-card png">
						<i className="bi bi-filetype-png"></i>
						<span>PNG</span>
					</div>

					<div className="file-card gif">
						<i className="bi bi-file-earmark-play"></i>
						<span>GIF</span>
					</div>
				</div>

				{/* FORM */}

				<form className="food-form" onSubmit={onSubmitHandler}>
					{/* NAME CATEGORY PRICE */}

					<div className="form-row">
						<select
							name="category"
							value={data.category}
							onChange={onChangeHandler}
							required
						>
							<option value="" disabled>
								Category
							</option>

							<option value="Biryani">Biryani</option>
							<option value="Pizza">Pizza</option>
							<option value="Burger">Burger</option>
							<option value="Cake">Cake</option>
							<option value="Salad">Salad</option>
							<option value="Rolls">Rolls</option>
							<option value="Ice cream">Ice Cream</option>
						</select>

						<input
							type="text"
							name="name"
							value={data.name}
							placeholder="Food Name"
							onChange={onChangeHandler}
							required
						/>

						<input
							type="number"
							name="price"
							value={data.price}
							placeholder="₹ Price"
							onChange={onChangeHandler}
							required
						/>
					</div>

					{/* DESCRIPTION */}

					<textarea
						name="description"
						value={data.description}
						placeholder="Food Description"
						rows="3"
						onChange={onChangeHandler}
						required
					></textarea>

					<button type="submit">SAVE FOOD</button>
				</form>
			</div>
		</div>
	);
};

export default AddFood;
