import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.100"
      },
      ":not(.chakra-dont-set-collapse) > .chakra-collapse": {
        overflow: "initial !important"
      }
    }
  },
  colors: {
    primary: "#B384DA"
  },
  fonts: {
    secondary: "'Caveat', cursive"
  }
});

export default theme;
