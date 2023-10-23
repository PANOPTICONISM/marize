import Link from "next/link";
import Image from "next/image";
import { GiMailShirt } from "react-icons/gi";
import { RiRuler2Line } from "react-icons/ri";
import { MdAvTimer } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Main from "../../containers/Main/Main";
import style from "../../styles/product.module.css";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import { AccordionDetails } from "../../components/Accordion/Accordion";
import React, { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../contexts/CartAndFavouritesContext";
import {
  addToFavourites,
  removeFromFavourites,
} from "../../utils/FavouritesFunctions";
import { sanity } from "../api/lib/sanity";
import { absoluteURLsForSanity } from "../../utils/SanityFunctions";
import { addToCart } from "../../utils/CartFunctions";
import { useRouter } from "next/router";
import { translations } from "../../translations/common";
import { PrimaryButton } from "../../components/Buttons/Buttons";
import { SingleProduct } from "./product";

export function ProductDetails({
  showDetailsAccordion,
  product,
  isScroll,
  locale,
}: {
  showDetailsAccordion: () => void;
  product: SingleProduct;
  isScroll?: () => void;
  locale: string;
}) {
  const { state, dispatch, stateCart, dispatchCart } =
    useContext(GlobalContext);
  const [show, setShow] = useState(null);
  const [storeSize, setStoreSize] = useState(null);

  useEffect(() => {
    setShow(
      state?.favourites.some((favourite) => favourite._id === product._id)
    );
  }, [product._id, state?.favourites]);

  const storeSizeValue = (e) => {
    setStoreSize(e.target.value);
  };

  return (
    <section className={style.productDetails}>
      <Image
        src={absoluteURLsForSanity(product.images[0].asset._ref).url()}
        width={350}
        height={455}
        objectFit="contain"
        alt="product"
      />
      <div className={style.wrapper}>
        <div className={style.introduction}>
          <h2>
            {product.title[locale] ? product.title[locale] : product.title.pt}
          </h2>
        </div>
        <div className={style.sizing}>
          <form>
            <select
              name="subject"
              id="subject"
              defaultValue="def"
              required
              onChange={storeSizeValue}
            >
              <>
                <option value="def" disabled>
                  {translations[locale].pickSize}
                </option>
                {product.variants?.[0]?.sizes?.map((size) => {
                  if (size.title === "Tamanho único") {
                    return (
                      <option key={size._id} value={size.title}>
                        {translations[locale].uniqueSize}
                      </option>
                    );
                  }
                  return (
                    <option key={size._id} value={size.title}>
                      {size.title}
                    </option>
                  );
                })}
              </>
            </select>
          </form>
          <Link href="/assets/sizing-chart.jpg" passHref>
            <RiRuler2Line />
          </Link>
        </div>
        <div className={style.shopping}>
          <PrimaryButton
            text={translations[locale].addToBag}
            onClick={() => addToCart(dispatchCart, product, storeSize)}
            disabled={storeSize === null}
          />
          {show ? (
            <AiFillHeart
              onClick={() => removeFromFavourites(dispatch, product._id)}
              className={style.shoppingSVG}
            />
          ) : (
            <AiOutlineHeart
              onClick={() => addToFavourites(dispatch, product)}
              className={style.shoppingSVG}
            />
          )}
        </div>
        {/* <div className={style.details}>
          {product?.description && (
            <span onClick={showDetailsAccordion}>
              <GiMailShirt />
              Product details
            </span>
          )}
          <span onClick={isScroll}>
            <MdAvTimer />
            Delivery and Returns
          </span>
        </div> */}
      </div>
    </section>
  );
}

export default function Product({ products, id }) {
  const [showAccordion, setShownAccordion] = useState(false);
  const { locale } = useRouter();

  const showDetailsAccordion = () => {
    setShownAccordion(!showAccordion);
  };

  const product = products?.find((prod) => prod._id === id);
  const scrollToComponent = (ref: any) =>
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
  const ref = useRef(null);
  const isScroll = () => scrollToComponent(ref);

  return (
    <Main>
      <ProductDetails
        showDetailsAccordion={showDetailsAccordion}
        isScroll={isScroll}
        product={product}
        locale={locale}
      />
      {/* {showAccordion && <AccordionDetails fields={product} />}
      <RelatedProducts relatedProducts={product?.related_products} /> */}
      {/* <div className={style.accordion} ref={ref}>
        <h1>FAQ</h1>
        {faq?.map(({ fields }, index) => (
                    <Accordion key={index} fields={fields} />
                ))}
      </div> */}
    </Main>
  );
}

export async function getStaticProps({ params: { id } }) {
  const products = await sanity.fetch(
    `*[_type == "product"]{
      _id, 
      body, 
      category->{_id, title}, 
      images, 
      slug, 
      title, 
      discounted,
      variants[]{colours->{_id, title}, sizes[]->},
      vendor->{_id, title}}`
  );

  return {
    props: {
      products,
      id,
    },
  };
}

export async function getStaticPaths() {
  const data = await sanity.fetch(`*[_type == "product"]{
    _id}`);

  const paths = data.map((path) => {
    return {
      params: {
        id: path._id,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}
