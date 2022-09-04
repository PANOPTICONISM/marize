import React, { useContext } from "react";
import Image from "next/image";
import style from "./favouritescart.module.css";
import { BsTrash } from "react-icons/bs";
import { PrimaryButton } from "../Buttons/Buttons";
import { GlobalContext } from "../../contexts/CartAndFavouritesContext";
import { removeFromFavourites } from "../../utils/FavouritesFunctions";
import { absoluteURLsForSanity } from "../../utils/SanityFunctions";
import Link from "next/link";
import { useRouter } from "next/router";
import { translations } from "../../translations/common";

export function FavouritesCartResumeContainer({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { locale } = useRouter();
  return (
    <div className={style.cartFavouritesWrapper}>
      <h3>{translations[locale].favorites_bag}</h3>
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
              <BsTrash /> {translations[locale].remove_favorites}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FavouritesCart() {
  const { state } = useContext(GlobalContext);
  const { locale } = useRouter();

  if (state?.favourites.length > 0) {
    return (
      <FavouritesCartResumeContainer>
        {state.favourites?.map((product: any) => (
          <>
            <div key={product?._id}>
              <ProductCard product={product} />
            </div>
          </>
        ))}
      </FavouritesCartResumeContainer>
    );
  }
  return (
    <FavouritesCartResumeContainer>
      <div className={style.emptyCart}>
        <h4>{translations[locale].empty_bag_favorites}</h4>
        <h5>{translations[locale].get_started}</h5>
        <PrimaryButton
          path="/products"
          text={translations[locale].explore_products}
        />
      </div>
    </FavouritesCartResumeContainer>
  );
}
