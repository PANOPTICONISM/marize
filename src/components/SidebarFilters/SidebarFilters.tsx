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
    //remove all double values form sidebar
    const category = uniqueCategories(categories);
    const brand = uniqueCategories(brands);

    //THIS IS FOR FILTERING LATER MAYBE
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
                    {/* <span className={style.checkmark}></span> */}
                </label>
                <br />
                {category?.map((cat, i) => (
                    <div key={i}>
                        <label>
                            {cat}
                            <input type="checkbox" name="" value="" />
                        </label>
                        <br />
                    </div>
                ))}
            </div>
            <div className={style.brands}>
                <h4>Brands</h4>
                {brand?.map((b, i) => (
                    <div key={i}>
                        <label htmlFor="b">
                            {b}
                            <input type="checkbox" name="" value="" />
                        </label>
                        <br />
                    </div>
                ))}
            </div>
        </form>
    );
}
