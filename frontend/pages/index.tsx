import Image from "next/image";
import Main from "../containers/Main/Main";
import style from "../styles/homepage.module.css";
import NewArrivals from "../components/NewArrivals/NewArrivals";
import VisitStore from "../components/VisitStore/VisitStore";
import CategorySections from "../components/CategorySections/CategorySections";
import { sanity } from "./api/lib/sanity.js";
import { useRouter } from "next/router";
import { absoluteURLsForSanity } from "../utils/SanityFunctions";

export default function Homepage({ products, homepage }) {
  console.log(products);
  console.log(homepage[0], "home");
  const { locale } = useRouter();

  const { slogan, image, imagesGallery, newArrivals, body } = homepage[0];

  return (
    <>
      <Main>
        <header className={style.homepageHero}>
          <h1 className={style.heading}>{slogan}</h1>
          <Image
            src={absoluteURLsForSanity(image.asset._ref).url()}
            width={750}
            height={440}
            alt="hero"
          />
        </header>
        <section className={style.brands}>
          {imagesGallery.map((img) => (
            <Image
              src={absoluteURLsForSanity(img.asset._ref).url()}
              key={img._key}
              width={250}
              height={80}
              alt=""
            />
          ))}
        </section>
        <NewArrivals title={newArrivals} products={products} locale={locale} />
        <VisitStore className={style.visitHomepage} />
        <CategorySections body={body} />
      </Main>
    </>
  );
}

export async function getServerSideProps() {
  const products = await sanity.fetch(
    `*[_type == "product"]{
      _id,
      body,
      category[]->{_id, title, parentVendor},
      images,
      slug,
      title,
      vendor->{_id, title}}
    `
  );

  const homepage = await sanity.fetch(
    `*[_type == "homepage"]{
      _id,
      image,
      slogan,
      imagesGallery,
      newArrivals,
      body
    }
    `
  );

  return {
    props: {
      products,
      homepage,
    },
  };
}
