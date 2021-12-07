import React from "react";
import { useState } from "react";
import { useCommerceCMS } from "../../contexts/CommerceContext";
import SearchDropdown from "../SearchDropdown/SearchDropdown";

const SearchBar = ({ className }: { className?: string }) => {
    const { products } = useCommerceCMS();
    const [search, setSearch] = useState("");
    const searchArticles = products?.filter((p) => {
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
    console.log(searchArticles);
    return (
        <>
            <input
                className={className}
                type="text"
                key="1"
                value={search}
                placeholder={" search here"}
                onChange={(e) => setSearch(e.target.value)}
            />
            {searchArticles?.length !== 0 && (
                <SearchDropdown searchArticles={searchArticles} />
            )}
        </>
    );
};
export default SearchBar;
