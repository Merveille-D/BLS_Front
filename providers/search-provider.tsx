"use client";
import { createContext, useContext, useMemo, useState } from "react";
import SearchInputComponent from "@/components/ui/search-input";
export const SearchContext = createContext({
  searchText: "",
  setSearchText: () => {},
});
export const useSearchContext = () => useContext(SearchContext);
export const useSearchResults = (dataArray) => {
  const { searchText } = useSearchContext();
  return dataArray.filter((data) => {
    if (typeof data === "object") {
      return Object.values(data).some((value) =>
        String(value).toLowerCase().includes(searchText.toLowerCase()),
      );
    }
    return String(data).toLowerCase().includes(searchText.toLowerCase());
  });
};
export function SearchInput() {
  const { searchText, setSearchText } = useSearchContext();
  return (
    <SearchInputComponent
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  );
}
export function SearchProvider({ children }) {
  const [searchText, setSearchText] = useState("");
  const providerValue = useMemo(
    () => ({
      searchText,
      setSearchText,
    }),
    [searchText, setSearchText],
  );
  return (
    <SearchContext.Provider value={providerValue}>
      {children}
    </SearchContext.Provider>
  );
}
