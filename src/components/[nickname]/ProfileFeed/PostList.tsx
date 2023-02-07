import { VStack } from "@chakra-ui/react";
import PostCard from "../../PostCard";

export default function PostList() {
  return (
    <VStack>
      <PostCard />
      <PostCard />
      <PostCard />
    </VStack>
  );
}
