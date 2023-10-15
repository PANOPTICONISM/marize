import Image from "next/image";
import {
  PrimaryButton,
  PrimaryButtonAsLink,
} from "../../../components/Buttons/Buttons";
import style from "./shoppingbag.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useContext } from "react";
import { GlobalContext } from "../../../contexts/CartAndFavouritesContext";
import { absoluteURLsForSanity } from "../../../utils/SanityFunctions";
import {
  removeFromCart,
  removeFromCartAndFavourite,
  updateCartQuantity,
} from "../../../utils/CartFunctions";
import { useRouter } from "next/router";
import { translations } from "../../../translations/common";

export default function ShoppingBag({ next }: { next?: any }) {
  const { state, dispatch, stateCart, dispatchCart } =
    useContext(GlobalContext);

  const { locale } = useRouter();
  const maxItems = {
    quantity: [1, 2, 3, 4],
  };

  const cartTotal =
    stateCart?.cart?.length > 0
      ? stateCart.cart.reduce(
          (accum, item) => Number(accum) + Number(item.quantity),
          0
        )
      : "";

  return (
    <section>
      {stateCart?.cart.length > 0 ? (
        <div className={style.shoppingBagWrapper}>
          <div className={style.shoppingBag}>
            <h1>
              My Shopping Bag
              <span> ({cartTotal} articles)</span>
            </h1>
            {stateCart.cart.map((product: any) => (
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
                    <select
                      onChange={(e: any) => {
                        updateCartQuantity(
                          dispatchCart,
                          product,
                          e.target.value
                        );
                      }}
                      defaultValue={product.quantity}
                      name="quantity"
                      id="quantity"
                    >
                      {maxItems.quantity.map((quant, index) => (
                        <option key={index} value={quant}>
                          {quant} {translations[locale].pieces}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={style.flex}>
                    <div className={style.moveFromCart}>
                      <span
                        onClick={() =>
                          removeFromCart(dispatchCart, product._id)
                        }
                      >
                        <BsTrash /> Remove from shopping bag
                      </span>
                      {!state.favourites.includes(product) && (
                        <button
                          className={style.favouritesBag}
                          onClick={() =>
                            removeFromCartAndFavourite(
                              dispatchCart,
                              product,
                              dispatch
                            )
                          }
                        >
                          <AiOutlineHeart className={style.shoppingSVG} />
                          Save to favourites
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className={style.priceSummary}>
            <div>
              <h2>Does your shopping bag check out?</h2>
              <p>
                You can pick your preferred shipping option in the next step.
              </p>
              <PrimaryButton onClick={next} text="continue" />
            </div>
          </div>
        </div>
      ) : (
        <div className={style.main}>
          <h1>Your Shopping Bag is currently empty</h1>
          <PrimaryButtonAsLink
            className={style.getStarted}
            text="Let's get shopping"
            path="/products"
          />
        </div>
      )}
    </section>
  );
}
