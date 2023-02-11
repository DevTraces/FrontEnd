import { getBookmark } from "@/api/bookmark";
import { AspectRatio, Grid, GridItem } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function Saved() {
  const bookmarkQuery = useQuery({
    queryKey: ["bookmark"],
    queryFn: getBookmark
  });

  if (bookmarkQuery.isError) return <>Bookmark에서 에러가 발생했습니다.</>;
  if (bookmarkQuery.isLoading) return <>Bookmark 로딩중..</>;

  return (
    <Grid w="full" templateColumns="repeat(3, 1fr)" gap="10px">
      {bookmarkQuery.data.map(({ feedId, imageUrl }) => (
        <GridItem key={feedId} position="relative">
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
