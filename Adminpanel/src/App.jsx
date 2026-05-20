import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AddFood from "./pages/AddFood/AddFood";
import ListFood from "./pages/ListFood/ListFood";
import Orders from "./pages/Orders/Orders";
import Sidebar from "./components/Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import Users from "./pages/Users/Users";
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
					marginLeft: sidebarVisible ? "210px" : "0px",

					width: sidebarVisible ? "calc(100% - 210px)" : "100%",

					transition: "all 0.35s ease",
				}}
			>
				<ToastContainer />

				<div className="container-fluid">
					<Routes>
						<Route path="/users" element={<Users />} />
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
