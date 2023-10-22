import Link from "next/link";
import Image from "next/image";
import style from "./newarrivals.module.css";
import { absoluteURLsForSanity } from "../../utils/SanityFunctions";

type ArrivalProps = {
  title: string,
  products: ProductProps,
  locale: string,
}

export type ProductProps = {
  _id: string,
  title: { en: string, pt: string },
  category: {} | null,
  vendor: { title: string, _id: string },
  slug: string | null,
  body: { en: any, pt: any } | null,
  images: {
    _type: string,
    _key: string,
    asset: { _ref: string, _type: string }
  }[],
}[]

const NewArrivals = ({ title, products, locale }: ArrivalProps) => {
  const reversedArray: any[] = [];
  products?.map((product) => reversedArray.unshift(product));
  const newArrivals = reversedArray?.slice(0, 4);

  return (
    <section className={style.newArrivals}>
      <h1>{title[locale]}</h1>
      <div className={style.articles}>
        {newArrivals?.map((article) => (
          <div key={article._id} className={style.article}>
            <div className={style.imageWrapper}>
              {article.images ? (
                <Link href={`/products/${article._id}`} passHref>
                  <Image
                    src={absoluteURLsForSanity(
                      article.images[0].asset._ref
                    ).url()}
                    width={350}
                    height={455}
                    alt={article.title[locale]}
                  />
                </Link>
              ) : null}
            </div>
            {article.vendor ? (
              <h2 className={style.brand}>{article.vendor?.title}</h2>
            ) : null}
            <h3>
              {article.title[locale] ? article.title[locale] : article.title.pt}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
