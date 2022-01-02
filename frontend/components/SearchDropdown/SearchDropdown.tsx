import style from "./searchdropdown.module.css";
import Link from 'next/link'
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
                        <div className={style.items}>
                            <img
                                className={style.items}
                                src={article.image.url}
                                alt={article.name}
                            />
                            <span>{article.name}</span>
                        </div>
                    </Link>
                ))}
            </div>
        );
    } else {
        return null;
    }
}
