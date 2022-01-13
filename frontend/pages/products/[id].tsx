import Link from "next/link";
import Image from "next/image";
import { GiMailShirt } from "react-icons/gi";
import { RiRuler2Line } from "react-icons/ri";
import { MdAvTimer } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Main from "../../containers/Main/Main";
import style from "../../styles/product.module.css";
import { PrimaryIconButton } from "../../components/Buttons/Buttons";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import { AccordionDetails } from "../../components/Accordion/Accordion";
import { useContext, useRef, useState } from "react";
import { FavouritesContext } from "../../contexts/FavouritesContext";
import {
  addToFavourites,
  removeFromFavourites,
} from "../../utils/FavouritesFunctions";
import { sanity } from "../api/lib/sanity";
import { absoluteURLsForSanity } from "../../utils/SanityFunctions";
// import { useShoppingBagCMS } from "../../contexts/CartContext";

export function ProductDetails({
  showDetailsAccordion,
  product,
  isScroll,
}: {
  showDetailsAccordion?: any;
  product?: any;
  isScroll?: any;
}) {
  // const { setCart } = useShoppingBagCMS();

  const addToCart = (product) => {
    // console.log(product, "product");
    // setCart(product);
  };

  const { state, dispatch } = useContext(FavouritesContext);

  return (
    <section className={style.productDetails}>
      <Image
        src={absoluteURLsForSanity(product?.images[0].asset._ref).url()}
        width={350}
        height={455}
        alt={product?.name}
      />
      <div className={style.wrapper}>
        <div className={style.introduction}>
          <h2>{product?.title}</h2>
        </div>
        <div className={style.sizing}>
          {/* <form>
            <select name="subject" id="subject" defaultValue="" required>
              <option value="" disabled>
                Pick your size
              </option>
              {product?.variant_groups[0]?.options?.map(
                (size: any, index: any) => (
                  <option key={index} value={size.id}>
                    {size.name}
                  </option>
                )
              )}
            </select>
          </form> */}
          <Link href="/assets/sizing-chart.jpg">
            <a>
              <RiRuler2Line />
            </a>
          </Link>
        </div>
        <div className={style.shopping}>
          <PrimaryIconButton
            text="Add to shopping bag"
            onClick={() => addToCart(product, setCart)}
          />
          {state?.favourites.includes(product) ? (
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
        <div className={style.details}>
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
        </div>
      </div>
    </section>
  );
}

export default function Product({ products, id }) {
  const [showAccordion, setShownAccordion] = useState(false);

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
      />
      {showAccordion && <AccordionDetails fields={product} />}
      <RelatedProducts relatedProducts={product?.related_products} />
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
  console.log(id);
  const products = await sanity.fetch(
    `*[_type == "product"]{
      _id, 
      body, 
      category[]->{_id, title, parentVendor}, 
      images, 
      slug, 
      title, 
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
  const data = await sanity.fetch(
    `*[_type == "product"]{
      _id, 
      body, 
      category[]->{_id, title, parentVendor}, 
      images, 
      slug, 
      title, 
      vendor->{_id, title}}`
  );

  const paths = data.map((path) => ({
    params: {
      id: path._id,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}
