import {
  Avatar,
  Button,
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
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "./components/Carousel";
import Comment from "./components/Comment";
import Content from "./components/Content";

const post = {
  nickname: "codeisneverodd",
  imgs: [
    "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1602532305019-3dbbd482dae9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    "https://images.unsplash.com/photo-1673818855223-da6f705d825f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
  ],
  like: 3240,
  content:
    "조카손자, 손녀, 조카손자\n사람 꽃이 최고지!\n엄마로부터 비롯된 자손들.",
  hashtag: ["양희은", "그러라그래", "베스트셀러", "MBC여성시대"],
  comments: [
    { nickname: "codeisneverodd", content: "내용 1" },
    { nickname: "helloworld", content: "내용 2" },
    { nickname: "chocolate", content: "내용 3" }
  ],
  date: "2023-02-02"
};

export default function PostCard() {
  return (
    <Card w="md" zIndex="base">
      <CardHeader px={0}>
        <Flex alignItems="center" gap={4} px={4}>
          <Avatar boxSize={10} />
          <Text>{post.nickname}</Text>
        </Flex>
      </CardHeader>
      <Carousel imgs={post.imgs} />
      <CardBody px={2}>
        <Content
          nickname={post.nickname}
          like={post.like}
          hashtag={post.hashtag}
          content={post.content}
          date={post.date}
        />
        <Comment comments={post.comments} />
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
          />
          <InputRightElement>
            <Button variant="ghost" color="blue">
              게시
            </Button>
          </InputRightElement>
        </InputGroup>
      </CardFooter>
    </Card>
  );
}
