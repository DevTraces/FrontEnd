import feedAtom from "@/atoms/feedAtom";
import getDateFormat from "@/utils/date";
import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  IconButton,
  SlideFade,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { faClose, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import ReplyList from "../../FeedCard/components/ReplyList";
import LikeUsersModal from "../../FeedCard/components/TextContent/LikeUsersModal";

const MAX_PREVIEW_LENGTH = 100;

export default function NewContent() {
  const { hashtags, content, createdAt } = useRecoilValue(feedAtom);

  const [isMoreLoaded, setIsMoreLoaded] = useState(
    content?.length < MAX_PREVIEW_LENGTH ?? false
  );

  const likeUsersDisclosure = useDisclosure();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      {likeUsersDisclosure.isOpen && (
        <LikeUsersModal disclosure={likeUsersDisclosure} />
      )}
      <Box position="absolute" bottom={{ sm: "60px", md: "40px" }} right="40px">
        <IconButton
          aria-label="피드 내용 보기"
          colorScheme="blackAlpha"
          icon={<Icon as={FontAwesomeIcon} icon={isOpen ? faClose : faInfo} />}
          onClick={onToggle}
        />
        <SlideFade in={isOpen}>
          {isOpen && (
            <Box
              pos="absolute"
              bottom="60px"
              right={{
                sm: "-40px",
                md: "0"
              }}
              bg="white"
              w={{
                sm: "100vw",
                md: "460px"
              }}
              maxH="50vh"
              overflow="scroll"
              px="40px"
              py="40px"
              rounded="20px"
            >
              <Button
                fontWeight="bold"
                textAlign="left"
                onClick={likeUsersDisclosure.onOpen}
                cursor="pointer"
              >
                좋아요를 누른 사람들
              </Button>
              <HStack>
                {hashtags.map(tag => (
                  <Link href={`/explore/tags/${tag}`} key={tag}>
                    <Text color="blue.700">#{tag}</Text>
                  </Link>
                ))}
              </HStack>
              <Box w="full" wordBreak="keep-all">
                <Text display="inline">
                  {content.slice(0, MAX_PREVIEW_LENGTH)}
                </Text>
                <Text
                  display="inline"
                  color={isMoreLoaded ? "inherit" : "gray"}
                  onClick={() => setIsMoreLoaded(true)}
                  cursor="pointer"
                >
                  {isMoreLoaded
                    ? content.slice(MAX_PREVIEW_LENGTH)
                    : "... 더보기"}
                </Text>
              </Box>
              <Text fontSize="12px" color="gray">
                {getDateFormat(createdAt)}
              </Text>
              <Divider my="20px" />
              <ReplyList />
            </Box>
          )}
        </SlideFade>
      </Box>
    </>
  );
}
