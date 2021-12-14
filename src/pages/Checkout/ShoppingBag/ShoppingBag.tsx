import { ContinueButton } from "../../../components/Buttons/Buttons";
import { useShoppingBagCMS } from "../../../contexts/CartContext";
import style from "./shoppingbag.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { commerce } from "../../../lib/Commerce";

export default function ShoppingBag({ next }: { next?: any }) {
    const { cart, setCart } = useShoppingBagCMS();
    const maxItems = {
        quantity: [1, 2, 3, 4, 5, 6],
    };

    const updateCart = (product: { id: any }, quantityValue: any) => {
        commerce.cart
            .update(product.id, { quantity: quantityValue })
            .then(({ cart }: { cart: any }) => setCart(cart));
    };

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
                                            updateCart(product, e.target.value);
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
                                        <span>
                                            <BsTrash /> Remove from shopping bag
                                        </span>
                                        <span>
                                            <AiOutlineHeart /> Save for later
                                        </span>
                                    </div>
                                    <span className={style.bagPrice}>
                                        20EUR
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
                <div className={style.priceSummary}>
                    <div>
                        <h2>Price Summary</h2>
                        <div>
                            <p>
                                Subtotal <span>99kr</span>
                            </p>
                            <p>
                                Shipping <span>39kr</span>
                            </p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>
                                Total <span>120kr</span>
                            </p>
                            <p className={style.importDuties}>
                                (import duties included)
                            </p>
                        </div>
                        <ContinueButton onClick={next} text="continue" />
                    </div>
                </div>
            </div>
        </section>
    );
}
