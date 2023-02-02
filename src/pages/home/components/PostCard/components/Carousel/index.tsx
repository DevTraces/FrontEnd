import { Box, Icon } from "@chakra-ui/react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function Carousel({ imgs }: { imgs: string[] }) {
  return (
    <Box bg="gray" position="relative" w="full" h="500px">
      <Box display="none">
        {imgs.map(img => (
          <Image src={img} alt="포스트 이미지" />
        ))}
      </Box>

      <Icon
        as={FontAwesomeIcon}
        icon={faArrowRight}
        color="gray.300"
        position="absolute"
        right={5}
        top="50%"
        translateY="-50%"
      />
    </Box>
  );
}
