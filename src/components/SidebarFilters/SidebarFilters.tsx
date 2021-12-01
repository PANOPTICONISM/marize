import React, { useState } from "react";
import { useCommerceCMS } from "../../contexts/CommerceContext";
import uniqueCategories from "../../config/filtersConfig";
import style from "../../pages/Products/products.module.css";
export default function SidebarFilters() {
    const { products } = useCommerceCMS();
    const categories = products?.map((cat) => {
        return cat["categories"][0]["slug"];
    });
    const brands = products?.map((brand) => {
        return brand["categories"][1]["slug"];
    });
    const category = uniqueCategories(categories);
    const brand = uniqueCategories(brands);

    //THIS IS FOR FILTERING LATER
    //const sweaters = commerce.categories;
    // .retrieve("dresses", { type: "slug" })
    // .then((cat: { name: any }) => console.log(cat.name));

    return (
        <form className={style.sidebar_filters}>
            <div className={style.new_arrivals}>
                <h4>New Arrivals</h4>
                <label>
                    show all
                    <input type="checkbox" name="name" value="value" />
                </label>
                <br />
                {category?.map((cat) => (
                    <>
                        <label htmlFor="cat">
                            {cat}
                            <input type="checkbox" name="" value="" />
                        </label>
                        <br />
                    </>
                ))}
            </div>
            <div className={style.brands}>
                <h4>Brands</h4>
                {brand?.map((b) => (
                    <>
                        <label htmlFor="b">
                            {b}
                            <input type="checkbox" name="" value="" />
                        </label>
                        <br />
                    </>
                ))}
            </div>
        </form>
    );
}
