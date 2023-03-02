import feedAtom from "@/atoms/feedAtom";
import { Box, Icon, IconButton, Image } from "@chakra-ui/react";
import {
  faChevronCircleLeft,
  faChevronCircleRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties } from "react";
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRecoilValue } from "recoil";

export default function NewCarousel() {
  const { imageUrls } = useRecoilValue(feedAtom);
  if (!imageUrls) return null;
  const arrowStyles: CSSProperties = {
    position: "absolute",
    zIndex: 2,
    top: "calc(50% - 15px)",
    width: 30,
    height: 30,
    cursor: "pointer"
  };
  const indicatorStyles: CSSProperties = {
    background: "gray",
    width: 8,
    height: 8,
    borderRadius: "100%",
    display: "inline-block",
    margin: "0 8px"
  };

  return (
    <ReactCarousel
      showStatus={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <IconButton
            onClick={onClickHandler}
            title={label}
            style={{ ...arrowStyles, left: 15 }}
            aria-label="이전 이미지로"
            colorScheme="none"
            color="black"
            icon={<Icon as={FontAwesomeIcon} icon={faChevronCircleLeft} />}
          />
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <IconButton
            onClick={onClickHandler}
            title={label}
            style={{ ...arrowStyles, right: 15 }}
            aria-label="다음 이미지로"
            colorScheme="none"
            color="black"
            icon={<Icon as={FontAwesomeIcon} icon={faChevronCircleRight} />}
          />
        )
      }
      renderIndicator={(onClickHandler, isSelected, index, label) => {
        if (isSelected) {
          return (
            <li
              style={{ ...indicatorStyles, backgroundColor: "black" }}
              aria-label={`Selected: ${label} ${index + 1}`}
              title={`Selected: ${label} ${index + 1}`}
            />
          );
        }
        return (
          <li
            style={indicatorStyles}
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            value={index}
            key={index}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
            role="button"
            tabIndex={0}
            title={`${label} ${index + 1}`}
            aria-label={`${label} ${index + 1}`}
          />
        );
      }}
    >
      {imageUrls.map(url => (
        <Box
          key={url}
          w="full"
          h={{ sm: "calc(100vh - 140px)", md: "100vh" }}
          bgImage={url}
          bgSize="200%"
          bgPos="center"
          objectFit="fill"
          bgRepeat="no-repeat"
        >
          <Box
            w="full"
            h="full"
            pt={{ sm: "30%", md: "25%", lg: "20%" }}
            backdropFilter="auto"
            backdropBlur="25px"
          >
            <Image
              filter="auto"
              blur="0"
              h="400px"
              top="70%"
              objectFit="contain"
              src={url}
              alt="이미지"
            />
          </Box>
        </Box>
      ))}
    </ReactCarousel>
  );
}
