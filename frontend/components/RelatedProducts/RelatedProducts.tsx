import Link from "next/link";
import Image from "next/image";
import style from "./relatedproducts.module.css";

const RelatedProducts = ({ relatedProducts }: { relatedProducts?: any }) => {
  const returnMax5Products = relatedProducts?.slice(0, 5);

  if (relatedProducts?.length > 0) {
    return (
      <section className={style.relatedProducts}>
        <h1>Related Products</h1>
        <div className={style.articles}>
          {returnMax5Products?.map((article: any) => (
            <div key={article.id}>
              <Link href={`/products/${article._id}`}>
                <a>
                  <Image
                    src={article.image.url}
                    width={200}
                    height={288}
                    alt={article.name}
                  />
                </a>
              </Link>
              <h2>{article.name}</h2>
              <span>{article.price.formatted_with_code}</span>
            </div>
          ))}
        </div>
      </section>
    );
  } else {
    return null;
  }
};

export default RelatedProducts;
