/* eslint-disable no-nested-ternary */
import { getAutoCompleteResult } from "@/api/search/autocomplete";
import useSearch from "@/hooks/useSearch";
import searchKeys from "@/queryKeys/searchKeys";
import { Circle, HStack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import ResultContainer from "../ResultContainer";

export default function TagAutoComplete() {
  const { searchValue } = useSearch();

  const tagAutoCompleteQuery = useQuery({
    queryKey: searchKeys.autocomplete(searchValue.value),
    queryFn: () => getAutoCompleteResult(searchValue.value, 0)
  });

  return (
    <ResultContainer>
      {tagAutoCompleteQuery.data && searchValue.value !== "" ? (
        tagAutoCompleteQuery.data.length === 0 ? (
          <Text>검색 결과가 없어요</Text>
        ) : (
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
        )
      ) : (
        <Text>검색어를 입력해주세요.</Text>
      )}
    </ResultContainer>
  );
}
