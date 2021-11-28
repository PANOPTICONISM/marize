import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Homepage from "../pages/Homepage/Homepage";

function Paths() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="products"
        // element="component here"
      />
    </Routes>
  );
}

export default Routes;
