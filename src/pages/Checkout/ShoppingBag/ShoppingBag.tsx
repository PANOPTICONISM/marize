import React from "react";
import { ContinueButton } from "../../../components/Buttons/Buttons";
import { useShoppingBagCMS } from "../../../contexts/CartContext";
import style from "./shoppingbag.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

export default function ShoppingBag({ next }: { next?: any }) {
    const { cart } = useShoppingBagCMS();

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
                                            <span>Colour:</span> Green
                                        </p>
                                        <p>
                                            <span>Size:</span> M
                                        </p>
                                    </div>
                                    <p>2 pieces</p>
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
