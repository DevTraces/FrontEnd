import { postFollow } from "@/api/follows/[nickname]";
import CircledImage from "@/components/[nickname]/CircledImage";
import { FollowNotice } from "@/types/data/notice";
import { Flex, Text, Avatar, HStack, Icon, Button } from "@chakra-ui/react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Follow({
  nickname,
  imageUrl,
  isFollowing,
  createdAt
}: FollowNotice) {
  const router = useRouter();
  const [isFollowButton, setIsFollowButton] = useState(isFollowing);

  const follow = useMutation({
    mutationFn: postFollow,
    onSuccess: async () => {
      setIsFollowButton(true);
    }
  });

  const handleFollowNoticeClick = () => {
    router.push(`/${[nickname]}`);
  };

  const handleFollowClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();
    follow.mutate(nickname);
  };

  return (
    <HStack
      onClick={handleFollowNoticeClick}
      w="full"
      h="50px"
      cursor="pointer"
    >
      {imageUrl ? (
        <CircledImage src={imageUrl} size="10" alt="프로필 이미지" />
      ) : (
        <Avatar boxSize={10} />
      )}
      <Flex direction="column" flex={1}>
        <Text>
          <b>{nickname}</b>님이 당신을 팔로우하기 시작했습니다.
        </Text>
        <Text color="gray">{createdAt}</Text>
      </Flex>
      {isFollowButton ? (
        <Icon as={FontAwesomeIcon} icon={faChevronRight} color="gray.400" />
      ) : (
        <Button colorScheme="blue" onClick={handleFollowClick}>
          팔로우
        </Button>
      )}
    </HStack>
  );
}
