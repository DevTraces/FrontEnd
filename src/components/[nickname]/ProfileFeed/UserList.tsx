import { VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import UserItem, { UserItemProps } from "./UserItem";

export default function UserList() {
  const router = useRouter();
  const { nickname, selected } = router.query;

  const getFollowList = async () => {
    const res = await fetch(`/api/users/${selected}?userId=${nickname}`);
    const data = await res.json();

    return data;
  };

  const query = useQuery({
    queryKey: ["userList", nickname, selected],
    queryFn: getFollowList
  });

  return (
    <VStack>
      {query.data?.map(
        ({
          nickname: userNickname,
          profileImageLink,
          userName,
          isFollowing
        }: UserItemProps) => (
          <UserItem
            key={userNickname}
            userName={userName}
            nickname={userNickname}
            profileImageLink={profileImageLink}
            isFollowing={isFollowing}
          />
        )
      )}
    </VStack>
  );
}
