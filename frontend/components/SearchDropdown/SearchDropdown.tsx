import style from "./searchdropdown.module.css";
import Link from "next/link";
import Image from "next/image";

export default function SearchDropdown({
  searchedArticles,
}: {
  searchedArticles?: any;
}) {
  if (searchedArticles?.length > 0) {
    return (
      <div className={style.dropdown}>
        {searchedArticles?.slice(0, 10).map((article: any) => (
          <Link href={`/products/${article.id}`} key={article.id}>
            <a>
              {" "}
              <div className={style.items}>
                <Image
                  className={style.items}
                  src={article.image.url}
                  width={40}
                  height={60}
                  alt={article.name}
                />
                <span>{article.name}</span>
              </div>
            </a>
          </Link>
        ))}
      </div>
    );
  } else {
    return null;
  }
}
