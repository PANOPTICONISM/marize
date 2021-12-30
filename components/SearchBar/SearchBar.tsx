import React from "react";
import { useState } from "react";
import { commerce } from "../../lib/Commerce";
import SearchDropdown from "../SearchDropdown/SearchDropdown";

const SearchBar = ({ className, products }: { className?: string, products?: any }) => {
    const [search, setSearch] = useState("");
    const [searchedArticles, setSearchedArticles] = useState([]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        const searchArticles: any = products?.filter((p) => {
            const searchParam = p.categories.map((c: any) => {
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

    console.log(searchedArticles, products)

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