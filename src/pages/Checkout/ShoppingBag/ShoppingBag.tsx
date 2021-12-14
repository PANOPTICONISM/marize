import { ContinueButton } from "../../../components/Buttons/Buttons";
import { useShoppingBagCMS } from "../../../contexts/CartContext";
import style from "./shoppingbag.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { updateCart } from "../../../utils/CartFunctions";
import { removeFromCart } from "../../../utils/CartFunctions";

export default function ShoppingBag({ next }: { next?: any }) {
    const { cart, setCart } = useShoppingBagCMS();
    const maxItems = {
        quantity: [1, 2, 3, 4, 5, 6],
    };

    console.log(cart);
    return (
        <section>
            <div className={style.shoppingBagWrapper}>
                <div className={style.shoppingBag}>
                    <h1>
                        My Shopping Bag
                        <span> ({cart?.total_items} articles)</span>
                    </h1>
                    {cart?.line_items.map((product: any) => (
                        <article
                            key={product.id}
                            className={style.shoppingArticle}
                        >
                            <img src={product.image.url} alt={product.name} />
                            <div className={style.fullSpace}>
                                <div className={style.descDetails}>
                                    <div>
                                        <p>{product.name}</p>
                                        <p>
                                            <span>Size:</span> M
                                        </p>
                                    </div>
                                    <select
                                        onChange={(e: any) => {
                                            updateCart(
                                                product,
                                                e.target.value,
                                                setCart
                                            );
                                        }}
                                        defaultValue={product.quantity}
                                        name="quantity"
                                        id="quantity"
                                    >
                                        {maxItems.quantity.map(
                                            (quant, index) => (
                                                <option
                                                    key={index}
                                                    value={quant}
                                                >
                                                    {quant} pieces
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                                <div className={style.flex}>
                                    <div className={style.moveFromCart}>
                                        <span
                                            onClick={() =>
                                                removeFromCart(product, setCart)
                                            }
                                        >
                                            <BsTrash /> Remove from shopping bag
                                        </span>
                                        <span>
                                            <AiOutlineHeart /> Save for later
                                        </span>
                                    </div>
                                    <span className={style.bagPrice}>
                                        {product.line_total.formatted_with_code}
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
                <div className={style.priceSummary}>
                    <div>
                        <h2>Does your shopping bag check out?</h2>
                        <p>
                            You can pick your preferred shopping option in the
                            next step.
                        </p>
                        <ContinueButton onClick={next} text="continue" />
                    </div>
                </div>
            </div>
        </section>
    );
}
