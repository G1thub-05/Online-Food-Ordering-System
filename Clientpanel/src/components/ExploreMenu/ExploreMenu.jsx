// import React, { useRef } from "react";
// import PropTypes from "prop-types";
// import { categories } from "../../assets/assets";
// import "./ExploreMenu.css";

// const ExploreMenu = ({ category, setCategory }) => {
//   const menuRef = useRef(null);
//   const scrollLeft = () => {
//     if (menuRef.current) {
//       menuRef.current.scrollBy({ left: -200, behavior: "smooth" });
//     }
//   };

//   const scrollRight = () => {
//     if (menuRef.current) {
//       menuRef.current.scrollBy({ left: 200, behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="explore-menu position-relative">
//       <h1 className="d-flex align-items-center justify-content-between">
//         Explore Our Menu
//         <div className="d-flex">
//           <i
//             className="bi bi-arrow-left-circle scroll-icon"
//             onClick={scrollLeft}
//           ></i>
//           <i
//             className="bi bi-arrow-right-circle scroll-icon"
//             onClick={scrollRight}
//           ></i>
//         </div>
//       </h1>
//       <p>Explore curated lists of dishes from top categories</p>
//       <div
//         className="d-flex justify-content-between gap-4 overflow-auto explore-menu-list"
//         ref={menuRef}
//       >
//         {categories.map((item, index) => {
//           return (
//             <div
//               key={index}
//               className="text-center explore-menu-list-item"
//               onClick={() =>
//                 setCategory((prev) =>
//                   prev === item.category ? "All" : item.category
//                 )
//               }
//             >
//               <img
//                 src={item.icon}
//                 alt=""
//                 className={
//                   item.category === category
//                     ? "rounded-circle active"
//                     : "rounded-circle"
//                 }
//                 height={128}
//                 width={128}
//               />
//               <p
//                 className={
//                   item.category === category
//                     ? "mt-2 fw-bold text-active"
//                     : "mt-2 fw-bold"
//                 }
//               >
//                 {item.category}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//       <hr />
//     </div>
//   );
// };
// ExploreMenu.propTypes = {
//   category: PropTypes.string.isRequired,
//   setCategory: PropTypes.func.isRequired,
// };

// export default ExploreMenu;

// ui 1

import React from "react";
import { categories } from "../../assets/assets";
import "./ExploreMenu.css";
import "../../App.css";

const ExploreMenu = ({ category, setCategory }) => {
	return (
		<div className="explore-menu">
			<div className="explore-menu-header">
				<h2>🛒</h2>
				<h2 className="explore-menu-title">Explore Your Taste Now!</h2>
			</div>
			<p className="explore-menu-description">
				"Find what makes your mouth water"
			</p>
			<div className="explore-menu-list">
				{categories.map((item, index) => (
					<div
						key={index}
						tabIndex={-1}
						className={`explore-menu-item ${
							category === item.category ? "active" : ""
						}`}
						onClick={(e) => {
							e.preventDefault();
							setCategory((prev) =>
								prev === item.category ? "All" : item.category
							);
							e.currentTarget.blur();
						}}
					>
						<div className="menu-image-wrapper">
							<img src={item.icon} alt={item.category} />
						</div>
						<p className={category === item.category ? "text-active" : ""}>
							{item.category}
						</p>
					</div>
				))}
			</div>
			<hr />
		</div>
	);
};

export default ExploreMenu;
