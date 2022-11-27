import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useState } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import { ProductProps } from "../NewArrivals/NewArrivals";
import SearchDropdown from "../SearchDropdown/SearchDropdown";

const SearchBar = ({
  className,
}: {
  className: string;
}) => {
  const [search, setSearch] = useState("");
  const [searchedArticles, setSearchedArticles] = useState([]);

  const { state } = useContext(ProductsContext);
  const { locale } = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const searchArticles = state.products?.filter((p) => {
      return (
        p.title[locale]
          .toLowerCase()
          .indexOf(search.toLowerCase()) > -1
      );
    });
    if (search.length > 0) {
      setSearchedArticles(searchArticles);
    } else {
      setSearchedArticles([]);
    }
  };

  return (
    <>
      <input
        className={className}
        type="text"
        key="1"
        value={search}
        placeholder="search here"
        onChange={(e) => handleSearch(e)}
      />
      <SearchDropdown searchedArticles={searchedArticles} />
    </>
  );
};
export default SearchBar;
