import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AddFood from "./pages/AddFood/AddFood";
import ListFood from "./pages/ListFood/ListFood";
import Orders from "./pages/Orders/Orders";
import Sidebar from "./components/Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";

const App = () => {
	const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth > 768);

	return (
		<div
			className="d-flex"
			id="wrapper"
			style={{
				minHeight: "100vh",
			}}
		>
			<Sidebar
				sidebarVisible={sidebarVisible}
				setSidebarVisible={setSidebarVisible}
			/>
			<div
				id="page-content-wrapper"
				style={{
					marginLeft: "210px",
					width: "100%",
				}}
			>
				<ToastContainer />

				<div className="container-fluid">
					<Routes>
						<Route path="/add" element={<AddFood />} />
						<Route path="/list" element={<ListFood />} />
						<Route path="/orders" element={<Orders />} />
						<Route path="/" element={<ListFood />} />
					</Routes>
				</div>
			</div>
		</div>
	);
};

export default App;
