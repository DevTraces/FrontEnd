import feedAtom from "@/atoms/feedAtom";
import { Box, Flex, HStack, useBreakpointValue } from "@chakra-ui/react";
import {} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import ArrowIconButton from "./ArrowIconButton";

export default function Carousel() {
  const { imageUrls } = useRecoilValue(feedAtom);

  const [current, setCurrent] = useState(0);
  const boxSize =
    useBreakpointValue({
      base: 300,
      sm: 400,
      md: 500,
      lg: 600,
      xl: 700
    }) ?? 300;

  if (!imageUrls) return null;
  const MIN_IMG_COUNT = 0;
  const MAX_IMG_LENGTH = imageUrls.length - 1;

  const handleArrowClick = (direction: "left" | "right") => {
    if (direction === "left" && current > MIN_IMG_COUNT)
      setCurrent(current - 1);
    else if (current < MAX_IMG_LENGTH) setCurrent(current + 1);
  };

  return (
    <Box bg="white" position="relative" overflow="hidden">
      <Flex w={`${boxSize * imageUrls.length}px`} h={`${boxSize}px`}>
        {imageUrls.map((img, i) => (
          <Box key={img} boxSize={`${boxSize}px`} bgImage={img}>
            <Box
              key={img}
              position="relative"
              boxSize={`${boxSize}px`}
              backdropFilter="auto"
              backdropBlur="25px"
            >
              <Image
                src={img}
                alt="포스트 이미지"
                fill
                sizes="100%"
                priority={i === current}
                style={{
                  transform: `translateX(-${current * boxSize}px)`,
                  transition: "0.5s ease-in-out",
                  objectFit: "contain"
                }}
              />
            </Box>
          </Box>
        ))}
      </Flex>
      {current > MIN_IMG_COUNT && (
        <ArrowIconButton direction="left" handleArrowClick={handleArrowClick} />
      )}
      {current < MAX_IMG_LENGTH && (
        <ArrowIconButton
          direction="right"
          handleArrowClick={handleArrowClick}
        />
      )}
      {MAX_IMG_LENGTH > 0 && (
        <HStack
          position="absolute"
          bottom="5px"
          left="50%"
          transform="translateX(-50%)"
        >
          {imageUrls.map((img, i) => (
            <Box
              key={`index_${img}`}
              w={2}
              h={2}
              bg={i === current ? "gray.700" : "gray.300"}
              _hover={{ bg: "white" }}
              borderRadius="50%"
              cursor="pointer"
              onClick={() => setCurrent(i)}
            />
          ))}
        </HStack>
      )}
    </Box>
  );
}
