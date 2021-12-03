import {
    MdFavoriteBorder,
    MdKeyboardArrowDown,
    MdOutlineFilterAlt,
} from "react-icons/md";
import style from "./products.module.css";
import { useCommerceCMS } from "../../contexts/CommerceContext";
import Main from "../../containers/Main/Main";
import heroproducts from "../../assets/heroproducts.png";
import FilterComponent from "../../components/SidebarFilters/SidebarFilters";
import { useState, useEffect } from "react";

export default function Products() {
    const { products, categories } = useCommerceCMS();

    const [filteredArticles, setFilteredArticles] = useState<any>(products);
    //what we check
    const [filters, setFilters] = useState([]);

    //console.log(products, categories, "pro");
    const handleChecked = (e: { target: { value: any; checked: any } }) => {
        const value = e.target.value;
        setFilters((previous: any) =>
            !e.target.checked
                ? previous.filter((prev: any) => prev !== value)
                : [...previous, value]
        );
    };
    useEffect(() => {
        if (!filters.length) {
            console.log("hi");
        } else {
            console.log("buy");
            setFilteredArticles(
                products?.filter(
                    (product) => console.log(product)
                    // {
                    //     return filteredArticles?.some(
                    //         (c: string) => console.log(c)
                    //[categories["categories"][0]["slug"]].flat().includes(c)
                    //);
                    // }
                )
            );
        }
    }, [filteredArticles]);

    console.log(filters);
    useEffect(() => {
        setFilteredArticles(products);
        //setFilters(categories);
    }, [products]);

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
            <div className="products_container">
                <header className={style.products_hero}>
                    <img src={heroproducts} alt="products_hero" />
                </header>
                <h1 className={style.products_title}>clothes for women</h1>
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
                            <p>Recommended</p>
                            <p>Newest</p>
                            <p>Highest price</p>
                            <p>Lowest price</p>
                        </div>
                    </li>
                    <li className={style.filter}>
                        <span>
                            <MdOutlineFilterAlt />
                        </span>
                        All filters
                    </li>
                </ul>

                <div className={style.mid_section_wrapper}>
                    <FilterComponent
                        className={style.filter}
                        filters={filters}
                        onChange={handleChecked}
                        categories={categories}
                    />
                    <div className={style.products_card}>{articlesUI}</div>
                </div>
            </div>
        </Main>
    );
}
function previous(previous: any, any: any) {
    throw new Error("Function not implemented.");
}

function setFilteredArticles(products: any) {
    throw new Error("Function not implemented.");
}

function setFilters(categories: any) {
    throw new Error("Function not implemented.");
}

function categories(categories: any) {
    throw new Error("Function not implemented.");
}
