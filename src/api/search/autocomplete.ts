import api from "@/api";

type AutoCompleteData = {
  autoCompleteWords: string[];
};

export async function getAutoCompleteResult(autocomplete: string) {
  return api.get<AutoCompleteData>({
    path: "/api/search/autocomplete",
    query: { keyword: autocomplete }
  });
}
