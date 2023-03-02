import feedAtom from "@/atoms/feedAtom";
import useFeed from "@/hooks/useFeed";
import currentUser from "@/utils/currentUser";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import router from "next/router";
import { useRecoilValue } from "recoil";
import DeleteConfirmDialog from "../../../FeedCard/components/DeleteConfirmDialog";
import MorePopover from "../../../FeedCard/components/MorePopover";
import ProfileAvatar from "../../../ProfileAvatar";
import Toolbar from "./Toolbar";

export default function Header() {
  const nickname = currentUser.getNickname();

  const { feedId, authorNickname, authorProfileImageUrl } =
    useRecoilValue(feedAtom);

  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose
  } = useDisclosure();

  const { deleteMutation } = useFeed();

  const handleDeleteFeed = () => {
    deleteMutation.mutate({ feedId });
    onAlertClose();
  };

  return (
    <>
      <DeleteConfirmDialog
        title="게시물"
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        onDelete={handleDeleteFeed}
      />
      <Flex
        pos="absolute"
        top="0"
        w="full"
        h="80px"
        alignItems="center"
        gap={4}
        zIndex="modal"
        px="12px"
        py="20px"
      >
        <Flex flex="1" alignItems="center" gap="16px">
          <ProfileAvatar
            src={authorProfileImageUrl}
            size="40px"
            alt="프로필 이미지"
            onClick={() => router.push(`/user/${authorNickname}/posts`)}
            cursor="pointer"
          />
          <Text
            fontWeight="bold"
            onClick={() => router.push(`/user/${authorNickname}/posts`)}
            cursor="pointer"
          >
            {authorNickname}
          </Text>
        </Flex>
        <Toolbar flex="0" />
        {authorNickname === nickname && (
          <MorePopover
            onDeleteClick={onAlertOpen}
            onEditClick={() => {
              router.push(`/post/edit/${feedId}`);
            }}
          />
        )}
      </Flex>
    </>
  );
}
