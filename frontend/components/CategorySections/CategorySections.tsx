import React from "react";
import Image from "next/image";
import { useCommerceCMS } from "../../contexts/CommerceContext";
import { PrimaryButton } from "../Buttons/Buttons";
import style from "./categorysections.module.css";

function CategorySections() {
  const { categories } = useCommerceCMS();
  const clothingAndAcessories = categories?.slice(1, 3).reverse();

  return (
    <section className={style.homepageCategories}>
      {clothingAndAcessories?.map((category) => (
        <div key={category.id}>
          <div className={style.homepageWrapper}>
            <Image
              src={category.assets[0].url}
              width={350}
              height={350}
              alt={category.slug}
            />
          </div>
          <PrimaryButton
            className={style.categoryBtns}
            text={`Explore ${category?.slug}`}
            path="/products"
          />
        </div>
      ))}
    </section>
  );
}

export default CategorySections;
