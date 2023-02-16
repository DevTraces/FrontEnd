import NavLayout from "@/components/@common/NavLayout";
import PostCard from "@/components/@common/PostCard";
import { Center, Flex } from "@chakra-ui/react";
import Head from "next/head";

export default function Feed() {
  return (
    <>
      <Head>
        <title>홈</title>
      </Head>
      <NavLayout>
        <Center>
          <Flex direction="column" pt={20} gap={10} m="auto" mb={20}>
            <PostCard
              content=""
              feedId={0}
              authorNickname=""
              numberOfLike={0}
              hashtags={[]}
              createdAt={new Date()}
              imageUrls={[]}
              authorProfileImageUrl=""
              liked={false}
              saved={false}
            />
          </Flex>
        </Center>
      </NavLayout>
    </>
  );
}
