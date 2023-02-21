import api from "@/api";

type AutoCompleteData = {
  autoCompleteWords: string[];
};

export const getAutoCompleteResult: (
  autocomplete: string,
  page: number,
  pageSize?: number
) => Promise<AutoCompleteData> = (
  autocomplete: string,
  page,
  pageSize = 10
) => {
  return api.dev.get<AutoCompleteData>("/api/search/autocomplete", {
    params: { keyword: autocomplete, page, pageSize }
  });
};
