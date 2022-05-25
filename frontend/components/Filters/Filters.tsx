import { useRouter } from "next/router";
import React from "react";
import style from "./filters.module.css";

export function Filters({
  className,
  onChange,
  categories,
  vendors,
  discounts,
  mobileFilters,
}: {
  className?: string;
  onChange: any;
  categories: any[];
  vendors: any[];
  discounts: boolean;
  mobileFilters: boolean;
}) {
  const { locale } = useRouter();
  console.log(categories, vendors, mobileFilters);
  return (
    <div className={style.filters_container}>
      <h4 className={`${mobileFilters && style.mobile}`}>Marcas</h4>
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
      <h4 className={`${mobileFilters && style.mobile}`}>Artigos</h4>
      {discounts ? (
        <label
          className={`${style.container_checkbox} ${style.filters_products} ${
            mobileFilters && style.mobile
          }`}
        >
          Saldos
          <input
            type="checkbox"
            name="name"
            value="saldos"
            onChange={onChange}
          />
          <span className={style.checkmark}></span>
        </label>
      ) : null}
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
  discounts,
  mobileFilters,
  setMobileFilters,
}: {
  onChange?: (e: any) => void | undefined;
  categories?: any;
  vendors?: any;
  discounts?: any;
  mobileFilters?: any;
  setMobileFilters?: boolean;
}) {
  return (
    <div>
      <Filters
        onChange={onChange}
        categories={categories}
        vendors={vendors}
        discounts={discounts}
        mobileFilters={mobileFilters}
      />
    </div>
  );
}
