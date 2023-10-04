import style from "./menu.module.css";
import { MdHighlightOff } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";
import { translations } from "../../translations/common";
import { LinearProgress } from "@mui/material";
import React from "react";

export default function MenuNav({ toggleOpen }) {
  const [data, setData] = React.useState({ categories: [], vendors: [] });
  const { locale } = useRouter();

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/sanity/categories");
      const data = await res.json();
      setData(data.data);
    }
    fetchData();
  }, []);

  console.log(data.categories.length)

  if (data.categories.length === 0) {
    return (<LinearProgress />)
  }

  return (
    <div className={style.menu}>
      <div className={style.close} onClick={toggleOpen}>
        <MdHighlightOff />
      </div>
      <div className={style.container}>
        {data !== undefined ? (
          <div className={style.nav_wrapper}>
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
        ) : null}
      </div>
    </div>
  );
}
