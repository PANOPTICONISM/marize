import {
    MdFavoriteBorder,
    MdKeyboardArrowDown,
    MdOutlineFilterAlt,
} from "react-icons/md";
import style from "./products.module.css";
import { useCommerceCMS } from "../../contexts/CommerceContext";
import Main from "../../containers/Main/Main";
import SidebarFilters from "../../components/SidebarFilters/SidebarFilters";
import heroproducts from "../../assets/heroproducts.png";
import { ReactChild, ReactFragment, ReactPortal, useState } from "react";
export default function Products() {
    const { products } = useCommerceCMS();
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
                    </li>
                    <li className={style.filter}>
                        <span>
                            <MdOutlineFilterAlt />
                        </span>
                        All filters
                    </li>
                </ul>

                <div className={style.mid_section_wrapper}>
                    <SidebarFilters />
                    <div className={style.products_card}>
                        {products?.map((product) => {
                            return (
                                <div className={style.card} key={product["id"]}>
                                    <div className={style.img_container}>
                                        <div className={style.blue_heart}>
                                            <MdFavoriteBorder />
                                        </div>
                                        <img
                                            src={product["image"]["url"]}
                                            alt="products"
                                        />
                                    </div>
                                    <div className={style.card_txt}>
                                        <p className={style.brand}>
                                            {product["categories"][1]["name"]}
                                        </p>
                                        <p>{product["name"]}</p>
                                        <p className={style.price}>
                                            {
                                                product["price"][
                                                    "formatted_with_code"
                                                ]
                                            }
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Main>
    );
}
function allCategories(allCategories: any) {
    throw new Error("Function not implemented.");
}
