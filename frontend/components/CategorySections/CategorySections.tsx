import React from "react";
import Image from "next/image";
import { PrimaryButton, SectionButton } from "../Buttons/Buttons";
import style from "./categorysections.module.css";
import { absoluteURLsForSanity } from "../../utils/SanityFunctions";

function CategorySections({ body }) {
  const { firstBox, imageOne, secondBox, imageTwo } = body;

  return (
    <section className={style.homepageCategories}>
      <div>
        <div className={style.homepageWrapper}>
          <Image
            src={absoluteURLsForSanity(imageOne).url()}
            width={350}
            height={350}
            alt={firstBox.toLowerCase()}
          />
        </div>
        <SectionButton
          className={style.categoryBtns}
          text={firstBox}
          href={{
            pathname: "/products",
          }}
        />
      </div>
      <div>
        <div className={style.homepageWrapper}>
          <Image
            src={absoluteURLsForSanity(imageTwo).url()}
            width={350}
            height={350}
            alt={firstBox.toLowerCase()}
          />
        </div>
        <SectionButton
          className={style.categoryBtns}
          text={secondBox}
          href={{
            pathname: "/products",
            query: { 0: "Accessorios" },
          }}
        />
      </div>
    </section>
  );
}

export default CategorySections;
