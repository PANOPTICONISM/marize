import React from "react";
import { SubmitButton } from "../../../components/Buttons/Buttons";
import { useForm } from "react-hook-form";
import { useShoppingBagCMS } from "../../../contexts/CartContext";
import style from "./shoppingbag.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

export default function ShoppingBag({ next }: { next?: any }) {
    const { handleSubmit } = useForm();
    const { cart } = useShoppingBagCMS();

    console.log(cart);
    return (
        <>
            <h1>My Shopping Bag</h1>
            <section>
                {cart?.line_items.map((product: any) => (
                    <article className={style.shoppingArticle}>
                        <img src={product.image.url} alt={product.name} />
                        <div className={style.descDetails}>
                            <div>
                                <p>
                                    <span>Colour:</span> Green
                                </p>
                                <p>
                                    <span>Size:</span> M
                                </p>
                            </div>
                            <p>2 pieces</p>
                        </div>
                        <div>
                            <div className={style.moveFromCart}>
                                <span>
                                    <BsTrash /> Remove from shopping bag
                                </span>
                                <span>
                                    <AiOutlineHeart /> Save for later
                                </span>
                            </div>
                        </div>
                        <span className={style.bagPrice}>20EUR</span>
                    </article>
                ))}
            </section>
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
                    </div>
                    <form onSubmit={handleSubmit((data) => next({ ...data }))}>
                        <SubmitButton text="continue" />
                    </form>
                </div>
            </div>
        </>
    );
}
