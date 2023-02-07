import { AspectRatio, Grid, GridItem } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function Saved() {
  const getSaved = async () => {
    const res = await fetch("/api/bookmark");
    const data = await res.json();
    return data;
  };

  const query = useQuery({
    queryKey: ["saved"],
    queryFn: getSaved
  });

  type Saved = {
    feedId: string;
    imageLink: string;
  };

  return (
    <Grid w="full" templateColumns="repeat(3, 1fr)" gap="10px">
      {query.data?.map(({ feedId, imageLink }: Saved) => (
        <GridItem key={feedId} position="relative">
          <Link href={`/post/${feedId}`}>
            <AspectRatio ratio={1 / 1}>
              <Image
                src={imageLink}
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
