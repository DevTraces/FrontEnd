import { Center } from "@chakra-ui/react";
import { createContext, useMemo, useState } from "react";

type SearchContextType = {
  search: string;
  setSearch: (search: string) => void;
};

export const SearchContext = createContext<SearchContextType>({
  search: "",
  setSearch: () => {}
});

export default function SearchProvider({
  children
}: React.ComponentProps<typeof Center>) {
  const [search, setSearch] = useState("");

  const value = useMemo(() => ({ search, setSearch }), [search, setSearch]);

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
