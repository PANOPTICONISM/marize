import { MdOutlineFilterAlt } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import style from "../../styles/products.module.css";
import Main from "../../containers/Main/Main";
import Image from "next/image";
import FilterComponent from "../../components/Filters/Filters";
import Link from "next/link";
import { GlobalContext } from "../../contexts/CartAndFavouritesContext";
import {
  addToFavourites,
  removeFromFavourites,
} from "../../utils/FavouritesFunctions";
import { sanity } from "../api/lib/sanity";
import { absoluteURLsForSanity } from "../../utils/SanityFunctions";
import React from "react";
import { useCategories } from "../../contexts/CategoriesContext";
import { useSearchParams } from "next/navigation";

export default function Products({ data, locale, mainPageContent }) {
  const { products } = data;
  const searchParams = useSearchParams();
  const typeQuery = React.useMemo(() => searchParams.get('type'), [searchParams]);
  const query = React.useMemo(() => searchParams.get('q'), [searchParams]);
  const categories = useCategories();
  const { state, dispatch } = React.useContext(GlobalContext);

  const [filteredArticles, setFilteredArticles] = React.useState<any>(products);
  const [filters, setFilters] = React.useState({
    brands: [],
    categories: [],
  });
  const [isDiscounts, setIsDiscounts] = React.useState(false);
  const [mobileFilters, setMobileFilters] = React.useState(true);

  React.useEffect(() => {
    if (query) {
      const firstLetterUppercase = query.charAt(0).toUpperCase() + query.slice(1);
      setFilters((currentFilters) => {
        if (typeQuery === "categories" && !currentFilters.categories.includes(firstLetterUppercase)) {
          return { brands: [], categories: [firstLetterUppercase] };
        }
        if (typeQuery === "brands" && !currentFilters.brands.includes(firstLetterUppercase)) {
          return { brands: [firstLetterUppercase], categories: [] };
        }
        return currentFilters;
      })
    }
  }, [query, typeQuery]);

  const handleChecked = (e: {
    target: { value: string; checked: boolean; name: string };
  }) => {
    const value = e.target.value;

    const filterBrand =
      e.target.checked && e.target.name === "brands"
        ? [...filters.brands, value]
        : filters.brands.filter((prev: string) => prev !== value);
    const filterCat =
      e.target.checked && e.target.name === "categories"
        ? [...filters.categories, value]
        : filters.categories.filter((prev: string) => prev !== value);

    setFilters({
      brands: filterBrand,
      categories: filterCat,
    });
  };

  const filterByBrandAndCategory = React.useCallback(() => {
    const result = products.filter((product) =>
      (filters?.categories?.every(
        (c: string) =>
          product.category && product?.category?.title[locale]?.includes(c) || c === "Discounts" && product.discounted
      )) &&
      filters?.brands?.every(
        (c: string) => product.vendor && product.vendor.title.includes(c)));

    const hasProductsWithDiscount = products.filter((product) => product.discounted);
    setIsDiscounts(hasProductsWithDiscount.length > 0);

    setFilteredArticles(result)

  }, [filters?.brands, filters?.categories, locale, products])

  React.useEffect(() => {
    filterByBrandAndCategory()
  }, [filterByBrandAndCategory]);

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
            vendors={categories.vendors}
            categories={[...categories.accessory, ...categories.clothing]}
            discounts={isDiscounts}
            mobileFilters={mobileFilters}
            filters={filters}
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
