import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage/Homepage";
import Products from "../pages/Products/Products";

function Paths() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="products" element={<Products />} />
    </Routes>
  );
}

export default Paths;
