import { getNicknameResult } from "@/api/search/nickname";
import { getUsernameResult } from "@/api/search/username";
import { SearchContext } from "@/components/@common/NavLayout/components/SearchContext";
import searchKeys from "@/queryKeys/searchKeys";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import ResultContainer from "../ResultContainer";
import UserItem from "./UserItem";

type UserListProps = {
  target: "nickname" | "username";
};

export default function UserList({ target }: UserListProps) {
  const { search } = useContext(SearchContext);

  const userQuery = useQuery({
    queryKey: searchKeys[target](search),
    queryFn: ({ queryKey }) => {
      if (queryKey[0] === "nickname") return getNicknameResult(queryKey[1], 0);
      return getUsernameResult(queryKey[1], 0);
    }
  });

  return (
    <ResultContainer>
      {search ? (
        userQuery.data?.map(d => <UserItem key={d.userId} {...d} />)
      ) : (
        <>검색어를 입력해주세요.</>
      )}
    </ResultContainer>
  );
}
