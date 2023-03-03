import feedAtom from "@/atoms/feedAtom";
import useBookmark from "@/hooks/useBookmark";
import useLike from "@/hooks/useLike";
import { Button, Flex, Icon, IconButton, useToast } from "@chakra-ui/react";
import {
  faBookmark as faBookmarkBlank,
  faHeart as faHeartBlank
} from "@fortawesome/free-regular-svg-icons";
import {
  faBookmark as faBookmarkFilled,
  faHeart as faHeartFilled,
  faLink
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ComponentProps } from "react";
import { useRecoilValue } from "recoil";

type ToolbarProps = {} & ComponentProps<typeof Flex>;

export default function Toolbar({ ...restProps }: ToolbarProps) {
  const { liked, feedId, bookMarked, authorNickname, numberOfLike } =
    useRecoilValue(feedAtom);
  const toast = useToast();

  const { bookmarkMutation, unbookmarkMutation } = useBookmark();
  const { likeMutation, unlikeMutation } = useLike();

  const bookmark = () => bookmarkMutation.mutate({ feedId, authorNickname });
  const unbookmark = () =>
    unbookmarkMutation.mutate({ feedId, authorNickname });

  const like = () => likeMutation.mutate({ feedId, authorNickname });
  const unlike = () => unlikeMutation.mutate({ feedId, authorNickname });

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
    <Flex gap="4px" justifyContent="space-between" py="12px" {...restProps}>
      <IconButton
        variant="ghost"
        icon={<Icon as={FontAwesomeIcon} icon={faLink} boxSize={6} />}
        onClick={handleShareClick}
        aria-label="공유"
      />
      <IconButton
        variant="ghost"
        icon={
          <Icon
            as={FontAwesomeIcon}
            icon={bookMarked ? faBookmarkFilled : faBookmarkBlank}
            color={bookMarked ? "primary" : "black"}
            boxSize={6}
          />
        }
        onClick={handleBookmarkClick}
        aria-label="북마크"
      />
      <Button
        variant="ghost"
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
        {numberOfLike}
      </Button>
    </Flex>
  );
}
