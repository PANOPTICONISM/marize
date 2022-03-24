import style from "./menu.module.css";
import { MdHighlightOff } from "react-icons/md";
import VisitStore from "../VisitStore/VisitStore";
import StoreInfo from "../StoreInfo/StoreInfo";
import Link from "next/link";
import { sanity } from "../../pages/api/lib/sanity";
import { useEffect, useState } from "react";
import { addUrlParams } from "../../pages/products";
import { useRouter } from "next/router";
import { title } from "process";

export default function MenuNav({ toggleOpen }) {
  const [data, setData] = useState({ categories: [], vendors: [] });
  const router = useRouter();
  const { locale } = useRouter();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/sanity/categories");
      const data = await res.json();
      setData(data.data);
    }
    fetchData();
  }, []);

  console.log(data, "o");

  const goToProducts = (title) => {
    addUrlParams(router, { 0: title });
  };

  return (
    <div className={style.menu}>
      <div className={style.close} onClick={toggleOpen}>
        <MdHighlightOff />
      </div>
      <div className={style.container}>
        {data !== undefined ? (
          <div className={style.nav_wrapper}>
            <h4> Categories </h4>
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
            <h4> Vendors </h4>
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
        <VisitStore className={style.visitImage} />
        <StoreInfo undoFlex={style.flexBox} className={style.menuBarInfo} />
      </div>
    </div>
  );
}
