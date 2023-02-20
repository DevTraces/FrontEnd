import { deleteBookmark, postBookmark } from "@/api/bookmark/[feedId]";
import { deleteLike, postLike } from "@/api/like/[feedId]";
import feedAtom from "@/atoms/feedAtom";
import { Button, Flex, Icon, useToast } from "@chakra-ui/react";
import {
  faBookmark as faBookmarkBlank,
  faComment,
  faHeart as faHeartBlank
} from "@fortawesome/free-regular-svg-icons";
import {
  faBookmark as faBookmarkFilled,
  faHeart as faHeartFilled,
  faLink
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import { ComponentProps, Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";

type ToolbarProps = {
  setIsReplyOpen: Dispatch<SetStateAction<boolean>>;
} & ComponentProps<typeof Flex>;

export default function Toolbar({
  setIsReplyOpen,
  ...restProps
}: ToolbarProps) {
  const { liked, feedId, saved } = useRecoilValue(feedAtom);
  const toast = useToast();

  const like = useMutation({
    mutationFn: () => {
      if (liked) return deleteLike(feedId);
      return postLike(feedId);
    }
  });

  const bookmark = useMutation({
    mutationFn: () => {
      if (saved) return deleteBookmark(feedId);
      return postBookmark(feedId);
    },
    onSuccess: async () => {
      toast({
        title: saved ? "저장목록에서 삭제했어요." : "저장목록에 추가했어요.",
        status: "success",
        duration: 2000,
        isClosable: true
      });
    }
  });

  const handleShareClick = () => {
    navigator.clipboard.writeText(`http://localhost:3000/feed/${feedId}`);
    toast({
      title: "링크가 복사되었어요.",
      status: "success",
      duration: 1000
    });
  };

  return (
    <Flex gap={4} justifyContent="space-between" w="full" {...restProps}>
      <Button
        variant="ghost"
        colorScheme="none"
        leftIcon={
          <Icon
            as={FontAwesomeIcon}
            icon={liked ? faHeartFilled : faHeartBlank}
            color={liked ? "red" : "black"}
            boxSize={6}
          />
        }
        onClick={() => like.mutate()}
      >
        좋아요
      </Button>
      <Button
        variant="ghost"
        colorScheme="none"
        leftIcon={<Icon as={FontAwesomeIcon} icon={faComment} boxSize={6} />}
        onClick={() => setIsReplyOpen(o => !o)}
      >
        댓글
      </Button>
      <Button
        variant="ghost"
        colorScheme="none"
        leftIcon={<Icon as={FontAwesomeIcon} icon={faLink} boxSize={6} />}
        onClick={handleShareClick}
      >
        공유
      </Button>
      <Button
        variant="ghost"
        colorScheme="none"
        leftIcon={
          <Icon
            as={FontAwesomeIcon}
            icon={saved ? faBookmarkFilled : faBookmarkBlank}
            color={saved ? "primary" : "black"}
            boxSize={6}
          />
        }
        onClick={() => bookmark.mutate()}
      >
        북마크
      </Button>
    </Flex>
  );
}
