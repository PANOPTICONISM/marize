import Image from "next/image"
import Head from "next/head"
import { commerce } from "./api/lib/Commerce.js";
import Main from "../containers/Main/Main";
import hero from "../public/assets/hero-image.png";
import style from "../styles/homepage.module.css";
import NewArrivals from "../components/NewArrivals/NewArrivals";
import VisitStore from "../components/VisitStore/VisitStore";
import CategorySections from "../components/CategorySections/CategorySections";

export default function Homepage({ products }) {
  return (
    <>
      <Head>
        <title>Homepage</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Main>
        <header className={style.homepageHero}>
          <h1 className={style.heading}>
            HANDPICKED APPAREL WITH <span>YOU</span> IN MIND
          </h1>
          <Image src={hero} alt="hero" />
        </header>
        <section className={style.brands}>
          <img src="assets/sky-cashmere.svg" alt="sky cashmere" />
          <img src="assets/caminatta.svg" alt="caminatta" />
          <img src="assets/atlanta_mocassin.svg" alt="atlanta-mocassin" />
          <img src="assets/moda_ana.svg" alt="moda-ana" />
          <img src="assets/love_m.svg" alt="love-m" />
        </section>
        <NewArrivals products={products} />
        <VisitStore className={style.visitHomepage} />
        <CategorySections />
      </Main>
    </>
  );
}

export async function getStaticProps(context) {
  const { data: categories } = await commerce.categories.list();
  const { data: products } = await commerce.products.list({
    limit: 60,
  });

  return {
    props: {
      categories,
      products,
    },
  };
}