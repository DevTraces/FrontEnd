import { Nav } from "@/components/NavLayout/constants/nav";
import { Box } from "@chakra-ui/react";
import React, { ComponentProps, forwardRef } from "react";
import Alert from "./components/Alert";
import Like from "./components/Like";
import Search from "./components/Search";

type DrawerProps = {
  selectedNav: Nav["key"];
} & ComponentProps<typeof Box>;

export default forwardRef<HTMLDivElement, DrawerProps>(
  ({ children, selectedNav, ...restProps }, ref) => (
    <Box
      zIndex="modal"
      display={{
        sm: "none",
        md: "block"
      }}
      position="fixed"
      left="100px"
      top={0}
      p="40px"
      w={300}
      bg="white"
      h="100vh"
      ref={ref}
      {...restProps}
    >
      {selectedNav === "search" && <Search />}
      {selectedNav === "alert" && <Alert />}
      {selectedNav === "like" && <Like />}
    </Box>
  )
);
