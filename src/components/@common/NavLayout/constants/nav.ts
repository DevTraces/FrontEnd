import {
  faHome,
  faSearch,
  faBell,
  faPlus,
  faUser,
  faBookmark
} from "@fortawesome/free-solid-svg-icons";

export interface Nav {
  key: "feed" | "search" | "alert" | "saved" | "newPost" | "profile";
  icon: typeof faHome;
  title: string;
  href: `/${string}`;
}

export const NAVS: Nav[] = [
  { key: "feed", icon: faHome, title: "홈", href: "/feed" },
  { key: "search", icon: faSearch, title: "검색", href: "/search" },
  { key: "alert", icon: faBell, title: "알림", href: "/alert" },
  {
    key: "saved",
    icon: faBookmark,
    title: "저장한 목록",
    href: "/user/someone/saved"
  },
  { key: "newPost", icon: faPlus, title: "새 포스트", href: "/post/new" },
  {
    key: "profile",
    icon: faUser,
    title: "프로필",
    href: "/user/codeisneverodd/posts"
  }
];
