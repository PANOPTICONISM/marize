import React from "react";
import { useState, useEffect } from "react";
import { commerce } from "../../lib/Commerce";
export default function Products() {
	const [products, setProducts] = useState([]);
	//commerce.products.list() is build in method from commerce
	const fetchProducts = async () => {
		const data = await commerce.products.list();
		setProducts(data.data);
	};
	useEffect(() => {
		fetchProducts();
	}, []);
	console.log(products);
	return (
		<div>
			<h1>Hello World</h1>
			{products.map((product) => (
				<div className="card" key={product["id"]}>
					<div className="img_container">
						<img
							src={product["image"]["url"]}
							alt="image"
						/>
					</div>
					<div className="card_txt">
						<p className="brand">
							{product["categories"][1]["name"]}
						</p>
						<p>{product["name"]}</p>
						<p className="proce">
							{product["price"]["formatted_with_code"]}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
