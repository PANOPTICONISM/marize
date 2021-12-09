import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage/Homepage";
import Product from "../pages/Products/Product/Product";
import Products from "../pages/Products/Products";
import MenuNav from "../pages/MenuNav/MenuNav";

function Paths() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/menu" element={<MenuNav />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<Product />} />
        </Routes>
    );
}

export default Paths;
