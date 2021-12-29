import React from "react";
import { useShoppingBagCMS } from "../../../contexts/CartContext";
import style from "./orderprocessed.module.css";
import { IoMdCheckmarkCircle } from "react-icons/io";

export default function OrderProcessed({
    shippingData,
}: {
    shippingData?: any;
}) {
    const { cart } = useShoppingBagCMS();
    const orderId = cart?.id.slice(5);
    const totalPrice = shippingData.shippingPrice + cart.subtotal.raw;
    return (
        <main className={style.finalSummary}>
            <div className={style.shoppingBag}>
                <p>Hi, {shippingData.firstname},</p>
                <p>
                    <IoMdCheckmarkCircle /> Your order number #{orderId} has
                    been confirmed.
                </p>
                <p>
                    Check out the details of your purchase below, and remember
                    your order can’t be changed after it has been shipped, but
                    you’re always welcome in our store.
                </p>
                <h1>Order Summary</h1>
                {cart?.line_items.map((product: any) => (
                    <article key={product.id} className={style.shoppingArticle}>
                        <img src={product.image.url} alt={product.name} />
                        <div className={style.fullSpace}>
                            <div className={style.descDetails}>
                                <div>
                                    <p>{product.name}</p>
                                    <p>
                                        <span>Size:</span> M
                                    </p>
                                </div>
                                <p>{product.quantity} pieces</p>
                            </div>
                            <div className={style.bagPrice}>
                                <span>20EUR</span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
            <div className={style.priceWrapper}>
                <div className={style.priceFinalSummary}>
                    <h1>Price Summary</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td>Subtotal</td>
                                <td>{cart.subtotal.formatted_with_code}</td>
                            </tr>
                            <tr>
                                <td>Shipping</td>
                                <td>{`${shippingData.shippingPrice} EUR`}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                            <tr>
                                <td>Total</td>
                                <td>{`${totalPrice} EUR`}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className={style.importDuties}>
                        (import duties included)
                    </p>
                </div>
            </div>
            <div className={style.finalMessage}>
                <p>
                    We'll send you an email with a payment link to finalised
                    your purchase, and another with shipping confirmation when
                    your item(s) are on the way! We hope you enjoy your new
                    items.
                </p>
                <p>Thank you!</p>
                <p>Have an amazing day,</p>
                <p>Marizé</p>
            </div>
        </main>
    );
}
