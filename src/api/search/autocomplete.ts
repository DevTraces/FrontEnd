import api from "@/api";

type AutoCompleteData = {
  autoCompleteWords: string[];
};

export async function getAutoCompleteResult(autocomplete: string) {
  return api.dev.get<AutoCompleteData>("/api/search/autocomplete", {
    params: { keyword: autocomplete }
  });
}
