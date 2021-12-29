import Image from "next/image"
import { commerce } from "../lib/Commerce.js";
import Main from "../containers/Main/Main";
import hero from "../assets/hero-image.png";
import style from "../styles/homepage.module.css";
import sky from "../assets/sky-cashmere.svg";
import caminatta from "../assets/caminatta.svg";
import atlanta from "../assets/atlanta_mocassin.svg";
import moda from "../assets/moda_ana.svg";
import love from "../assets/love_m.svg";
import NewArrivals from "../components/NewArrivals/NewArrivals";
import VisitStore from "../components/VisitStore/VisitStore";
import CategorySections from "../components/CategorySections/CategorySections";

export default function Homepage({products}) {
    return (
        <Main>
            <header className={style.homepageHero}>
                <h1 className={style.heading}>
                    HANDPICKED APPAREL WITH <span>YOU</span> IN MIND
                </h1>
                <Image src={hero} alt="hero" />
            </header>
            <section className={style.brands}>
                <img src={sky} alt="vera" />
                <img src={caminatta} alt="caminatta" />
                <img src={atlanta} alt="atlanta-mocassin" />
                <img src={moda} alt="moda-ana" />
                <img src={love} alt="love-m" />
            </section>
            <NewArrivals products={products} />
            <VisitStore className={style.visitHomepage} />
            <CategorySections />
        </Main>
    );
}

export async function getStaticProps() {
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