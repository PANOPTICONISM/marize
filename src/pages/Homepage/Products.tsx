import React from "react";
import { useState, useEffect } from "react";
import { commerce } from "../../lib/Commerce";
export default function Products() {
	const [products, setProducts] = useState([]);
	//commerce.product.list() is build in method from commerce
	const fetchProducts = async () => {
		const data = await commerce.products.list();
		setProducts(data);
	};
	useEffect(() => {
		fetchProducts();
	}, []);
	console.log(products);
	return (
		<div>
			<h1>Hello World</h1>
		</div>
	);
}
