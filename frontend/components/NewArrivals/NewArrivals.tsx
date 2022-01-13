import Link from "next/link";
import Image from "next/image";
import style from "./newarrivals.module.css";
import { absoluteURLsForSanity } from "../../utils/SanityFunctions";

const NewArrivals = ({ products }) => {
  const reversedArray: any[] = [];
  products?.map((product) => reversedArray.unshift(product));
  const newArrivals = reversedArray?.slice(0, 4);

  return (
    <section className={style.newArrivals}>
      <h1>New Arrivals</h1>
      <div className={style.articles}>
        {newArrivals?.map((article) => (
          <div key={article._id}>
            <Link href={`/products/${article._id}`}>
              <a>
                <Image
                  src={absoluteURLsForSanity(
                    article?.images[0].asset._ref
                  ).url()}
                  width={350}
                  height={455}
                  alt={article.name}
                />
              </a>
            </Link>
            <h2 className={style.brand}>{article.vendor?.title}</h2>
            <h3>{article.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
