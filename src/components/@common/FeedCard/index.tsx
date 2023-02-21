import feedAtom from "@/atoms/feedAtom";
import userAtom from "@/atoms/userAtom";
import useFeed from "@/hooks/useFeed";
import feedsKeys from "@/queryKeys/feedsKeys";
import { FeedData } from "@/types/data/feed";
import { Avatar, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ComponentProps, useState } from "react";
import { RecoilRoot, useRecoilValue } from "recoil";
import Carousel from "./components/Carousel";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog";
import MorePopover from "./components/MorePopover";
import ReplyList from "./components/ReplyList";
import TextContent from "./components/TextContent";
import Toolbar from "./components/Toolbar";

type FeedCardProps = {
  feedData: FeedData;
} & ComponentProps<typeof Flex>;

export default function FeedCard({ feedData, ...restProps }: FeedCardProps) {
  const user = useRecoilValue(userAtom);
  const router = useRouter();
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const queryClient = useQueryClient();

  const { delete: deleteFeed } = useFeed({
    onDelete: () => {
      queryClient.invalidateQueries(feedsKeys.feeds(user.nickname));
    }
  });

  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose
  } = useDisclosure();

  return (
    <RecoilRoot
      initializeState={snapshot => {
        snapshot.set(feedAtom, feedData);
      }}
    >
      <DeleteConfirmDialog
        title="게시물"
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        onDelete={() => {
          deleteFeed(feedData.feedId);
          onAlertClose();
        }}
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
          <Text fontWeight="bold">{feedData.authorNickname}</Text>
          {feedData.authorNickname === user.nickname && (
            <MorePopover
              onDeleteClick={onAlertOpen}
              onEditClick={() => {
                router.push(`/post/edit/${feedData.feedId}`);
              }}
            />
          )}
        </Flex>
        <Carousel boxSize={450} />
        <TextContent />
        <Toolbar setIsReplyOpen={setIsReplyOpen} />
        {isReplyOpen && <ReplyList />}
      </Flex>
    </RecoilRoot>
  );
}
