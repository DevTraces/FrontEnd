import { getFollowSuggestion } from "@/api/follows/suggestion";
import { getNicknameResult } from "@/api/search/nickname";
import { getUsernameResult } from "@/api/search/username";
import useSearch from "@/hooks/useSearch";
import followsKeys from "@/queryKeys/followsKeys";
import searchKeys from "@/queryKeys/searchKeys";
import currentUser from "@/utils/currentUser";
import { Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import ResultContainer from "../ResultContainer";
import UserItem from "./UserItem";

type UserListProps = {
  target: "nickname" | "username";
};

export default function UserList({ target }: UserListProps) {
  const { searchValue } = useSearch();
  const nickname = currentUser.getNickname();
  const userQuery = useQuery({
    queryKey: searchKeys[target](searchValue.value),
    queryFn: ({ queryKey }) => {
      if (queryKey[0] === "nickname")
        return getNicknameResult(searchValue.value, 0);
      return getUsernameResult(searchValue.value, 0);
    }
  });

  const followSuggestionQuery = useQuery({
    queryKey: followsKeys.suggestion(nickname),
    queryFn: getFollowSuggestion
  });

  return (
    <ResultContainer>
      {userQuery.data ? (
        <>
          {userQuery.data.map(d => (
            <UserItem key={d.nickname} userResult={d} />
          ))}

          <Text>아래의 유저를 팔로우 해보세요</Text>
          {followSuggestionQuery.data?.map(d => (
            <UserItem key={d.nickname} userResult={d} />
          ))}
        </>
      ) : (
        <Text>일치하는 검색 결과가 없어요</Text>
      )}
    </ResultContainer>
  );
}
