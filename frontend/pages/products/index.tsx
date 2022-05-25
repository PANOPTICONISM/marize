import { MdOutlineFilterAlt } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import style from "../../styles/products.module.css";
import Main from "../../containers/Main/Main";
import Image from "next/image";
import heroproducts from "../../public/assets/heroproducts.png";
import FilterComponent from "../../components/Filters/Filters";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { GlobalContext } from "../../contexts/CartAndFavouritesContext";
import {
  addToFavourites,
  removeFromFavourites,
} from "../../utils/FavouritesFunctions";
import { sanity } from "../api/lib/sanity";
import { absoluteURLsForSanity } from "../../utils/SanityFunctions";

export const addUrlParams = (router, cat) => {
  router.push({ pathname: "/products", query: cat }, undefined, {
    shallow: true,
  });
};

export default function Products({ data, context }) {
  const { locale } = context;
  const { products, vendors, categories } = data;
  const [filteredArticles, setFilteredArticles] = useState<any>([]);
  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    state: false,
  });
  const [mobileFilters, setMobileFilters] = useState(true);
  let isDiscounts = false;

  const handleChecked = (e) => {
    const value = e.target.value;

    const filterBrand =
      e.target.checked && e.target.name === "brands"
        ? [...filters.brands, value]
        : filters.brands.filter((prev: any) => prev !== value);
    const filterCat =
      e.target.checked && e.target.name === "categories"
        ? [...filters.categories, value]
        : filters.categories.filter((prev: any) => prev !== value);

    setFilters({ brands: filterBrand, categories: filterCat, state: true });
  };

  // fix filtering method
  useEffect(() => {
    if (filters.state) {
      const filtered = products?.filter((product) => {
        return filters?.brands?.some(
          (c: string) => product.vendor && product.vendor.title.includes(c)
        );
      });
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(products);
    }
  }, [filters, locale, products]);

  const { state, dispatch } = useContext(GlobalContext);

  const articlesUI = filteredArticles?.map((article: any) => (
    <div className={style.card} key={article._id}>
      {article.discounted === true ? (isDiscounts = true) : null}
      <div className={style.blue_heart}>
        {state?.favourites.includes(article) ? (
          <AiFillHeart
            onClick={() => removeFromFavourites(dispatch, article._id)}
            className={style.shoppingSVG}
          />
        ) : (
          <AiOutlineHeart
            onClick={() => addToFavourites(dispatch, article)}
            className={style.shoppingSVG}
          />
        )}
      </div>
      <Link href={`/products/${article._id}`}>
        <a>
          <Image
            src={absoluteURLsForSanity(article?.images[0].asset._ref).url()}
            width={300}
            height={340}
            alt="products"
          />
        </a>
      </Link>
      <div className={style.card_txt}>
        <p className={style.brand}>{article.vendor?.title}</p>
        <p>
          {article.title[locale] ? article.title[locale] : article.title.pt}
        </p>
      </div>
    </div>
  ));

  console.log(filteredArticles, filters);

  return (
    <Main>
      <div className={style.products_container}>
        <header className={style.products_hero}>
          <Image
            src={heroproducts}
            width={1140}
            height={200}
            alt="products_hero"
          />
          <h1 className={style.products_title}>
            20% discount on all Christmas gifts
          </h1>
        </header>
        <h1>WOMEN'S CLOTHES</h1>

        <div>
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
        </div>

        <div className={style.containerProductSection}>
          <FilterComponent
            onChange={handleChecked}
            vendors={vendors}
            categories={categories}
            discounts={isDiscounts}
            mobileFilters={mobileFilters}
          />
          <div className={style.products_wrapper}>{articlesUI}</div>
        </div>
      </div>
    </Main>
  );
}

export async function getStaticProps(context) {
  const data = await sanity.fetch(
    `{'products': *[_type == "product"]{
      _id, 
      body, 
      category[]->{_id, title, parentVendor}, 
      images, 
      slug, 
      title, 
      discounted,
      vendor->{_id, title}},
      'vendors': *[_type == "vendor"]{title, _id},
      'categories': *[_type == "category"]
    }`
  );

  return {
    props: {
      data,
      context,
    },
    revalidate: 1,
  };
}
