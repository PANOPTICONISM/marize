import { useRouter } from "next/router";
import React from "react";
import { translations } from "../../translations/common";
import style from "./filters.module.css";

type FilterProps = {
  onChange: (e: {
    target: {
      value: string,
      checked: boolean,
      name: string,
    }
  }) => void,
  categories: {
    title: { en: string, pt: string },
    _id: string,
  }[],
  vendors: {
    title: string,
    _id: string,
  }[],
  discounts: boolean,
  mobileFilters: boolean,
}

export function Filters({
  onChange,
  categories,
  vendors,
  discounts,
  mobileFilters,
}: FilterProps) {
  const { locale } = useRouter();

  return (
    <div
      className={`${style.filters_container} ${
        !mobileFilters && style.container_mobile
      }`}
    >
      <h4 className={`${mobileFilters && style.mobile} ${style.brands}`}>
        {translations[locale].brands}
      </h4>
      {vendors?.map((filter) => (
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
              name="brands"
              value={filter.title}
              onChange={onChange}
            />
            <span className={style.checkmark}></span>
          </label>
        </div>
      ))}
      <h4 className={`${mobileFilters && style.mobile}`}>
        {translations[locale].categories}
      </h4>
      {discounts ? (
        <label
          className={`${style.container_checkbox} ${style.filters_products} ${
            mobileFilters && style.mobile
          }`}
        >
          {translations[locale].discount}
          <input
            type="checkbox"
            name="categories"
            value={translations[locale].discount}
            onChange={onChange}
          />
          <span className={style.checkmark}></span>
        </label>
      ) : null}
      {categories?.map((filter) => (
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
              name="categories"
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
}: FilterProps) {
  return (
    <Filters
      onChange={onChange}
      categories={categories}
      vendors={vendors}
      discounts={discounts}
      mobileFilters={mobileFilters}
    />
  );
}
