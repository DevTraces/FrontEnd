import navigationAtom, { DrawerNavType } from "@/atoms/navigationAtom";
import { useSetRecoilState } from "recoil";
import useDrawer from "./useDrawer";

export default function useTopBar() {
  const { onOpen, onToggle } = useDrawer();
  const setNav = useSetRecoilState(navigationAtom);

  const select = (selectedNav: DrawerNavType) => {
    switch (selectedNav) {
      case "search":
        setNav("search");
        onOpen();
        break;
      case "alert":
        setNav("alert");
        onToggle();
        break;
      default:
    }
  };

  return { select };
}
