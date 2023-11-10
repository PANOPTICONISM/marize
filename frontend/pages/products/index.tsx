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
  const sectionQuery = React.useMemo(() => searchParams.get('section'), [searchParams]);
  const query = React.useMemo(() => searchParams.get('q'), [searchParams]);
  const typeQuery = React.useMemo(() => searchParams.get('type'), [searchParams]);
  const categories = useCategories();
  const { state, dispatch } = React.useContext(GlobalContext);

  const [filteredArticles, setFilteredArticles] = React.useState<any>([]);
  const [filters, setFilters] = React.useState({
    brands: [],
    categories: [],
    types: [],
    isDiscounted: [],
  });
  const [isDiscounts, setIsDiscounts] = React.useState(false);
  const [mobileFilters, setMobileFilters] = React.useState(true);

  React.useEffect(() => {
    setFilters((currentFilters) => {
      if (query) {
        const firstLetterUppercase = query.split(" ").map((q) => q.charAt(0).toUpperCase() + q.slice(1)).join(" ");
        if (sectionQuery === "categories" && !currentFilters.categories.includes(firstLetterUppercase)) {
          return { brands: [], categories: [firstLetterUppercase], types: [], isDiscounted: [] };
        }
        if (sectionQuery === "brands" && !currentFilters.brands.includes(firstLetterUppercase)) {
          return { brands: [firstLetterUppercase], categories: [], types: [], isDiscounted: [] };
        }
      }
      if (typeQuery && !currentFilters.types.includes(typeQuery)) {
        return { brands: [], categories: [], types: [typeQuery], isDiscounted: [] };
      }
        return currentFilters;
      })

  }, [typeQuery, query, sectionQuery]);

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
    const filterType =
      e.target.checked && e.target.name === "type"
        ? [...filters.types, value]
        : filters.types.filter((prev: string) => prev !== value);
    const filterDiscount =
      e.target.checked && e.target.name === "discount"
        ? [...filters.isDiscounted, value]
        : filters.isDiscounted.filter((prev: string) => prev !== value);

    setFilters({
      brands: filterBrand,
      categories: filterCat,
      types: filterType,
      isDiscounted: filterDiscount
    });
  };

  const filterByBrandAndCategory = React.useCallback(() => {
    const hasProductsWithDiscount = products.filter((product) => product.discounted);
    setIsDiscounts(hasProductsWithDiscount.length > 0);

    if (filters.categories.length === 0 && filters.brands.length === 0) {
      setFilteredArticles(products)
      return;
    }
    const result = products.filter((product) =>
      filters.categories.includes(product?.category?.title[locale]) ||
      filters.brands.includes(product?.vendor?.title));

    setFilteredArticles(result);

  }, [filters.brands, filters.categories, locale, products]);

  const filterByClothingOrAccessory = React.useCallback(() => {
    if (!typeQuery && filters.types.length === 0) {
      return;
    }
    setFilteredArticles((currentProducts) => {
      if (filters.types.length > 0) {
        const result = currentProducts.filter((product) =>
          filters.types.includes(product.category._type));
        return result;
      }
      return currentProducts;
    });
  }, [filters.types, typeQuery]);

  const filterByDiscountedProducts = React.useCallback(() => {
    if (filters.isDiscounted.length === 0) {
      return;
    }
    setFilteredArticles((currentProducts) => currentProducts.filter((product) => product.discounted));
  }, [filters.isDiscounted]);

  React.useEffect(() => {
    filterByBrandAndCategory();
    filterByClothingOrAccessory();
    filterByDiscountedProducts();
  }, [filterByBrandAndCategory, filterByClothingOrAccessory, filterByDiscountedProducts]);

  const articlesUI = filteredArticles.map((article: any) => (
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
      <h2 className={style.title}>
        {article.title[locale]
          ? article.title[locale]
          : article.title.pt}
      </h2>
      {article.vendor ? (
        <h3 className={style.brand}>{article.vendor.title}</h3>
      ) : null}
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
      category->{_id, title, _type},
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
