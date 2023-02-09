import NavLayout from "@/components/NavLayout";
import PostCard from "@/components/PostCard";
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
              feedId={0}
              authorNickname=""
              imageUrls={[]}
              numberOfLike={0}
              hashtags={[]}
              content=""
              createdAt={new Date()}
              liked={false}
              saved={false}
            />
          </Flex>
        </Center>
      </NavLayout>
    </>
  );
}
