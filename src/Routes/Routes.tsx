import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage/Homepage";
import Product from "../pages/Products/Product/Product";
import Products from "../pages/Products/Products";
import CheckoutWrapper from "../pages/Checkout/CheckoutWrapper";
import About from "../pages/About/About";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "../pages/TermsConditions/TermsConditions";

function Paths() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<Product />} />
            <Route path="/checkout/:cartId" element={<CheckoutWrapper />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
        </Routes>
    );
}

export default Paths;
