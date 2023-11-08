import style from "./menu.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { translations } from "../../translations/common";
import React from "react";
import { useCategories } from "../../contexts/CategoriesContext";

export default function MenuNav() {
  const data = useCategories();
  const { locale } = useRouter();

  return (
    <div className={style.menu}>
      {data !== undefined ? (
        <>
          <div>
            <h4>{translations[locale].categories}</h4>
            <ul className={style.menu_sections}>
              {[...data.accessory, ...data.clothing].map((cat) => (
                <li key={cat._id}>
                  <Link
                    href={{
                      pathname: "/products",
                      query: { type: "categories", q: cat.title[locale].toLowerCase() },
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
                      query: { type: "brands", q: vendor.title.toLowerCase() },
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
