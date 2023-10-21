import style from "./searchdropdown.module.css";
import Link from "next/link";
import Image from "next/image";
import { ProductProps } from "../NewArrivals/NewArrivals";
import { absoluteURLsForSanity } from "../../utils/SanityFunctions";
import { useRouter } from "next/router";

export default function SearchDropdown({
  searchedArticles,
}: {
  searchedArticles?: ProductProps;
}) {
  const { locale } = useRouter();

  if (searchedArticles?.length > 0) {
    return (
      <div className={style.dropdown}>
        {searchedArticles?.slice(0, 10).map((article) => (
          <Link href={`/products/${article._id}`} key={article._id} passHref>
            <div className={style.item}>
              <Image
                src={absoluteURLsForSanity(article?.images[0].asset._ref).url()}
                width={40}
                height={60}
                alt={article.title[locale]}
              />
              <span className={style.title}>{article.title[locale]}</span>
            </div>
          </Link>
        ))}
      </div>
    );
  } else {
    return null;
  }
}
