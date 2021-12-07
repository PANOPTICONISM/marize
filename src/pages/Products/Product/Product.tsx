import React from "react";
import { useParams } from "react-router";
import { useCommerceCMS } from "../../../contexts/CommerceContext";
import { GiMailShirt } from "react-icons/gi";
import { RiRuler2Line } from "react-icons/ri";
import { MdAvTimer } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import PrimaryButton from "../../../components/Button/Button";
import Main from "../../../containers/Main/Main";

export function ProductDetail({ product }: { product?: any }) {
    console.log(product);
    return (
        <>
            <img src={product?.image.url} alt="" />
            <div>
                <div>
                    <h2>{product?.name}</h2>
                    <h3>{product?.price.formatted_with_code}</h3>
                </div>
                <div>
                    <form>
                        <select name="cars" id="cars">
                            <option value="volvo">Pick your size</option>
                            <option value="M">M</option>
                        </select>
                    </form>
                    <a href="/pdf link">
                        <RiRuler2Line />
                    </a>
                </div>
                <div>
                    <PrimaryButton path="/">Add to shopping bag</PrimaryButton>
                    <AiOutlineHeart />
                </div>
                <div>
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
        </>
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
