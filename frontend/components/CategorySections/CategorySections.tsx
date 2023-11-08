import React from "react";
import Image from "next/image";
import { SectionButton } from "../Buttons/Buttons";
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
          text={firstBox[locale]}
          href={{
            pathname: "/products",
            query: { q: "clothing" }
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
          text={secondBox[locale]}
          href={{
            pathname: "/products",
            query: { q: "accessory" },
          }}
        />
      </div>
    </section>
  );
}

export default CategorySections;
