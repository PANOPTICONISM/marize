import Image from "next/image";
import style from "../styles/about.module.css";
import Main from "../containers/Main/Main";
import { sanity } from "./api/lib/sanity";
import { absoluteURLsForSanity } from "../utils/SanityFunctions";
import { styleSanityBlocks } from "../utils/SanityFunctions";
import { Key } from "react";
import { useRouter } from "next/router";

export default function About({ data, brands }) {
  const { locale } = useRouter();
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
          <section>
            <Image
              src={absoluteURLsForSanity(hero.asset._ref).url()}
              width={1000}
              height={300}
              alt="muralhas"
            />
            <h1>{heading[locale] ? heading[locale] : heading.pt}</h1>
          </section>
          <article>
            <section className={style.introduction}>
              {styleSanityBlocks(
                description[locale] ? description[locale] : description.pt
              )}
            </section>
            <section className={style.whyVisitUs}>
              <Image
                src={absoluteURLsForSanity(image.asset._ref).url()}
                width={1000}
                height={300}
                alt="background-image"
              />
              <div>
                {styleSanityBlocks(
                  bulletPoints[locale] ? bulletPoints[locale] : bulletPoints.pt
                )}
              </div>
            </section>
            <section className={style.brands}>
              {brands[0].imagesGallery.map((img) => (
                <Image
                  src={absoluteURLsForSanity(img.asset._ref).url()}
                  key={img._key}
                  width={250}
                  height={80}
                  alt=""
                />
              ))}
            </section>
            <section>
              <h1>{subheading[locale] ? subheading[locale] : subheading.pt}</h1>
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

export async function getServerSideProps() {
  const brands = await sanity.fetch(
    `*[_type == "homepage"]{
      imagesGallery
    }
    `
  );
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
      brands,
    },
  };
}
