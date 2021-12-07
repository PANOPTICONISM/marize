import style from "./searchdropdown.module.css";
export default function SearchDropdown({
    searchArticles,
}: {
    searchArticles?: any;
}) {
    return (
        <div className={style.dropdown}>
            {searchArticles?.map((article: any) => (
                <div className={style.items} key={article.id}>
                    <a href="#" target="_blank">
                        <span>
                            {" "}
                            <img
                                className={style.items}
                                src={article.image.url}
                                alt="image"
                            />{" "}
                        </span>
                        {article.name}
                    </a>
                </div>
            ))}
        </div>
    );
}
