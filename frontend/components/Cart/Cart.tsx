import { BsHandbag } from "react-icons/bs";
import Image from "next/image";
import { useContext } from "react";
import style from "./cart.module.css";
import { BsTrash } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { PrimaryButtonAsLink } from "../Buttons/Buttons";
import { GlobalContext } from "../../contexts/CartAndFavouritesContext";
import { absoluteURLsForSanity } from "../../utils/SanityFunctions";
import {
  removeFromCart,
  removeFromCartAndFavourite,
  updateCartQuantity,
} from "../../utils/CartFunctions";
import { useRouter } from "next/router";
import { translations } from "../../translations/common";
import React from "react";

const CartResumeContainer = React.forwardRef<
  HTMLDivElement,
  { children?: React.ReactNode }
>(({ children }, ref) => {
  const { locale } = useRouter();
  return (
    <div className={style.cartWrapper} ref={ref}>
      <h3>{translations[locale].cart}</h3>
      {children}
    </div>
  );
});

CartResumeContainer.displayName = "CartResumeContainer";

export function ProductCard({ product }: { product: any }) {
  const { state, dispatch, dispatchCart } = useContext(GlobalContext);
  const maxItems = {
    quantity: [1, 2, 3, 4, 5],
  };
  const { locale } = useRouter();

  return (
    <div className={style.fullCart}>
      <Image
        src={absoluteURLsForSanity(product?.images[0].asset._ref).url()}
        width={100}
        height={130}
        alt={product.title}
      />
      <div className={style.spaceBetween}>
        <div className={style.presentation}>
          <h4>
            {product.title[locale] ? product.title[locale] : product.title.pt}
          </h4>
        </div>
        <div className={style.bottomProduct}>
          <div>
            <button onClick={() => removeFromCart(dispatchCart, product._id)}>
              <BsTrash />
            </button>
            <span>||</span>
            {!state.favourites.includes(product) && (
              <button
                className={style.favouritesBag}
                onClick={() =>
                  removeFromCartAndFavourite(dispatchCart, product, dispatch)
                }
              >
                <AiOutlineHeart className={style.shoppingSVG} />
              </button>
            )}
          </div>
          <select
            onChange={(e: any) => {
              updateCartQuantity(dispatchCart, product, e.target.value);
            }}
            value={product?.quantity}
            name="quantity"
            id="quantity"
          >
            {maxItems.quantity.map((quant, index) => (
              <option key={index} value={quant}>
                {quant}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

const Cart = React.forwardRef<HTMLDivElement>((_, ref) => {
  const { stateCart } = useContext(GlobalContext);
  const { locale } = useRouter();

  if (stateCart.cart.length > 0) {
    return (
      <CartResumeContainer ref={ref}>
        {stateCart.cart?.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
        <PrimaryButtonAsLink
          path={`/checkout/${stateCart.userId}`}
          text={translations[locale].cart_go}
          icon={<BsHandbag />}
          fullWidth
        />
      </CartResumeContainer>
    );
  }
  return (
    <CartResumeContainer ref={ref}>
      <div className={style.emptyCart}>
        <h4>{translations[locale].empty_bag_cart}</h4>
        <h5>{translations[locale].get_started}</h5>
        <PrimaryButtonAsLink
          path="/products"
          text={translations[locale].cart_cta}
          fullWidth
        />
      </div>
    </CartResumeContainer>
  );
});

Cart.displayName = "Cart";

export default Cart;
