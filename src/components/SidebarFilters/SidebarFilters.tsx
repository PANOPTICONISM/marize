import React from "react";
import { useEffect } from "react";
import { useCommerceCMS } from "../../contexts/CommerceContext";
import uniqueCategories from "../../config/filtersConfig";
//import style from "../../pages/Products/products.module.css";
import style from "../SidebarFilters/sidebarfilters.module.css";

export default function SidebarFilters({
    productsList,
}: {
    productsList?: any[] | undefined;
}) {
    const { products, categories } = useCommerceCMS();
    console.log(categories);
    //keeps track of filtered stuff
    // const [categoryFilter, setCategoryFilter] = React.useState<string[]>([]);
    // //keeps filtered products as arr of objects
    // const [cats, setCats] = React.useState<string[]>([]);
    // const defaultProducts: any = products;
    // const categories: any = products?.map((cat) => {
    //     return cat["categories"][0]["slug"];
    // });

    // const brands = products?.map((brand) => {
    //     return brand["categories"][1]["slug"];
    // });

    // //remove all double values form sidebar filters to populate UI
    // const category = uniqueCategories(categories);
    // const brand = uniqueCategories(brands);

    // //Handle filters
    // const handleFilter = (e: { target: { value: any; checked: any } }) => {
    //     const value = e.target.value;
    //     setCategoryFilter((prev: any) =>
    //         !e.target.checked
    //             ? prev.filter((v: any) => v !== value)
    //             : [...prev, value]
    //     );
    // };
    // useEffect(() => {
    //     if (!categoryFilter.length) {
    //         setCats(defaultProducts);
    //     } else {
    //         setCats(
    //             defaultProducts.filter((categories: any) => {
    //                 return categoryFilter?.some((c: string) =>
    //                     [categories["categories"][0]["slug"]].flat().includes(c)
    //                 );
    //             })
    //         );
    //     }
    // }, [categoryFilter, defaultProducts]);
    // console.log(cats);

    return (
        <div>
            {categories?.map((categoryParent, index) => (
                <div key={index}>
                    <h4>{categoryParent.name}</h4>
                    <ul>
                        {categoryParent.children.map(
                            (category: { id: string; name: string }) => (
                                <li key={category.id}>{category.name}</li>
                            )
                        )}
                    </ul>
                </div>
            ))}
        </div>
    );
}

// <h4>New Arrivals</h4>
//                 <label className={style.container_checkbox}>
//                     show all
//                     <input type="checkbox" name="name" value="all" />
//                     <span className={style.checkmark}></span>
//                 </label>
//                 <br />

// {category?.map((cat: any, i) => (
//     <div key={i}>
//         <label className={style.container_checkbox}>
//             {cat}
//             <input
//                 type="checkbox"
//                 name=""
//                 value={cat}
//                 onChange={handleFilter}
//             />
//             <span className={style.checkmark}></span>
//         </label>
//         <br />
//     </div>
// ))}

// {brand?.map((b: any, i) => (
//     <div key={i}>
//         <label htmlFor="b" className={style.container_checkbox}>
//             {b}
//             <input
//                 type="checkbox"
//                 name=""
//                 value={b}
//                 onChange={(e) => {
//                     console.log(e.target.value);
//                 }}
//             />
//             <span className={style.checkmark}></span>
//         </label>
//         <br />
//     </div>
// ))}
