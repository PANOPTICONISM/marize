import style from "./searchdropdown.module.css";
import { useNavigate } from "react-router-dom";
export default function SearchDropdown({
    searchedArticles,
}: {
    searchedArticles?: any;
}) {
    const navigate = useNavigate();
    return (
        <div className={style.dropdown}>
            {searchedArticles?.slice(0, 10).map((article: any) => (
                <div className={style.items} key={article.id}>
                    {/* TODO:sent to detsils page */}
                    <p onClick={() => navigate("/products/:id")}>
                        <span>
                            <img
                                className={style.items}
                                src={article.image.url}
                                alt="image"
                            />
                        </span>
                        {article.name}
                    </p>
                </div>
            ))}
        </div>
    );
}
