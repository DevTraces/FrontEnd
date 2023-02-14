import CircledImage from "@/components/[nickname]/CircledImage";
import { PostCardData } from "@/types/data/feed";
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
import { ComponentProps } from "react";
import Carousel from "./components/Carousel";
import Content from "./components/Content";
import ReplyList from "./components/Reply";

type PostCardProps = PostCardData & ComponentProps<typeof Card>;

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
  return (
    <Card w="md" zIndex="base" {...restProps}>
      <CardHeader px={0}>
        <Flex alignItems="center" gap={4} px={4}>
          {authorProfileImageUrl ? (
            <CircledImage
              src={authorProfileImageUrl}
              size="40px"
              alt="프로필 이미지"
            />
          ) : (
            <Avatar boxSize="80px" />
          )}
          <Text fontWeight="bold">{authorNickname}</Text>
        </Flex>
      </CardHeader>
      <Carousel imgs={imageUrls} />
      <CardBody px="12px">
        <Content
          feedId={feedId}
          authorNickname={authorNickname}
          numberOfLike={numberOfLike}
          hashtags={hashtags}
          content={content}
          createdAt={createdAt}
          liked={liked}
          saved={saved}
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
