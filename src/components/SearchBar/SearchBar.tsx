import React from "react";

const SearchBar = ({ className }: { className?: string }) => {
  return (
    <input
      className={className}
      key="1"
      value=""
      placeholder={"search here"}
      onChange={(e) => console.log(e.target.value)}
    />
  );
};
export default SearchBar;
