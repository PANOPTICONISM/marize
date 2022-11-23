import React, { useContext } from "react";
import { useState } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import SearchDropdown from "../SearchDropdown/SearchDropdown";

const SearchBar = ({
  className,
}: {
  className: string;
}) => {
  const [search, setSearch] = useState("");
  const [searchedArticles, setSearchedArticles] = useState([]);

  const { state } = useContext(ProductsContext);
  console.log(state.products, 'oi')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const searchArticles: any = state.products?.filter((p) => {
      const searchParam = p.categories?.map((c: any) => {
        return c.name;
      });
      return (
        searchParam
          .flat()
          .toString()
          .toLowerCase()
          .indexOf(search.toLowerCase()) > -1
      );
    });
    if (search.length > 1) {
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
