import { useParams } from "react-router";
import { useCommerceCMS } from "../../../contexts/CommerceContext";
import { GiMailShirt } from "react-icons/gi";
import { RiRuler2Line } from "react-icons/ri";
import { MdAvTimer } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import Main from "../../../containers/Main/Main";
import style from "./product.module.css";
import { CartButton } from "../../../components/Buttons/Buttons";
import RelatedProducts from "../../../components/RelatedProducts/RelatedProducts";
import Accordion from "../../../components/Accordion/Accordion";
import { useContentfulCMS } from "../../../contexts/ContentfulContext";
import { useShoppingBagCMS } from "../../../contexts/CartContext";
import { commerce } from "../../../lib/Commerce";

export function ProductDetails({ product }: { product?: any }) {
    const { setCart } = useShoppingBagCMS();

    const addToCart = () => {
        commerce.cart
            .add(product.id, 1)
            .then(({ cart }: { cart: any }) => setCart(cart));
    };

    return (
        <section className={style.productDetails}>
            <img src={product?.image.url} alt={product?.name} />
            <div className={style.wrapper}>
                <div className={style.introduction}>
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
                    <CartButton
                        text="Add to shopping bag"
                        onClick={addToCart}
                    />
                    <AiOutlineHeart className={style.shoppingSVG} />
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
    const { faq } = useContentfulCMS();

    const product = products?.find((prod) => prod.id === productId);

    return (
        <Main>
            <ProductDetails product={product} />
            <RelatedProducts relatedProducts={product?.related_products} />
            <div className={style.accordion}>
                <h1>FAQ</h1>
                {faq?.map(({ fields }, index) => (
                    <Accordion key={index} fields={fields} />
                ))}
            </div>
        </Main>
    );
}
