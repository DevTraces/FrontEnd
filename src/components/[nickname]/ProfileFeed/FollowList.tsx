import { VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import FollowItem, { FollowItemProps } from "./FollowItem";

export default function FollowList() {
  const router = useRouter();
  const { nickname, selected } = router.query;

  const getFollowList = async () => {
    const res = await fetch(`/api/users/${selected}?userId=${nickname}`);
    const data = await res.json();

    return data;
  };

  const query = useQuery({
    queryKey: ["followList", nickname, selected],
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
        }: FollowItemProps) => (
          <FollowItem
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
