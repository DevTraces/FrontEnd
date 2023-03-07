import navigationAtom, {
  DrawerNavType,
  getRouterNavValue,
  isDrawerNavType,
  isRouterNavType,
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
    if (isDrawerNavType(selectedNav)) {
      setNav(selectedNav);

      if (nav === selectedNav) {
        onToggle();
      } else {
        onOpen();
      }
    } else {
      setNav(selectedNav);
      router.push(url[selectedNav]);
    }
  };

  useEffect(() => {
    if (isRouterNavType(nav)) onClose();
  }, [onClose, nav]);

  return { select };
}
