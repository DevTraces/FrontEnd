import navigationAtom, {
  getRouterNavValue,
  RouterNavType
} from "@/atoms/navigationAtom";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";

export default function useBottomBar() {
  const router = useRouter();
  const setNav = useSetRecoilState(navigationAtom);

  const select = (selectedNav: RouterNavType) => {
    const url = getRouterNavValue();

    router.push(url[selectedNav]);
    setNav(selectedNav);
  };

  return { select };
}
