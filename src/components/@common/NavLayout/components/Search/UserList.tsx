import { getNicknameResult } from "@/api/search/nickname";
import { getUsernameResult } from "@/api/search/username";
import searchKeys from "@/queryKeys/searchKeys";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { SearchContext } from "../../SearchContext";
import ResultContainer from "./components/ResultContainer";
import UserItem from "./UserItem";

type UserListProps = {
  target: "nickname" | "username";
};

export default function UserList({ target }: UserListProps) {
  const { search } = useContext(SearchContext);

  const userQuery = useQuery({
    queryKey: searchKeys[target](search),
    queryFn: ({ queryKey }) => {
      if (queryKey[0] === "nickname") return getNicknameResult(queryKey[1]);
      return getUsernameResult(queryKey[1]);
    }
  });

  if (userQuery.isError) return <>UserList 에러 발생</>;
  if (userQuery.isLoading) return <>UserList 로딩 중...</>;

  return (
    <ResultContainer>
      {search ? (
        userQuery.data.map(d => <UserItem key={d.userId} {...d} />)
      ) : (
        <>검색어를 입력해주세요.</>
      )}
    </ResultContainer>
  );
}
