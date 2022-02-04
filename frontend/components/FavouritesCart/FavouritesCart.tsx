import React, { useContext } from "react";
import Image from "next/image";
import style from "./favouritescart.module.css";
import { BsTrash } from "react-icons/bs";
import { PrimaryButton, PrimaryIconButton } from "../Buttons/Buttons";
import { GlobalContext } from "../../contexts/CartAndFavouritesContext";
import { removeFromFavourites } from "../../utils/FavouritesFunctions";
import { absoluteURLsForSanity } from "../../utils/SanityFunctions";
import Link from "next/link";
import { addToCart } from "../../utils/CartFunctions";
import { useRouter } from "next/router";

export function FavouritesCartResumeContainer({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className={style.cartFavouritesWrapper}>
      <h3>Favourites Bag</h3>
      {children}
    </div>
  );
}

export function ProductCard({ product }: { product: any }) {
  const { dispatch } = useContext(GlobalContext);

  const { locale } = useRouter();
  return (
    <div className={style.fullCart}>
      <Link href={`/products/${product._id}`}>
        <a>
          <Image
            src={absoluteURLsForSanity(product?.images[0].asset._ref).url()}
            width={100}
            height={130}
            alt={product.title}
          />
        </a>
      </Link>
      <div className={style.spaceBetween}>
        <div>
          <div className={style.presentation}>
            <h4>{product.vendor?.title}</h4>
            <h5>
              {product.title[locale] ? product.title[locale] : product.title.pt}
            </h5>
          </div>
        </div>
        <div className={style.bottomProduct}>
          <div>
            <button onClick={() => removeFromFavourites(dispatch, product._id)}>
              <BsTrash /> Remove from favourites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FavouritesCart() {
  const { state, dispatch, dispatchCart } = useContext(GlobalContext);

  const addToCartAndRemove = (product: any) => {
    removeFromFavourites(dispatch, product._id);
    addToCart(dispatchCart, product);
  };

  if (state?.favourites.length > 0) {
    return (
      <FavouritesCartResumeContainer>
        {state.favourites?.map((product: any) => (
          <>
            <div key={product?._id}>
              <ProductCard product={product} />
            </div>
            <PrimaryIconButton
              className={style.shopBagBtn}
              text="Add to cart"
              onClick={() => addToCartAndRemove(product)}
            />
          </>
        ))}
      </FavouritesCartResumeContainer>
    );
  }
  return (
    <FavouritesCartResumeContainer>
      <div className={style.emptyCart}>
        <h4>Your favourites bag is currently empty.</h4>
        <h5>No idea, how to get started?</h5>
        <PrimaryButton path="/products" text="Explore all our products" />
      </div>
    </FavouritesCartResumeContainer>
  );
}
