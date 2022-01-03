import Link from 'next/link'
import Image from "next/image"
import style from "./newarrivals.module.css";

const NewArrivals = ({products}) => {
    const reversedArray: any[] = [];
    products?.map((product) => reversedArray.unshift(product));
    const newArrivals = reversedArray?.slice(0, 4);

    return (
        <section className={style.newArrivals}>
            <h1>New Arrivals</h1>
            <div className={style.articles}>
                {newArrivals?.map((article) => (
                    <div key={article.id}>
                        <Link href={`/products/${article.id}`}>
                            <a><Image src={article.image.url} alt={article.name} /></a>
                        </Link>
                        <h2>{article.name}</h2>
                        <span>{article.price.formatted_with_code}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewArrivals;
