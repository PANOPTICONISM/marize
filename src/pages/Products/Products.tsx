import {
    MdFavoriteBorder,
    MdKeyboardArrowDown,
    MdOutlineFilterAlt,
} from "react-icons/md";
import style from "./products.module.css";
import { useCommerceCMS } from "../../contexts/CommerceContext";
import Main from "../../containers/Main/Main";
export default function Products() {
    const { products } = useCommerceCMS();
    // console.log(products);

    return (
        <Main>
            <div className="products_container">
                <header className={style.products_hero}>
                    <img src="" alt="products_hero" />
                </header>
                <h1 className={style.products_title}>clothes for women</h1>
                <div className={style.sort_filter}>
                    <p>
                        women's clothing / brands / flex moda
                        <p className={style.sort}>
                            Sort by
                            <MdKeyboardArrowDown />
                        </p>
                        <p className={style.filter}>
                            <MdOutlineFilterAlt /> All filters
                        </p>
                    </p>
                </div>

                <div className={style.products_card}>
                    {products?.map((product) => (
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
                                    {product["price"]["formatted_with_code"]}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Main>
    );
}
