import ProfileAvatar from "@/components/@common/ProfileAvatar";
import useFollow from "@/hooks/useFollow";
import { FollowNotice } from "@/types/data/notice";
import { Box, Button, HStack, Icon, Text } from "@chakra-ui/react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import getDateFormat from "../../../../../../../utils/date";

export default function Follow({
  senderNickname,
  senderProfileImageUrl,
  isFollowing,
  createdAt
}: FollowNotice) {
  const router = useRouter();
  const { followMutation } = useFollow();

  const follow = (nickname: string) => followMutation.mutate({ nickname });

  const handleFollowNoticeClick = () => {
    router.push(`/user/${senderNickname}/posts`);
  };

  const handleFollowClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();
    follow(senderNickname);
  };

  return (
    <HStack onClick={handleFollowNoticeClick} w="full" cursor="pointer">
      <ProfileAvatar
        src={senderProfileImageUrl}
        size="40px"
        alt="프로필 이미지"
      />
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
