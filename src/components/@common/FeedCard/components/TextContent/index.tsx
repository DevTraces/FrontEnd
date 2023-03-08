import feedAtom from "@/atoms/feedAtom";
import ProfileAvatar from "@/components/@common/ProfileAvatar";
import useFeed from "@/hooks/useFeed";
import currentUser from "@/utils/currentUser";
import getDateFormat from "@/utils/date";
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import Link from "next/link";
import router from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { useRecoilValue } from "recoil";
import DeleteConfirmDialog from "../DeleteConfirmDialog";
import MorePopover from "../MorePopover";
import LikeUsersModal from "./LikeUsersModal";

const MAX_PREVIEW_LENGTH = 100;

type TextContentProps = {
  setIsReplyOpen: Dispatch<SetStateAction<boolean>>;
};

export default function TextContent({ setIsReplyOpen }: TextContentProps) {
  const {
    feedId,
    numberOfLike,
    numberOfReply,
    authorNickname,
    authorProfileImageUrl,
    hashtags,
    content,
    createdAt
  } = useRecoilValue(feedAtom);
  const [isMoreLoaded, setIsMoreLoaded] = useState(
    content?.length < MAX_PREVIEW_LENGTH ?? false
  );

  const nickname = currentUser.getNickname();

  const { deleteMutation } = useFeed();

  const deleteFeed = () => deleteMutation.mutate({ feedId });

  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose
  } = useDisclosure();

  const likeUsersDisclosure = useDisclosure();

  const handleReplyClick = () => {
    setIsReplyOpen(true);
  };

  return (
    <>
      <DeleteConfirmDialog
        title="게시물"
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        onDelete={() => {
          deleteFeed();
          onAlertClose();
        }}
      />
      {likeUsersDisclosure.isOpen && (
        <LikeUsersModal disclosure={likeUsersDisclosure} />
      )}
      <Flex px="12px" pt="4px" direction="column" gap="12px" w="full">
        <Flex direction="column" alignItems="flex-start" w="full" gap="8px">
          <Flex justifyContent="space-between" w="full">
            <Text
              fontWeight="bold"
              fontSize="24px"
              color="gray.700"
              fontFamily="secondary"
              onClick={() => router.push(`/user/${authorNickname}/posts`)}
              cursor="pointer"
              _hover={{
                textDecoration: "underline"
              }}
            >
              {authorNickname}
            </Text>
            {authorNickname === nickname && (
              <MorePopover
                onDeleteClick={onAlertOpen}
                onEditClick={() => {
                  router.push(`/post/edit/${feedId}`);
                }}
              />
            )}
          </Flex>
          <Text fontSize="12px" color="gray">
            {getDateFormat(createdAt)}
          </Text>

          <HStack>
            {hashtags?.map(tag => (
              <Link href={`/explore/tags/${tag}`} key={tag}>
                <Text color="blue.700">#{tag}</Text>
              </Link>
            ))}
          </HStack>

          <Box w="full" wordBreak="keep-all" textAlign="left">
            <Text display="inline">
              {content?.slice(0, MAX_PREVIEW_LENGTH)}
            </Text>
            <Text
              display="inline"
              color={isMoreLoaded ? "inherit" : "gray"}
              onClick={() => setIsMoreLoaded(true)}
              cursor="pointer"
            >
              {isMoreLoaded ? content?.slice(MAX_PREVIEW_LENGTH) : "... 더보기"}
            </Text>
          </Box>

          <Flex
            gap="10px"
            color="gray.600"
            justifyContent="space-between"
            alignItems="center"
            fontSize="15px"
            borderTop="1px"
            borderColor="gray.300"
            w="full"
            py="5px"
          >
            <Flex alignItems="center" gap="5px">
              <Button variant="ghost" size="sm" p="0">
                <ProfileAvatar
                  src={authorProfileImageUrl}
                  size="24px"
                  alt="프로필 이미지"
                  onClick={() => router.push(`/user/${authorNickname}/posts`)}
                  cursor="pointer"
                />
              </Button>
              <Text
                as="span"
                onClick={likeUsersDisclosure.onOpen}
                _hover={{ textDecoration: "underline" }}
                cursor="pointer"
              >
                좋아요 {numberOfLike}개
              </Text>
            </Flex>
            {numberOfReply > 0 && (
              <Text
                as="span"
                onClick={handleReplyClick}
                _hover={{ textDecoration: "underline" }}
                cursor="pointer"
              >
                댓글 {numberOfReply}개
              </Text>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
