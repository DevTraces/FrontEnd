import { Box, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ComponentProps } from "react";

type AnimatedBubbleProps = {
  color: "blue" | "green" | "purple";
  scale: number;
  delay: number;
} & ComponentProps<typeof motion.div>;

export default function AnimatedBubble({
  color,
  scale,
  delay,
  ...restProps
}: AnimatedBubbleProps) {
  const [isSmallerThan800] = useMediaQuery("(max-width: 800px)");
  const bg: { [k in typeof color]: string } = {
    blue: " linear-gradient(290.15deg, #6CC0EC 12.49%, rgba(108, 192, 236, 0.4) 86.58%, rgba(108, 192, 236, 0.4) 86.58%)",
    green:
      "linear-gradient(244.99deg, #5BB084 14.12%, rgba(91, 176, 132, 0.4) 83.54%)",
    purple:
      "linear-gradient(281.1deg, #B384DA 12.52%, rgba(179, 132, 218, 0.4) 86.66%)"
  };

  return (
    <Box cursor="pointer">
      <motion.div
        drag
        dragConstraints={{ left: 100, right: 100, top: 100, bottom: 100 }}
        initial={{ scale: 0 }}
        animate={{
          scale: isSmallerThan800 ? scale * 0.5 : scale,
          transition: {
            duration: 2,
            delay,
            scale: {
              type: "spring",
              damping: 5,
              stiffness: 100,
              restDelta: 0.001
            }
          }
        }}
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "100px",
          background: bg[color]
        }}
        {...restProps}
      />
    </Box>
  );
}
