import navigationAtom from "@/atoms/navigationAtom";
import { Box, Text } from "@chakra-ui/react";
import { ComponentProps, forwardRef } from "react";
import { useRecoilValue } from "recoil";
import { NavKey } from "../../hooks/useNavBar";
import Search from "../Search";
import Alert from "./components/Alert";

type DrawerProps = ComponentProps<typeof Box>;

export default forwardRef<HTMLDivElement, DrawerProps>(
  ({ ...restProps }, ref) => {
    const currentNav = useRecoilValue(navigationAtom);

    const cases: { key: NavKey; Component: JSX.Element; title: string }[] = [
      {
        key: "search",
        Component: <Search />,
        title: "검색"
      },
      { key: "alert", Component: <Alert />, title: "알림" }
    ];

    const currentCase = cases.find(({ key }) => key === currentNav);

    if (!currentCase) return null;

    return (
      <Box
        zIndex="popover"
        position="fixed"
        left={{ base: "0", md: "100px" }}
        top={{ base: "80px", md: 0 }}
        p="40px"
        w={{ base: "full", md: "400px" }}
        bg="white"
        h={{ base: "auto", md: "100vh" }}
        ref={ref}
        {...restProps}
      >
        <Text
          display={{ base: "none", md: "block" }}
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
