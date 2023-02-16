import { deleteFeed } from "@/api/feeds/[feedId]";
import { PostCardData } from "@/types/data/feed";
import {
  Avatar,
  Box,
  Card,
  Flex,
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { faEdit, faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ComponentProps, useState } from "react";
import Carousel from "./components/Carousel";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog";
import PopoverIconButton from "./components/PopoverIconButton";
import ReplyList from "./components/ReplyList";
import TextContent from "./components/TextContent";
import Toolbar from "./components/Toolbar";

type PostCardProps = PostCardData & ComponentProps<typeof Card>;

// TODO: 로그인 정보 기반으로 내 프로필 것인지 확인
const myNickname = "김철수";

export default function PostCard({
  feedId,
  authorNickname,
  authorProfileImageUrl,
  imageUrls,
  numberOfLike,
  hashtags,
  content,
  createdAt,
  liked,
  saved,
  ...restProps
}: PostCardProps) {
  const router = useRouter();
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const {
    isOpen: isPopoverOpen,
    onOpen: onPopoverOpen,
    onClose: onPopoverClose
  } = useDisclosure();
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose
  } = useDisclosure();
  const toast = useToast();

  const deleteMutation = useMutation({
    mutationFn: () => deleteFeed(feedId),
    onSuccess: () => {
      toast({
        title: "게시물이 삭제되었어요",
        status: "success",
        duration: 1000
      });
      onAlertClose();
    },
    onError: () => {
      toast({
        title: "게시물이 삭제에 실패하였어요",
        status: "error",
        duration: 1000
      });
    }
  });

  return (
    <>
      <DeleteConfirmDialog
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        onConfirm={() => deleteMutation.mutate()}
      />
      <Flex
        direction="column"
        bg="white"
        rounded="12px"
        w="450px"
        zIndex="base"
        {...restProps}
      >
        <Flex alignItems="center" gap={4} px="12px" py="20px">
          <Avatar boxSize={10} />
          <Text fontWeight="bold">{authorNickname}</Text>
          {authorNickname === myNickname && (
            <Popover
              isOpen={isPopoverOpen}
              onClose={onPopoverClose}
              placement="bottom-end"
            >
              <PopoverTrigger>
                <IconButton
                  aria-label="더보기"
                  ml="auto"
                  p="8px"
                  bg="white"
                  onClick={onPopoverOpen}
                  icon={
                    <Icon
                      as={FontAwesomeIcon}
                      icon={faEllipsis}
                      color="black"
                      cursor="pointer"
                    />
                  }
                />
              </PopoverTrigger>
              <PopoverContent width="240px" overflow="hidden">
                <Box bg="green" w="full">
                  <PopoverIconButton
                    icon={faTrash}
                    color="red"
                    colorScheme="red"
                    onClick={onAlertOpen}
                  >
                    삭제
                  </PopoverIconButton>
                  <PopoverIconButton
                    icon={faEdit}
                    onClick={() => router.push(`/post/edit/${feedId}`)}
                  >
                    편집
                  </PopoverIconButton>
                </Box>
              </PopoverContent>
            </Popover>
          )}
        </Flex>
        <Carousel imgs={imageUrls} boxSize={450} />
        <TextContent
          content={content}
          authorNickname={authorNickname}
          numberOfLike={numberOfLike}
          hashtags={hashtags}
          createdAt={createdAt}
        />
        <Toolbar
          feedId={feedId}
          liked={liked}
          saved={saved}
          setIsReplyOpen={setIsReplyOpen}
        />
        {isReplyOpen && <ReplyList feedId={feedId} />}
      </Flex>
    </>
  );
}
