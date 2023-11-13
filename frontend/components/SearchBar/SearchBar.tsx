import { useRouter } from "next/router";
import React from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import SearchDropdown from "../SearchDropdown/SearchDropdown";
import { usePathname } from "next/navigation";
import style from "./searchbar.module.css"

const SearchBar = () => {
  const [search, setSearch] = React.useState("");

  const dropdownRef = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const [searchedArticles, setSearchedArticles] = React.useState([]);

  const { state } = React.useContext(ProductsContext);
  const { locale } = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const searchArticles = state.products?.filter((p) => {
      return p.title[locale].toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
    if (search.length > 0) {
      setSearchedArticles(searchArticles);
    } else {
      setSearchedArticles([]);
    }
  };

  React.useEffect(() => {
    if (pathname) {
      setIsOpen(false);
      setSearch("");
    }
  }, [pathname]);

  React.useEffect(() => {
    setIsOpen(search.length > 0);
  }, [search.length]);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <input
        className={style.search_bar}
        type="text"
        value={search}
        placeholder="Search"
        onChange={(e) => handleSearch(e)}
      />
      <SearchDropdown isOpen={isOpen} searchedArticles={searchedArticles} />
    </div>
  );
};
export default SearchBar;
