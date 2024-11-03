/* eslint-disable react-hooks/exhaustive-deps */
import { ReactComponent as Search } from "../../assets/search.svg";
// localization dependicies
import React, { useEffect, useState } from 'react';

const SearchInput = ({
  background,
  width,
  placeholder,
  searchTerm,
  setSearchTerm,
  styles,
  disabled,
  handleChange
}) => {

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  useEffect(() => {
    setDebouncedSearchTerm(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchTerm(debouncedSearchTerm);
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [debouncedSearchTerm]);

  return (
    <div
      className={`${styles} relative rounded-full overflow-hidden 2xl:px-3 px-2 py-2 shadow-[0_7px_40px_#7a7a7a29] ${width ? width : "w-80"} 2xl:h-11 h-9 flex items-center`}
      style={{ backgroundColor: background ? background : "white" }}
    >
      <Search className={`2xl:left-[15px] left-[10px] absolute top-1/2 -translate-y-1/2 2xl:w-4 w-3`} />
      <input
        type="text"
        placeholder={placeholder}
        value={debouncedSearchTerm}
        onChange={(e) => {
          setDebouncedSearchTerm(e.target.value)
        }}
        disabled={disabled}
        className={`${disabled && 'cursor-not-allowed'} 2xl:pl-6 pl-4 mr-2 outline-none  font-normal 2xl:text-sm text-xs  w-full h-full 2xl:placeholder:text-sm placeholder:text-xs`}
        style={{ backgroundColor: background ? background : "white" }}
      />
    </div>
  );
};

export default React.memo(SearchInput);