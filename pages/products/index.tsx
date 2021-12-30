import { MdKeyboardArrowDown, MdOutlineFilterAlt } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import style from "../../styles/products.module.css";
import { useCommerceCMS } from "../../contexts/CommerceContext";
import Main from "../../containers/Main/Main";
import Image from "next/image";
import heroproducts from "../../public/assets/heroproducts.png";
import FilterComponent from "../../components/Filters/Filters";
import { useState, useEffect, useContext } from "react";
import Link from 'next/link'
import { FavouritesContext } from "../../contexts/FavouritesContext";
import {
    addToFavourites,
    removeFromFavourites,
} from "../../utils/FavouritesFunctions";
import { commerce } from "../../lib/Commerce";

export default function Products({categories, products}) {
    const [filteredArticles, setFilteredArticles] = useState<any>([]);
    const [filters, setFilters] = useState([]);
    const [sortType, setSortType] = useState(null);
    const [mobileFilters, setMobileFilters] = useState(true);
    const handleChecked = (e: {
        target: { value: number; checked: boolean };
    }) => {
        const value = e.target.value;
        setFilters((previous: any) =>
            !e.target.checked
                ? previous.filter((prev: any) => prev !== value)
                : [...previous, value]
        );
        setSortType(null);
    };
    console.log("products", products)
    useEffect(() => {
        if (filters.length > 0) {
            const filtered = products?.filter((product) => {
                return filters?.some(
                    (c: string) =>
                        product.categories[1].name.includes(c) ||
                        product.categories[0].name.includes(c)
                );
            });
            setFilteredArticles(filtered);
        } else {
            setFilteredArticles(products);
        }
    }, [filters, products]);

    useEffect(() => {
        const sortArray = (type: any) => {
            let sorted: any;
            if (sortType === "Highest price") {
                sorted = [...filteredArticles].sort((a: any, b: any) =>
                    a.price.raw < b.price.raw ? 1 : -1
                );
                setFilteredArticles(sorted);
            }
            if (sortType === "Lowest price") {
                sorted = [...filteredArticles].sort((a: any, b: any) =>
                    a.price.raw > b.price.raw ? 1 : -1
                );
                setFilteredArticles(sorted);
            }
        };
        sortArray(sortType);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortType]);

    const { state, dispatch } = useContext(FavouritesContext);

    const articlesUI = filteredArticles?.map((article: any) => (
        <div className={style.card} key={article.id}>
            <div className={style.img_container}>
                <div className={style.blue_heart}>
                    {state?.favourites.includes(article) ? (
                        <AiFillHeart
                            onClick={() =>
                                removeFromFavourites(dispatch, article.id)
                            }
                            className={style.shoppingSVG}
                        />
                    ) : (
                        <AiOutlineHeart
                            onClick={() => addToFavourites(dispatch, article)}
                            className={style.shoppingSVG}
                        />
                    )}
                </div>
                <Link href={`/products/${article.id}`}>
                    <img src={article.image.url} alt="products" />
                </Link>
            </div>
            <div className={style.card_txt}>
                <p className={style.brand}>{article.categories[1].name}</p>
                <p>{article.name}</p>
                <p className={style.price}>
                    {article.price.formatted_with_code}
                </p>
            </div>
        </div>
    ));

    return (
        <Main>
            <div className={style.products_container}>
                <header className={style.products_hero}>
                    <Image src={heroproducts} alt="products_hero" />
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
                        <li className={style.sort}>
                            <span>
                                Sort by
                                <MdKeyboardArrowDown />
                            </span>
                            <div className={style.sort_dropdown}>
                                <p
                                    onClick={(e: any) =>
                                        setSortType(e.target.innerText)
                                    }
                                >
                                    Highest price
                                </p>
                                <p
                                    onClick={(e: any) =>
                                        setSortType(e.target.innerText)
                                    }
                                >
                                    Lowest price
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className={style.containerProductSection}>
                    <FilterComponent
                        onChange={handleChecked}
                        categories={categories}
                        mobileFilters={mobileFilters}
                    />
                    <div className={style.products_wrapper}>{articlesUI}</div>
                </div>
            </div>
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