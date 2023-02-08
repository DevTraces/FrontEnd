import { VStack } from "@chakra-ui/react";
import PostCard from "../../PostCard";

export default function Posts() {
  return (
    <VStack>
      <PostCard />
      <PostCard />
      <PostCard />
    </VStack>
  );
}
