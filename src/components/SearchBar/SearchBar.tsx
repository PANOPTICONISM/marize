import React from "react";
import { useState } from "react";
import { useCommerceCMS } from "../../contexts/CommerceContext";
import SearchDropdown from "../SearchDropdown/SearchDropdown";

const SearchBar = ({ className }: { className?: string }) => {
    const { products } = useCommerceCMS();
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
        console.log(searchArticles, search);
        if (search.length > 1) {
            setSearchedArticles(searchArticles);
        } else {
            setSearchedArticles([]);
        }
        console.log(search.length);
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
