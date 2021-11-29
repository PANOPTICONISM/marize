import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Homepage from "../pages/Homepage/Homepage";
import Products from "../pages/Homepage/Products";

function Paths() {
	return (
		<Routes>
			<Route path="/" element={<Homepage />} />
			<Route path="products" element={<Products />} />
		</Routes>
	);
}

export default Routes;
