import React from "react";
import { useEffect, useState } from "react";
import { useCommerceCMS } from "../../contexts/CommerceContext";
import uniqueCategories from "../../config/filtersConfig";
//import style from "../../pages/Products/products.module.css";
import style from "../SidebarFilters/sidebarfilters.module.css";

export function Filters({
    filters,
    setCheckedFilters,
}: {
    filters?: any;
    setCheckedFilters?: React.Dispatch<React.SetStateAction<string[]>>;
}) {
    return (
        <>
            {filters?.map((filter: any, index: any) => (
                <div key={index} className={style.sidebar_filters}>
                    <h4>{filter.name}</h4>
                    {filter.children.map((innerFilter: any, index: any) => (
                        <label key={index} className={style.container_checkbox}>
                            {innerFilter.name}
                            <input type="checkbox" name="name" value="all" />
                            <span className={style.checkmark}></span>
                        </label>
                    ))}
                </div>
            ))}
        </>
    );
}

export default function FilterComponent({
    className,
    filters,
}: {
    className?: string;
    filters?: any;
}) {
    const [checkedFilters, setCheckedFilters] = useState<string[]>([]);

    console.log(filters);

    return (
        <>
            <Filters filters={filters} setCheckedFilters={setCheckedFilters} />
        </>
    );
}
