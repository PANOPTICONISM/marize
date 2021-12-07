import style from "./searchdropdown.module.css";
export default function SearchDropdown({
    handleSearch,
    searchedArticles,
}: {
    handleSearch?: any;
    searchedArticles?: any;
}) {
    return (
        <div className={style.dropdown}>
            {searchedArticles?.slice(0, 10).map((article: any) => (
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
