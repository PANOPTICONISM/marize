import Image from "next/image";
import style from "../styles/about.module.css";
import Main from "../containers/Main/Main";
import { useContentfulCMS } from "../contexts/ContentfulContext";
import sky from "../public/assets/sky-cashmere.svg";
import caminatta from "../public/assets/caminatta.svg";
import atlanta from "../public/assets/atlanta_mocassin.svg";
import moda from "../public/assets/moda_ana.svg";
import love from "../public/assets/love_m.svg";
import { sanity } from "./api/lib/sanity";
import { absoluteURLsForSanity } from "../utils/SanityFunctions";
import { styleSanityBlocks } from "../utils/SanityFunctions";
import { Key } from "react";

export default function About({ data }) {
  const {
    heading,
    bulletPoints,
    description,
    hero,
    image,
    storeImages,
    subheading,
  } = data.about[0];

  return (
    <Main>
      {data.about[0] ? (
        <div className={style.aboutPage}>
          <header>
            <Image
              src={absoluteURLsForSanity(hero.asset._ref).url()}
              width={1000}
              height={300}
              alt="muralhas"
            />
            <h1>{heading}</h1>
          </header>
          <article>
            <section className={style.introduction}>
              {styleSanityBlocks(description)}
            </section>
            <section className={style.whyVisitUs}>
              <Image
                src={absoluteURLsForSanity(image.asset._ref).url()}
                width={1000}
                height={300}
                alt="background-image"
              />
              <div>{styleSanityBlocks(bulletPoints)}</div>
            </section>
            <section className={style.brands}>
              <Image src={sky} alt="vera" />
              <Image src={caminatta} alt="caminatta" />
              <Image src={atlanta} alt="atlanta-mocassin" />
              <Image src={moda} alt="moda-ana" />
              <Image src={love} alt="love-m" />
            </section>
            <section>
              <h1>{subheading}</h1>
              <div className={style.storeImages}>
                {storeImages.map(
                  (image: { _key: Key; asset: { _ref: any } }) => (
                    <Image
                      key={image._key}
                      src={absoluteURLsForSanity(image.asset._ref).url()}
                      width={285}
                      height={350}
                      alt="store"
                    />
                  )
                )}
              </div>
            </section>
          </article>
        </div>
      ) : null}
    </Main>
  );
}

export async function getStaticProps() {
  const data = await sanity.fetch(`{'about': *[_type == "about"]{
    _id,
    heading,
    bulletPoints,
    description,
    hero,
    image,
    storeImages,
    subheading,
    title
  }
  }`);

  return {
    props: {
      data,
    },
  };
}
