import { getBookmarkList } from "@/api/bookmark";
import bookmarkKeys from "@/queryKeys/bookmarkKeys";
import { AspectRatio, Grid, GridItem, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function Saved() {
  const bookmarkQuery = useQuery({
    queryKey: bookmarkKeys.bookmarkList,
    queryFn: () => getBookmarkList(0)
  });
  if (bookmarkQuery.data?.length === 0) {
    return <Text>저장된 게시물이 없어요</Text>;
  }
  return (
    <Grid w="full" templateColumns="repeat(3, 1fr)" gap="10px">
      {bookmarkQuery.data?.map(({ feedId, imageUrl }) => (
        <GridItem
          key={feedId}
          position="relative"
          _hover={{
            cursor: "pointer",
            opacity: 0.8,
            transition: "opacity 0.2s ease-in-out"
          }}
        >
          <Link href={`/post/${feedId}`}>
            <AspectRatio ratio={1 / 1}>
              <Image
                src={imageUrl}
                alt="미리보기 이미지"
                sizes="100%"
                fill
                priority
              />
            </AspectRatio>
          </Link>
        </GridItem>
      ))}
    </Grid>
  );
}
