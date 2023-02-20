import { Center, useBreakpointValue } from "@chakra-ui/react";
import { createContext } from "react";

type NavType = "topbar" | "sidebar" | undefined;

export const NavTypeContext = createContext<NavType>(undefined);

export default function NavTypeProvider({
  children
}: React.ComponentProps<typeof Center>) {
  const variant = useBreakpointValue<NavType>({
    sm: "topbar",
    md: "sidebar"
  });

  return (
    <NavTypeContext.Provider value={variant}>
      {children}
    </NavTypeContext.Provider>
  );
}
