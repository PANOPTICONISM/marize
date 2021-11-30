import React from "react";
import { useState, useEffect } from "react";
import { commerce } from "../../lib/Commerce";
import { MdFavoriteBorder } from "react-icons/md";
import Main from "../../containers/Main/Main";
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
    <Main>
      <h1>clothes for women</h1>
      <div className="products_card">
        {products.map((product) => (
          <div className="card" key={product["id"]}>
            <div className="img_container">
              <div className="blue_heart">
                <MdFavoriteBorder />
              </div>
              <img src={product["image"]["url"]} alt="products" />
            </div>
            <div className="card_txt">
              <p className="brand">{product["categories"][1]["name"]}</p>
              <p>{product["name"]}</p>
              <p className="price">{product["price"]["formatted_with_code"]}</p>
            </div>
          </div>
        ))}
      </div>
    </Main>
  );
}
