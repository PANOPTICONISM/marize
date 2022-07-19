import React from "react";
import Image from "next/image";
import { PrimaryButton, SectionButton } from "../Buttons/Buttons";
import style from "./categorysections.module.css";
import { absoluteURLsForSanity } from "../../utils/SanityFunctions";
import { useRouter } from "next/router";

function CategorySections({ body }) {
  const { firstBox, imageOne, secondBox, imageTwo } = body;
  const { locale } = useRouter();

  return (
    <section className={style.homepageCategories}>
      <div>
        <div className={style.homepageWrapper}>
          <Image
            src={absoluteURLsForSanity(imageOne).url()}
            width={350}
            height={350}
            alt={firstBox[locale]?.toLowerCase()}
          />
        </div>
        <SectionButton
          className={style.categoryBtns}
          text={firstBox[locale]}
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
            alt={firstBox[locale]?.toLowerCase()}
          />
        </div>
        <SectionButton
          className={style.categoryBtns}
          text={secondBox[locale]}
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
