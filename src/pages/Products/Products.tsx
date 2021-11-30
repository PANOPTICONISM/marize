import React from "react";
import { useState, useEffect } from "react";
import { commerce } from "../../lib/Commerce";
import { MdFavoriteBorder } from "react-icons/md";
import style from "./products.module.css";
export default function Products() {
	const [products, setProducts] = useState([]);
	//commerce.products.list() is build in method from commerce
	const fetchProducts = async () => {
		const data = await commerce.products.list({
			limit: 40,
		});
		setProducts(data.data);
	};
	useEffect(() => {
		fetchProducts();
	}, []);
	console.log(products);
	return (
		<>
			<h1>clothes for women</h1>
			<div className={style.products_card}>
				{products.map((product) => (
					<div className={style.card} key={product["id"]}>
						<div className={style.img_container}>
							<div className={style.blue_heart}>
								<MdFavoriteBorder />
							</div>
							<img
								src={product["image"]["url"]}
								alt="products"
							/>
						</div>
						<div className={style.card_txt}>
							<p className={style.brand}>
								{product["categories"][1]["name"]}
							</p>
							<p>{product["name"]}</p>
							<p className={style.price}>
								{product["price"]["formatted_with_code"]}
							</p>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
