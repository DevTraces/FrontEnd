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
import { useRouter } from "next/router";
import { ComponentProps, Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";

type ToolbarProps = {
  setIsReplyOpen: Dispatch<SetStateAction<boolean>>;
} & ComponentProps<typeof Flex>;

export default function Toolbar({
  setIsReplyOpen,
  ...restProps
}: ToolbarProps) {
  const { liked, feedId, bookMarked, authorNickname } =
    useRecoilValue(feedAtom);
  const toast = useToast();
  const router = useRouter();

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
    navigator.clipboard.writeText(`${router.asPath}/post/${feedId}`);
    toast({
      title: "링크가 복사되었어요.",
      status: "success",
      duration: 1000
    });
  };

  return (
    <Flex justifyContent="space-evenly" w="full" py="12px" {...restProps}>
      <Button
        variant="ghost"
        leftIcon={
          <Icon
            as={FontAwesomeIcon}
            icon={liked ? faHeartFilled : faHeartBlank}
            color={liked ? "red.400" : "gray"}
            boxSize={{
              base: "16px",
              sm: "20px",
              md: "24px"
            }}
          />
        }
        color="gray.800"
        fontSize={{ base: "sm", md: "md" }}
        onClick={handleLikeClick}
      >
        좋아요
      </Button>
      <Button
        variant="ghost"
        leftIcon={
          <Icon
            as={FontAwesomeIcon}
            icon={faComment}
            boxSize={{
              base: "16px",
              sm: "20px",
              md: "24px"
            }}
            color="gray"
          />
        }
        color="gray.800"
        fontSize={{ base: "sm", md: "md" }}
        onClick={() => setIsReplyOpen(o => !o)}
      >
        댓글
      </Button>
      <Button
        variant="ghost"
        leftIcon={
          <Icon
            as={FontAwesomeIcon}
            icon={faLink}
            boxSize={{
              base: "16px",
              sm: "20px",
              md: "24px"
            }}
            color="gray"
          />
        }
        onClick={handleShareClick}
        color="gray.800"
        fontSize={{ base: "sm", md: "md" }}
      >
        공유
      </Button>
      <Button
        variant="ghost"
        leftIcon={
          <Icon
            as={FontAwesomeIcon}
            icon={bookMarked ? faBookmarkFilled : faBookmarkBlank}
            color={bookMarked ? "primary" : "gray"}
            boxSize={{
              base: "16px",
              sm: "20px",
              md: "24px"
            }}
          />
        }
        color="gray.800"
        fontSize={{ base: "sm", md: "md" }}
        onClick={handleBookmarkClick}
      >
        북마크
      </Button>
    </Flex>
  );
}
