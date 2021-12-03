import React from "react";
import { useState } from "react";
import style from "../SidebarFilters/sidebarfilters.module.css";

export function Filters({
    filters,
    setCheckedFilters,
    onChange,
    categories,
}: {
    filters?: any;
    setCheckedFilters?: React.Dispatch<React.SetStateAction<string[]>>;
    onChange: any;
    categories: any;
}) {
    return (
        <>
            {categories?.map((filter: any, index: any) => (
                <div key={index} className={style.sidebar_filters}>
                    <h4>{filter.name}</h4>
                    {filter.children.map((innerFilter: any, index: any) => (
                        <label key={index} className={style.container_checkbox}>
                            {innerFilter.name}
                            <input
                                type="checkbox"
                                name="name"
                                value={innerFilter.name}
                                onChange={onChange}
                            />
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
    onChange,
    categories,
}: {
    className?: string;
    filters?: any;
    onChange?: any;
    categories?: any;
}) {
    const [checkedFilters, setCheckedFilters] = useState<string[]>([]);

    // console.log(filters);

    return (
        <>
            <Filters
                filters={filters}
                setCheckedFilters={setCheckedFilters}
                onChange={onChange}
                categories={categories}
            />
        </>
    );
}
