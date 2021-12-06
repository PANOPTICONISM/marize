import React from "react";
import { useCommerceCMS } from "../../contexts/CommerceContext";
import PrimaryButton from "../Button/Button";
import style from "./categorysections.module.css";

function CategorySections() {
    const { categories } = useCommerceCMS();
    const clothingAndAcessories = categories?.slice(1, 3).reverse();

    return (
        <section className={style.homepageCategories}>
            {clothingAndAcessories?.map((category) => (
                <div key={category.id}>
                    <img src={category.assets[0].url} alt={category.slug} />
                    <PrimaryButton path="/">
                        Explore {category?.slug}
                    </PrimaryButton>
                </div>
            ))}
        </section>
    );
}

export default CategorySections;
