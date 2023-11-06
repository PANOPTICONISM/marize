import React, { useContext } from "react";
import Image from "next/image";
import style from "./favouritescart.module.css";
import { BsTrash } from "react-icons/bs";
import { PrimaryButtonAsLink } from "../Buttons/Buttons";
import { GlobalContext } from "../../contexts/CartAndFavouritesContext";
import { removeFromFavourites } from "../../utils/FavouritesFunctions";
import { absoluteURLsForSanity } from "../../utils/SanityFunctions";
import Link from "next/link";
import { useRouter } from "next/router";
import { translations } from "../../translations/common";

const FavouritesCartResumeContainer = React.forwardRef<
  HTMLDivElement,
  { children?: React.ReactNode }
>(({ children }, ref) => {
  const { locale } = useRouter();
  return (
    <div className={style.cartFavouritesWrapper} ref={ref}>
      <h3>{translations[locale].favorites_bag}</h3>
      {children}
    </div>
  );
});

FavouritesCartResumeContainer.displayName = "FavouritesCartResumeContainer";

export function ProductCard({ product }: { product: any }) {
  const { dispatch } = useContext(GlobalContext);

  const { locale } = useRouter();
  return (
    <div className={style.fullCart}>
      <Link href={`/products/${product._id}`} passHref>
        <Image
          src={absoluteURLsForSanity(product?.images[0].asset._ref).url()}
          width={100}
          height={130}
          alt={product.title}
        />
      </Link>
      <div className={style.presentation}>
        <div>
          <h4>
            {product.title[locale] ? product.title[locale] : product.title.pt}
          </h4>
          {product.vendor ? <h5>{product.vendor?.title}</h5> : null}
        </div>
        <div className={style.bottomProduct}>
          <button onClick={() => removeFromFavourites(dispatch, product)}>
            <BsTrash /> {translations[locale].remove_favorites}
          </button>
        </div>
      </div>
    </div>
  );
}

const FavouritesCart = React.forwardRef<HTMLDivElement>((_, ref) => {
  const { state } = useContext(GlobalContext);
  const { locale } = useRouter();

  if (state?.favourites.length > 0) {
    return (
      <FavouritesCartResumeContainer ref={ref}>
        {state.favourites?.map((product: any) => (
          <ProductCard key={product?._id} product={product} />
        ))}
      </FavouritesCartResumeContainer>
    );
  }
  return (
    <FavouritesCartResumeContainer ref={ref}>
      <div className={style.emptyCart}>
        <h4>{translations[locale].empty_bag_favorites}</h4>
        <h5>{translations[locale].get_started}</h5>
        <PrimaryButtonAsLink
          path="/products"
          text={translations[locale].explore_products}
          fullWidth
        />
      </div>
    </FavouritesCartResumeContainer>
  );
});

FavouritesCart.displayName = "FavouritesCart";

export default FavouritesCart;
