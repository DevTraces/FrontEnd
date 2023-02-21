import { getAutoCompleteResult } from "@/api/search/autocomplete";
import searchKeys from "@/queryKeys/searchKeys";
import { Circle, HStack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useContext } from "react";
import { SearchContext } from "../../../SearchContext";
import ResultContainer from "../ResultContainer";

export default function TagAutoComplete() {
  const { search } = useContext(SearchContext);

  const tagAutoCompleteQuery = useQuery({
    queryKey: searchKeys.autocomplete(search),
    queryFn: ({ queryKey }) => getAutoCompleteResult(queryKey[1], 0)
  });

  if (tagAutoCompleteQuery.isError) return <>AutoComplete 에러 발생</>;
  if (tagAutoCompleteQuery.isLoading) return <>AutoComplete 로딩 중...</>;

  return (
    <ResultContainer>
      {search ? (
        tagAutoCompleteQuery.data.map(word => (
          <Link key={word} href={`/explore/tags/${word}`}>
            <HStack
              w="100%"
              _hover={{
                background: "gray.100"
              }}
            >
              <Circle size="10" border="1px" borderColor="gray.200">
                #
              </Circle>
              <Text fontWeight="bold">#{word}</Text>
            </HStack>
          </Link>
        ))
      ) : (
        <>검색어를 입력해주세요.</>
      )}
    </ResultContainer>
  );
}
