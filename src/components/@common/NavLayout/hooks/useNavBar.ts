import navigationAtom from "@/atoms/navigationAtom";
import currentUser from "@/utils/currentUser";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { useDisclosure, useOutsideClick } from "@chakra-ui/react";
import {
  faBell,
  faBookmark,
  faHome,
  faPlus,
  faSearch,
  faUser,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";
import { useRecoilState } from "recoil";

const NAV_KEYS = ["feed", "search", "alert", "saved", "new", "user"];
const DEFAULT_NAV_KEY = NAV_KEYS[0];

export type NavKey = (typeof NAV_KEYS)[number];

export interface Nav {
  key: NavKey;
  icon: IconDefinition;
  title: string;
  href?: `/${string}`;
}

type NavType = "topbar" | "sidebar";

const getKeyFromPath = (path: string) => {
  switch (path) {
    case `/user/${currentUser.getNickname()}/saved`:
      return "saved";
    case "/post/new":
      return "new";
    case `/user/${currentUser.getNickname()}/posts`:
    case `/user/${currentUser.getNickname()}/following`:
    case `/user/${currentUser.getNickname()}/follower`:
      return "user";
    default:
      return DEFAULT_NAV_KEY;
  }
};

const generateNavs = (nickname: string, navKeys: NavKey[]): Nav[] => {
  return (
    [
      { key: "feed", icon: faHome, title: "홈", href: "/feed" },
      {
        key: "search",
        icon: faSearch,
        title: "검색"
      },
      { key: "alert", icon: faBell, title: "알림" },
      {
        key: "saved",
        icon: faBookmark,
        title: "저장한 목록",
        href: `/user/${nickname}/saved`
      },
      {
        key: "new",
        icon: faPlus,
        title: "새 포스트",
        href: "/post/new"
      },
      {
        key: "user",
        icon: faUser,
        title: "프로필",
        href: `/user/${nickname}/posts`
      }
    ] as const
  ).filter(({ key }) => navKeys.includes(key));
};

const useNavBar = ({
  navKeys = NAV_KEYS
}: {
  navKeys?: NavKey[];
} = {}) => {
  const {
    isOpen: isDrawerOpen,
    onToggle: onDrawerToggle,
    onClose: onDrawerClose,
    onOpen: onDrawerOpen
  } = useDisclosure();
  const drawerRef = useRef(null);

  const navType = useBreakpointValue<NavType>({
    base: "topbar",
    sm: "topbar",
    md: "sidebar"
  });

  const router = useRouter();
  const nickname = currentUser.getNickname();

  const navs = useMemo(
    () => generateNavs(nickname, navKeys),
    [nickname, navKeys]
  );

  const [currentNav, setCurrentNav] = useRecoilState(navigationAtom);

  useEffect(() => {
    setCurrentNav(c => {
      if (c === "alert" || c === "search") return c;
      return getKeyFromPath(router.asPath);
    });
  }, [router.asPath, setCurrentNav]);

  useOutsideClick({
    ref: drawerRef,
    handler: e => {
      const target = e.target as Element;
      if (target.closest('[data-type="navItem"]')) return;

      if (isDrawerOpen) {
        onDrawerClose();
        setCurrentNav(getKeyFromPath(router.asPath));
      }
    }
  });

  const onNavClick = (key: NavKey = getKeyFromPath(router.asPath)) => {
    setCurrentNav(c => {
      if ((c === "alert" || c === "search") && c === key)
        return getKeyFromPath(router.asPath);
      return key;
    });
  };

  const isCurrentNav = (key: NavKey) => {
    switch (key) {
      case "search":
      case "alert":
      case "feed":
      case "new":
        return key === currentNav;
      case "saved":
        return key === currentNav && router.asPath.includes(key);
      case "user":
        return (
          key === currentNav &&
          router.asPath.includes(key) &&
          router.asPath.includes(nickname)
        );
      default:
        return false;
    }
  };

  return {
    navs,
    navType,
    onNavClick,
    isCurrentNav,
    drawerRef,
    isDrawerOpen,
    onDrawerToggle,
    onDrawerClose,
    onDrawerOpen
  };
};

export default useNavBar;
