import React from "react";
import style from "./filters.module.css";

export function Filters({
    className,
    onChange,
    categories,
    mobileFilters,
}: {
    className?: string;
    onChange: any;
    categories: any[];
    mobileFilters: boolean;
}) {
    return (
        <div className={style.filters_container}>
            {categories?.map(
                (filter: { name: string; children: any[] }, index: number) => (
                    <div
                        className={`${style.filters_products} ${
                            mobileFilters && style.mobile
                        }`}
                        key={index}
                    >
                        <h4>{filter.name}</h4>
                        {filter.children.map(
                            (innerFilter: { name: string }, index: number) => (
                                <label
                                    key={index}
                                    className={style.container_checkbox}
                                >
                                    {innerFilter.name}
                                    <input
                                        type="checkbox"
                                        name="name"
                                        value={innerFilter.name}
                                        onChange={onChange}
                                    />
                                    <span className={style.checkmark}></span>
                                </label>
                            )
                        )}
                    </div>
                )
            )}
        </div>
    );
}

export default function FilterComponent({
    onChange,
    categories,
    mobileFilters,
    setMobileFilters,
}: {
    onChange?: (e: any) => void | undefined;
    categories?: any;
    mobileFilters?: any;
    setMobileFilters?: boolean;
}) {
    return (
        <div>
            <Filters
                onChange={onChange}
                categories={categories}
                mobileFilters={mobileFilters}
            />
        </div>
    );
}
