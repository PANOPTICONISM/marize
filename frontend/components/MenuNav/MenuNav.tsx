import style from "./menu.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { translations } from "../../translations/common";
import React from "react";

export default function MenuNav({
  data,
}: {
  data: { categories: any[]; vendors: any[] };
}) {
  const { locale } = useRouter();

  return (
    <div className={style.menu}>
      {data !== undefined ? (
        <>
          <div>
            <h4>{translations[locale].categories}</h4>
            <ul className={style.menu_sections}>
              {data.categories.map((cat) => (
                <li key={cat._id}>
                  <Link
                    href={{
                      pathname: "/products",
                      query: { 0: cat.title[locale] },
                    }}
                  >
                    {cat.title[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{translations[locale].brands}</h4>
            <ul className={style.menu_sections}>
              {data.vendors.map((vendor) => (
                <li key={vendor._id}>
                  <Link
                    href={{
                      pathname: "/products",
                      query: { 0: vendor.title },
                    }}
                  >
                    {vendor.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
}
