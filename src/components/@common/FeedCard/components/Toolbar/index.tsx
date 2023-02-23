import feedAtom from "@/atoms/feedAtom";
import useBookmark from "@/hooks/useBookmark";
import useLike from "@/hooks/useLike";
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
import { ComponentProps, Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";

type ToolbarProps = {
  setIsReplyOpen: Dispatch<SetStateAction<boolean>>;
} & ComponentProps<typeof Flex>;

export default function Toolbar({
  setIsReplyOpen,
  ...restProps
}: ToolbarProps) {
  const { liked, feedId, bookMarked } = useRecoilValue(feedAtom);
  const toast = useToast();

  const { bookmarkMutation, unbookmarkMutation } = useBookmark();
  const { likeMutation, unlikeMutation } = useLike();

  const bookmark = () => bookmarkMutation.mutate({ feedId });
  const unbookmark = () => unbookmarkMutation.mutate({ feedId });
  const like = () => likeMutation.mutate({ feedId });
  const unlike = () => unlikeMutation.mutate({ feedId });

  const handleBookmarkClick = bookMarked ? unbookmark : bookmark;

  const handleLikeClick = liked ? unlike : like;

  const handleShareClick = () => {
    navigator.clipboard.writeText(`http://localhost:3000/post/${feedId}`);
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
        onClick={handleLikeClick}
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
            icon={bookMarked ? faBookmarkFilled : faBookmarkBlank}
            color={bookMarked ? "primary" : "black"}
            boxSize={6}
          />
        }
        onClick={handleBookmarkClick}
      >
        북마크
      </Button>
    </Flex>
  );
}
