import navigationAtom, {
  DrawerNavType,
  getRouterNavValue,
  RouterNavType
} from "@/atoms/navigationAtom";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import useDrawer from "./useDrawer";

export default function useSideBar() {
  const router = useRouter();
  const { onOpen, onClose, onToggle } = useDrawer();
  const [nav, setNav] = useRecoilState(navigationAtom);

  const select = (selectedNav: RouterNavType | DrawerNavType) => {
    const url = getRouterNavValue();

    switch (selectedNav) {
      case "search":
      case "alert":
        setNav(selectedNav);

        if (nav === selectedNav) {
          onToggle();
        } else {
          onOpen();
        }
        break;
      default:
        setNav(selectedNav);
        onClose();
        router.push(url[selectedNav]);
    }
  };

  useEffect(() => {
    if (nav !== "search" && nav !== "alert") onClose();
  }, [onClose, nav]);

  return { select };
}
