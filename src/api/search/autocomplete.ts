import api from "@/api";

export const getAutoCompleteResult = (
  autocomplete: string,
  page: number,
  pageSize: number = 10
) =>
  api.prod.get<string[]>("/api/search/autocomplete", {
    params: { keyword: autocomplete, page, pageSize }
  });
