import Image from "next/image";
import Head from "next/head";
import Main from "../containers/Main/Main";
import hero from "../public/assets/hero-image.png";
import style from "../styles/homepage.module.css";
import NewArrivals from "../components/NewArrivals/NewArrivals";
import VisitStore from "../components/VisitStore/VisitStore";
import CategorySections from "../components/CategorySections/CategorySections";
import { sanity } from "./api/lib/sanity.js";

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
          <Image src={hero} width={750} height={440} alt="hero" />
        </header>
        <section className={style.brands}>
          <Image
            src="/assets/sky-cashmere.svg"
            width={220}
            height={60}
            alt="sky cashmere"
          />
          <Image
            src="/assets/caminatta.svg"
            width={220}
            height={100}
            alt="caminatta"
          />
          <Image
            src="/assets/atlanta_mocassin.svg"
            width={220}
            height={60}
            alt="atlanta-mocassin"
          />
          <Image
            src="/assets/moda_ana.svg"
            width={220}
            height={100}
            alt="moda-ana"
          />
          <Image
            src="/assets/love_m.svg"
            width={220}
            height={60}
            alt="love-m"
          />
        </section>
        <NewArrivals products={products} />
        <VisitStore className={style.visitHomepage} />
        <CategorySections />
      </Main>
    </>
  );
}

export async function getStaticProps() {
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

  return {
    props: {
      products,
    },
  };
}

// export async function getServerSideProps(ctx) {
//   // get the current environment
//   let dev = process.env.NODE_ENV !== "production";
//   let { DEV_URL, PROD_URL } = process.env;

//   // request posts from api
//   let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/mongo`);
//   // extract the data
//   let data = await response.json();

//   return {
//     props: {
//       posts: data["message"],
//     },
//   };
// }
