import React, { useContext } from "react";
import Menubar from "./components/Menubar/Menubar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import ExploreFood from "./pages/ExploreFood/ExploreFood";
import FoodDetails from "./pages/FoodDetails/FoodDetails";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { ToastContainer, Slide } from "react-toastify";
import MyOrders from "./pages/MyOrders/MyOrders";
import { StoreContext } from "./context/StoreContext";
import "./App.css"; // Import global styles
import "react-toastify/dist/ReactToastify.css";
import "./toastStyles.css"; // Import your custom toast CSS
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";

const App = () => {
	const { token } = useContext(StoreContext);
	return (
		<div>
			<Menubar />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/explore" element={<ExploreFood />} />
				<Route path="/food/:id" element={<FoodDetails />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/order" element={token ? <PlaceOrder /> : <Login />} />
				<Route path="/login" element={token ? <Home /> : <Login />} />
				<Route path="/register" element={token ? <Home /> : <Register />} />
				<Route path="/myorders" element={token ? <MyOrders /> : <Login />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />;
			</Routes>
			{/* Your routes/components */}

			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick={true}
				rtl={false}
				pauseOnFocusLoss={false}
				draggable={true}
				pauseOnHover={true}
				theme="light"
				transition={Slide} // ✅ required for close animation
				toastClassName="custom-toast"
				bodyClassName="custom-toast-body"
			/>
		</div>
	);
};

export default App;
