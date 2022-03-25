import Image from "next/image";
import React, { useContext } from "react";
import style from "./orderprocessed.module.css";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { GlobalContext } from "../../../contexts/CartAndFavouritesContext";
import { useRouter } from "next/router";
import { absoluteURLsForSanity } from "../../../utils/SanityFunctions";

export default function OrderProcessed({
  shippingData,
}: {
  shippingData?: any;
}) {
  const { state, stateCart } = useContext(GlobalContext);
  const orderID = state?.userId.slice(0, 8);
  const { locale } = useRouter();

  if (shippingData) {
    return (
      <main className={style.finalSummary}>
        <div className={style.shoppingBag}>
          <p>Hi, {shippingData?.firstname}.</p>
          <p>
            <IoMdCheckmarkCircle /> Your order number #{orderID} has been
            confirmed.
          </p>
          <p>
            Check out the details of your purchase below, and remember your
            order can’t be changed after it has been shipped, but you’re always
            welcome in our store.
          </p>
          <div className={style.orderSummary}>
            <h1>Order Summary</h1>
            {stateCart.cart?.map((product: any) => (
              <article key={product._id} className={style.shoppingArticle}>
                <Image
                  src={absoluteURLsForSanity(
                    product?.images[0].asset._ref
                  ).url()}
                  width={230}
                  height={300}
                  alt={product.title}
                />
                <div className={style.fullSpace}>
                  <div className={style.descDetails}>
                    <div>
                      <p>
                        {product.title[locale]
                          ? product.title[locale]
                          : product.title.pt}
                      </p>
                      {product.size !== null ? (
                        <p>
                          <span>Size:</span> {product.size}
                        </p>
                      ) : null}
                    </div>
                    <p>{product.quantity} pieces</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className={style.finalMessage}>
          <p>
            We'll send you an email with a payment link to finalised your
            purchase, and another with shipping confirmation when your item(s)
            are on the way! We hope you enjoy your new items.
          </p>
          <p>Thank you!</p>
          <p>Have an amazing day,</p>
          <p>Marizé</p>
        </div>
      </main>
    );
  }

  return null;
}
