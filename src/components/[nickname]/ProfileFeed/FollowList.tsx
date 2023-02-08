import { VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import FollowItem, { FollowItemData } from "./FollowItem";

export default function FollowList() {
  const router = useRouter();
  const { nickname, selected } = router.query;

  const getFollowList = async () => {
    const res = await fetch(`/api/users/${selected}/${nickname}`);
    const data = await res.json();

    return data;
  };

  const query = useQuery<FollowItemData[]>({
    queryKey: ["followList", nickname, selected],
    queryFn: getFollowList
  });

  return (
    <VStack>
      {query.data?.map(d => (
        <FollowItem key={d.nickname} {...d} />
      ))}
    </VStack>
  );
}
