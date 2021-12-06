import {
    MdFavoriteBorder,
    MdKeyboardArrowDown,
    MdOutlineFilterAlt,
} from "react-icons/md";
import style from "./products.module.css";
import { useCommerceCMS } from "../../contexts/CommerceContext";
import Main from "../../containers/Main/Main";
import heroproducts from "../../assets/heroproducts.png";
import FilterComponent from "../../components/Filters/Filters";
import { useState, useEffect } from "react";
export default function Products() {
    const { products, categories } = useCommerceCMS();
    const [filteredArticles, setFilteredArticles] = useState<any>([]);
    const [filters, setFilters] = useState([]);
    const [sortType, setSortType] = useState(null);
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
    }, [sortType]);

    const articlesUI = filteredArticles?.map((article: any) => (
        <div className={style.card} key={article.id}>
            <div className={style.img_container}>
                <div className={style.blue_heart}>
                    <MdFavoriteBorder />
                </div>
                <img src={article.image.url} alt="products" />
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
                    <img src={heroproducts} alt="products_hero" />
                    <h1 className={style.products_title}>
                        20% discount on gift cards
                    </h1>
                </header>
                <ul className={style.sort_filter}>
                    <li className={style.ul_title}>
                        women's clothing / brands / flex moda
                    </li>
                    <li className={style.sort}>
                        Sort by
                        <span>
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
                    <li className={style.filter}>
                        <span>
                            <MdOutlineFilterAlt />
                        </span>
                        All filters
                    </li>
                </ul>

                <div className={style.containerProductSection}>
                    <FilterComponent
                        onChange={handleChecked}
                        categories={categories}
                    />
                    <div className={style.products_wrapper}>{articlesUI}</div>
                </div>
            </div>
        </Main>
    );
}