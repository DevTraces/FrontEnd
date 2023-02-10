import { VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import PostCard from "../../PostCard";

type FeedData = {
  feedId: number;
  authorNickname: string;
  content: string;
  authorProfileImageUrl: string;
  numberOfReply: number;
  createdAt: Date;
  modifiedAt: Date;
  imageUrls: string[];
  hashtags: string[];
  numberOfLike: number;
  liked: boolean;
  saved: boolean;
};

export default function Posts() {
  const router = useRouter();
  const { nickname } = router.query;

  const getPosts = async () => {
    const response = await fetch(`/api/feeds/${nickname}`);
    const data = await response.json();

    return data;
  };

  const query = useQuery<FeedData[]>(["posts", nickname], () => getPosts());

  return (
    <VStack>
      {query.data && query.data.map(d => <PostCard key={d.feedId} {...d} />)}
    </VStack>
  );
}
