import { useRouter } from "next/router";
import React from "react";
import style from "./filters.module.css";

export function Filters({
  className,
  onChange,
  categories,
  vendors,
  mobileFilters,
}: {
  className?: string;
  onChange: any;
  categories: any[];
  vendors: any[];
  mobileFilters: boolean;
}) {
  const { locale } = useRouter();
  return (
    <div className={style.filters_container}>
      <h4>Marcas</h4>
      {vendors?.map((filter: { title: string; _id: any }) => (
        <div
          className={`${style.filters_products} ${
            mobileFilters && style.mobile
          }`}
          key={filter._id}
        >
          <label key={filter._id} className={style.container_checkbox}>
            {filter.title}
            <input
              type="checkbox"
              name="name"
              value={filter.title}
              onChange={onChange}
            />
            <span className={style.checkmark}></span>
          </label>
        </div>
      ))}
      <h4>Artigos</h4>
      {categories?.map((filter: { title: string; _id: any }) => (
        <div
          className={`${style.filters_products} ${
            mobileFilters && style.mobile
          }`}
          key={filter._id}
        >
          <label key={filter._id} className={style.container_checkbox}>
            {filter.title[locale]}
            <input
              type="checkbox"
              name="name"
              value={filter.title[locale]}
              onChange={onChange}
            />
            <span className={style.checkmark}></span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default function FilterComponent({
  onChange,
  categories,
  vendors,
  mobileFilters,
  setMobileFilters,
}: {
  onChange?: (e: any) => void | undefined;
  categories?: any;
  vendors?: any;
  mobileFilters?: any;
  setMobileFilters?: boolean;
}) {
  return (
    <div>
      <Filters
        onChange={onChange}
        categories={categories}
        vendors={vendors}
        mobileFilters={mobileFilters}
      />
    </div>
  );
}
