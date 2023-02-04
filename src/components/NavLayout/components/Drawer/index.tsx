import { Nav } from "@/components/NavLayout/constants/nav";
import { Box, Text } from "@chakra-ui/react";
import { ComponentProps, forwardRef } from "react";
import Alert from "./components/Alert";
import Like from "./components/Like";
import Search from "./components/Search";

type DrawerProps = {
  selectedNav: Nav["key"];
} & ComponentProps<typeof Box>;

export default forwardRef<HTMLDivElement, DrawerProps>(
  ({ children, selectedNav, ...restProps }, ref) => {
    const cases: { key: Nav["key"]; Component: JSX.Element; title: string }[] =
      [
        { key: "search", Component: <Search />, title: "검색" },
        { key: "alert", Component: <Alert />, title: "알림" },
        { key: "like", Component: <Like />, title: "좋아요 목록" }
      ];

    const currentCase = cases.find(({ key }) => key === selectedNav);

    if (!currentCase) return null;

    return (
      <Box
        zIndex="popover"
        position="fixed"
        left={{ sm: "0", md: "100px" }}
        top={{ sm: "80px", md: 0 }}
        p="40px"
        w={{ sm: "full", md: "400px" }}
        bg="white"
        h={{ sm: "auto", md: "100vh" }}
        ref={ref}
        {...restProps}
      >
        <Text
          display={{ sm: "none", md: "block" }}
          fontSize="2xl"
          fontWeight="bold"
          mb="24px"
        >
          {currentCase.title}
        </Text>

        {currentCase.Component}
      </Box>
    );
  }
);
