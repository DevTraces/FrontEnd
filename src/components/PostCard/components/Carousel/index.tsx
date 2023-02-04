import { Box, HStack } from "@chakra-ui/react";
import {} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState } from "react";
import ArrowIconButton from "./ArrowIconButton";

export default function Carousel({ imgs }: { imgs: string[] }) {
  const MIN_IMG_COUNT = 0;
  const MAX_IMG_LENGTH = imgs.length - 1;

  const [current, setCurrent] = useState(0);

  const handleArrowClick = (direction: "left" | "right") => {
    if (direction === "left" && current > MIN_IMG_COUNT)
      setCurrent(current - 1);
    else if (current < MAX_IMG_LENGTH) setCurrent(current + 1);
  };

  return (
    <Box bg="white" position="relative">
      <HStack height="500px" spacing="0px" overflow="hidden">
        {imgs.map((img, i) => (
          <Image
            key={img}
            src={img}
            alt="포스트 이미지"
            width={500}
            height={500}
            priority={i === current}
            style={{
              transform: `translateX(-${current * 450}px)`,
              transition: "0.5s ease-in-out"
            }}
          />
        ))}
      </HStack>
      {current > MIN_IMG_COUNT && (
        <ArrowIconButton direction="left" handleArrowClick={handleArrowClick} />
      )}
      {current < MAX_IMG_LENGTH && (
        <ArrowIconButton
          direction="right"
          handleArrowClick={handleArrowClick}
        />
      )}
    </Box>
  );
}
