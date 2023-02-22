import userAtom from "@/atoms/userAtom";
import useFollow from "@/hooks/useFollow";
import { FollowItemData } from "@/types/data/follow";
import { Avatar, Button, HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import CircledImage from "../../../../@common/CircledImage";

type FollowItemProps = {
  followItemData: FollowItemData;
  isPending?: boolean;
};

export default function FollowItem({
  followItemData: { username, nickname, profileImageUrl, following },
  isPending = false
}: FollowItemProps) {
  const user = useRecoilValue(userAtom);
  const isMyProfile = nickname === user.nickname;
  const { toggle: toggleFollow } = useFollow();

  return (
    <HStack w="300px" justifyContent="space-between">
      <Link
        href={`/user/${nickname}/posts`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          width: "100%"
        }}
      >
        {profileImageUrl ? (
          <CircledImage src={profileImageUrl} size="50px" alt="프로필 이미지" />
        ) : (
          <Avatar boxSize={10} src={profileImageUrl} />
        )}
        <VStack alignItems="flex-start">
          <Text fontWeight="bold">{username}</Text>
          <Text color="gray">@{nickname}</Text>
        </VStack>
      </Link>
      {!isMyProfile && (
        <Button
          size="md"
          fontSize="sm"
          variant={following ? "outline" : "solid"}
          colorScheme={following ? "red" : "blue"}
          fontWeight="bold"
          onClick={() => toggleFollow(following, nickname)}
        >
          {following && "언팔로우"}
          {!following && (isPending ? "수락" : "팔로우")}
        </Button>
      )}
    </HStack>
  );
}
