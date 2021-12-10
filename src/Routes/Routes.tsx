import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage/Homepage";
import Product from "../pages/Products/Product/Product";
import Products from "../pages/Products/Products";
import CheckoutWrapper from "../pages/Checkout/CheckoutWrapper";

function Paths() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<Product />} />
            <Route path="/checkout/:cartId" element={<CheckoutWrapper />} />
        </Routes>
    );
}

export default Paths;
