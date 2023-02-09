import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text
} from "@chakra-ui/react";
import { faPaperPlane, faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "./components/Carousel";
import ReplyList from "./components/Reply";
import Content from "./components/Content";

type PostCardProps = {
  feedId: number;
  authorNickname: string;
  imageUrls: string[];
  numberOfLike: number;
  hashtags: string[];
  content: string;
  createdAt: Date;
};

export type FeedData = PostCardProps & {
  authorNickname: string;
  content: string;
  imageUrls: string[];
  hashtags: string[];
  numberOfLike: number;
};

export default function PostCard({
  feedId,
  authorNickname,
  imageUrls,
  numberOfLike,
  hashtags,
  content,
  createdAt
}: PostCardProps) {
  return (
    <Card w="md" zIndex="base">
      <CardHeader px={0}>
        <Flex alignItems="center" gap={4} px={4}>
          <Avatar boxSize={10} />
          <Text fontWeight="bold">{authorNickname}</Text>
        </Flex>
      </CardHeader>
      <Carousel imgs={imageUrls} />
      <CardBody px="12px">
        <Content
          nickname={authorNickname}
          like={numberOfLike}
          hashtag={hashtags}
          content={content}
          date={createdAt}
        />
        <ReplyList feedId={feedId} />
      </CardBody>
      <CardFooter p="0">
        <InputGroup>
          <InputLeftElement>
            <Icon as={FontAwesomeIcon} icon={faSmile} color="gray.300" />
          </InputLeftElement>
          <Input
            variant="filled"
            focusBorderColor="white"
            bg="white"
            placeholder="댓글 달기..."
            _hover={{ bg: "none" }}
          />
          <InputRightElement>
            <Icon as={FontAwesomeIcon} icon={faPaperPlane} color="gray.300" />
          </InputRightElement>
        </InputGroup>
      </CardFooter>
    </Card>
  );
}
