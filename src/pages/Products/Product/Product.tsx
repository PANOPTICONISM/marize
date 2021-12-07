import React from "react";
import { useParams } from "react-router";
import { useCommerceCMS } from "../../../contexts/CommerceContext";
import { GiMailShirt } from "react-icons/gi";
import { RiRuler2Line } from "react-icons/ri";
import { MdAvTimer } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import PrimaryButton from "../../../components/Button/Button";
import Main from "../../../containers/Main/Main";
import style from "./product.module.css";

export function ProductDetail({ product }: { product?: any }) {
    return (
        <section className={style.productDetails}>
            <img src={product?.image.url} alt={product?.name} />
            <div>
                <div>
                    <h2>{product?.name}</h2>
                    <h3>{product?.price.formatted_with_code}</h3>
                </div>
                <div className={style.sizing}>
                    <form>
                        <select
                            name="subject"
                            id="subject"
                            defaultValue=""
                            required
                        >
                            <option value="" disabled>
                                Pick your size
                            </option>
                            <option value="M">M</option>
                        </select>
                    </form>
                    <a href="/pdf link">
                        <RiRuler2Line />
                    </a>
                </div>
                <div className={style.shopping}>
                    <PrimaryButton className={style.button} path="/">
                        Add to shopping bag
                    </PrimaryButton>
                    <AiOutlineHeart />
                </div>
                <div className={style.details}>
                    <span>
                        <GiMailShirt />
                        Product details
                    </span>
                    <span>
                        <MdAvTimer />
                        Delivery and Returns
                    </span>
                </div>
            </div>
        </section>
    );
}

export default function Product() {
    const { productId } = useParams();
    const { products } = useCommerceCMS();

    const product = products?.find((prod) => prod.id === productId);

    return (
        <Main>
            <ProductDetail product={product} />
        </Main>
    );
}
