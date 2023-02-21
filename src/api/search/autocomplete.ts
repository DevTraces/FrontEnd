import api from "@/api";

type AutoCompleteData = {
  autoCompleteWords: string[];
};

export const getAutoCompleteResult = (
  autocomplete: string,
  page: number,
  pageSize: number = 10
) =>
  api.dev.get<AutoCompleteData>("/api/search/autocomplete", {
    params: { keyword: autocomplete, page, pageSize }
  });
