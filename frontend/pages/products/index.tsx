import { MdOutlineFilterAlt } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import style from "../../styles/products.module.css";
import Main from "../../containers/Main/Main";
import Image from "next/image";
import FilterComponent from "../../components/Filters/Filters";
import { useState, useContext } from "react";
import Link from "next/link";
import { GlobalContext } from "../../contexts/CartAndFavouritesContext";
import {
  addToFavourites,
  removeFromFavourites,
} from "../../utils/FavouritesFunctions";
import { sanity } from "../api/lib/sanity";
import { absoluteURLsForSanity } from "../../utils/SanityFunctions";
import { translations } from "../../translations/common";
import React from "react";

export const addUrlParams = (router, cat) => {
  router.push({ pathname: "/products", query: cat }, undefined, {
    shallow: true,
  });
};

export default function Products({ data, locale, mainPageContent }) {
  const { products } = data;
  const categories = products.map((product) =>
    product.category.title[locale]
  ).filter(Boolean);
  const categoriesNoDuplicates = [...new Set(categories)] as string[];
  const vendors = products.map((product) =>
    product.vendor && product.vendor.title
  ).filter(Boolean);
  const vendorsNoDuplicates = [...new Set(vendors)] as string[];
  const { state, dispatch } = useContext(GlobalContext);

  const [filteredArticles, setFilteredArticles] = useState<any>(products);
  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    stateDiscount: false,
  });
  const [isDiscounts, setIsDiscounts] = useState(false);
  const [mobileFilters, setMobileFilters] = useState(true);

  const handleChecked = (e: {
    target: { value: string; checked: boolean; name: string };
  }) => {
    const value = e.target.value;

    console.log(e.target.name)

    const filterBrand =
      e.target.checked && e.target.name === "brands"
        ? [...filters.brands, value]
        : filters.brands.filter((prev: any) => prev !== value);
    const filterCat =
      e.target.checked && e.target.name === "categories"
        ? [...filters.categories, value]
        : filters.categories.filter((prev: any) => prev !== value);

    const filterDiscounts =
      e.target.checked && e.target.value === translations[locale].discount
        ? true
        : false;

    setFilters({
      brands: filterBrand,
      categories: filterCat,
      stateDiscount: filterDiscounts,
    });
  };

  React.useEffect(() => {
    const productsFilteredByBrand = [];
    if (filters.brands.length > 0) {
      const filtered = products?.filter((product) =>
        filters?.brands?.some(
          (c: string) => product.vendor && product.vendor.title.includes(c)
        )
      );
      productsFilteredByBrand.push(...filtered);
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(products);
    }

    if (filters.categories.length > 0) {
      const filteredByCat = (
        productsFilteredByBrand.length > 0 ? productsFilteredByBrand : products
      )?.filter((product) =>
        filters?.categories?.some(
          (c: string) =>
            product.category && product?.category?.title[locale]?.includes(c)
        )
      );
      setFilteredArticles(filteredByCat);
    }

    if (isDiscounts && filters.stateDiscount) {
      const filteredByDiscount = products?.filter(
        (product) => product.discounted
      );
      setFilteredArticles(filteredByDiscount);
    }

    const discountState = products.map((product) => product.discounted);
    setIsDiscounts(discountState?.includes(true));
  }, [filters, isDiscounts, locale, products]);

  const articlesUI = filteredArticles?.map((article: any) => (
    <div className={style.card} key={article._id}>
      <div className={style.blue_heart}>
        {state?.favourites.some(
          (favourite: { _id: string }) => favourite._id === article._id
        ) ? (
          <button
            onClick={() => removeFromFavourites(dispatch, article)}
            className={style.shoppingSVG}
          >
            <AiFillHeart />
          </button>
        ) : (
          <AiOutlineHeart
            onClick={() => addToFavourites(dispatch, article)}
            className={style.shoppingSVG}
          />
        )}
      </div>
      {article.images ? (
        <div className={style.imageWrapper}>
          <Link href={`/products/${article._id}`} passHref>
            <Image
              src={absoluteURLsForSanity(article.images?.[0].asset._ref).url()}
              width={300}
              height={380}
              alt="products"
              className={style.image}
            />
          </Link>
        </div>
      ) : null}
      <h2 className={style.brand}>{article.vendor?.title}</h2>
      <h3 className={style.title}>
        {article.title[locale] ? article.title[locale] : article.title.pt}
      </h3>
    </div>
  ));

  if (!mainPageContent) {
    return <></>;
  }

  return (
    <Main>
      <div className={style.products_container}>
        <section className={style.products_hero}>
          <div
            style={{
              position: "relative",
              maxWidth: "1140px",
              height: "200px",
            }}
          >
            <Image
              src={absoluteURLsForSanity(
                mainPageContent[0].backgroundImage.asset._ref
              ).url()}
              sizes="100%"
              fill
              style={{
                objectFit: "cover",
              }}
              alt="products_hero"
            />
          </div>
          <h1 className={style.products_title}>
            {mainPageContent[0].slogan[locale]}
          </h1>
        </section>
        <ul className={style.sort_filter}>
          <li
            className={style.mobile_filters}
            onClick={() => setMobileFilters(!mobileFilters)}
          >
            <span>
              <MdOutlineFilterAlt />
            </span>
            All filters
          </li>
        </ul>
        <div className={style.containerProductSection}>
          <FilterComponent
            onChange={handleChecked}
            vendors={vendorsNoDuplicates}
            categories={categoriesNoDuplicates}
            discounts={isDiscounts}
            mobileFilters={mobileFilters}
          />
          <div className={style.products_wrapper}>{articlesUI}</div>
        </div>
      </div>
    </Main>
  );
}

export async function getServerSideProps(context) {
  const { locale } = context;

  const mainPageContent = await sanity.fetch(
    `*[_type == "products"]{
      slogan,
      backgroundImage
    }`
  );

  const data = await sanity.fetch(
    `{'products': *[_type == "product"]{
      _id, 
      body, 
      category->{_id, title}, 
      images, 
      slug, 
      title, 
      discounted,
      vendor->{_id, title}},
    }`
  );

  return {
    props: {
      mainPageContent,
      data,
      locale,
    },
  };
}
