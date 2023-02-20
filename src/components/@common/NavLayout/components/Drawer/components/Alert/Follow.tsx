import { postFollow } from "@/api/follows/[nickname]";
import CircledImage from "@/components/@common/CircledImage";
import { FollowNotice } from "@/types/data/notice";
import { Text, Avatar, HStack, Icon, Button, Box } from "@chakra-ui/react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import getDateFormat from "../../utils/date";

export default function Follow({
  senderNickname,
  followerProfileImageUrl,
  isFollowing,
  createdAt
}: FollowNotice) {
  const router = useRouter();

  const follow = useMutation({
    mutationFn: postFollow
  });

  const handleFollowNoticeClick = () => {
    router.push(`/user/${senderNickname}/posts`);
  };

  const handleFollowClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();
    follow.mutate(senderNickname);
  };

  return (
    <HStack
      onClick={handleFollowNoticeClick}
      w="full"
      h="50px"
      cursor="pointer"
    >
      {followerProfileImageUrl ? (
        <CircledImage
          src={followerProfileImageUrl}
          size="10"
          alt="프로필 이미지"
        />
      ) : (
        <Avatar boxSize={10} />
      )}
      <Box>
        <b>{senderNickname}</b>님이 당신을 팔로우하기 시작했습니다.
        <Text as="span" ml="5px" color="gray">
          {getDateFormat(createdAt)}
        </Text>
      </Box>
      {isFollowing ? (
        <Icon as={FontAwesomeIcon} icon={faChevronRight} color="gray.400" />
      ) : (
        <Button
          colorScheme="blue"
          onClick={handleFollowClick}
          size="sm"
          fontSize="sm"
        >
          팔로우
        </Button>
      )}
    </HStack>
  );
}
