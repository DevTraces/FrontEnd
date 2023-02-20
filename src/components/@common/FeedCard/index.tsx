import feedAtom from "@/atoms/feedAtom";
import userAtom from "@/atoms/userAtom";
import { FeedData } from "@/types/data/feed";
import { Avatar, Flex, Text, useDisclosure } from "@chakra-ui/react";
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

  const [isReplyOpen, setIsReplyOpen] = useState(false);

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
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        onConfirm={onAlertClose}
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
            <MorePopover onDeleteClick={onAlertOpen} />
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
