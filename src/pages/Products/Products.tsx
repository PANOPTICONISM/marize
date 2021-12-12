import { MdFavoriteBorder, MdKeyboardArrowDown } from "react-icons/md";
import style from "./products.module.css";
import { useCommerceCMS } from "../../contexts/CommerceContext";
import Main from "../../containers/Main/Main";
import heroproducts from "../../assets/heroproducts.png";
import FilterComponent from "../../components/Filters/Filters";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortType]);

    const articlesUI = filteredArticles?.map((article: any) => (
        <div className={style.card} key={article.id}>
            <div className={style.img_container}>
                <div className={style.blue_heart}>
                    <MdFavoriteBorder />
                </div>
                <Link to={`/products/${article.id}`}>
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
                    <img src={heroproducts} alt="products_hero" />
                    <h1 className={style.products_title}>
                        20% discount on all Christmas gifts
                    </h1>
                </header>
                <h1>WOMEN'S CLOTHES</h1>
                <ul className={style.sort_filter}>
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
